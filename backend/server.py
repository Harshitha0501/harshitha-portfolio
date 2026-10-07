import asyncio
import logging
import os
import re
import smtplib
import ssl
import time
from collections import defaultdict, deque
from email.message import EmailMessage
from email.utils import formataddr
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("portfolio")

SMTP_HOST = os.environ.get("SMTP_HOST", "")
SMTP_PORT = int(os.environ.get("SMTP_PORT") or 587)
SMTP_SECURITY = os.environ.get("SMTP_SECURITY", "starttls").lower()
SMTP_USERNAME = os.environ.get("SMTP_USERNAME", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
CONTACT_TO_EMAIL = os.environ.get("CONTACT_TO_EMAIL", "")
CONTACT_FROM_EMAIL = os.environ.get("CONTACT_FROM_EMAIL") or SMTP_USERNAME
CONTACT_FROM_NAME = os.environ.get("CONTACT_FROM_NAME", "Portfolio Contact Form")
CORS_ORIGINS = [o.strip() for o in os.environ.get("CORS_ORIGINS", "").split(",") if o.strip()]

RATE_LIMIT = int(os.environ.get("CONTACT_RATE_LIMIT") or 5)
RATE_WINDOW = 600
_hits: dict[str, deque] = defaultdict(deque)
_CONTROL = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ContactIn(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    message: Optional[str] = None


def _clean(value: Optional[str], single_line: bool) -> str:
    text = _CONTROL.sub("", value or "")
    if single_line:
        text = re.sub(r"\s+", " ", text)
    return text.strip()


def _error(status: int, message: str, errors: Optional[dict] = None) -> JSONResponse:
    body = {"success": False, "message": message}
    if errors:
        body["errors"] = errors
    return JSONResponse(status_code=status, content=body)


def _rate_limited(ip: str) -> bool:
    now, q = time.monotonic(), _hits[ip]
    while q and now - q[0] > RATE_WINDOW:
        q.popleft()
    if len(q) >= RATE_LIMIT:
        return True
    q.append(now)
    return False


def _send_mail(name: str, email: str, message: str) -> None:
    msg = EmailMessage()
    msg["Subject"] = f"New portfolio message from {name}"
    msg["From"] = formataddr((CONTACT_FROM_NAME, CONTACT_FROM_EMAIL))
    msg["To"] = CONTACT_TO_EMAIL
    msg["Reply-To"] = email
    msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}\n")
    if SMTP_SECURITY == "ssl":
        server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20, context=ssl.create_default_context())
    else:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20)
    with server:
        if SMTP_SECURITY == "starttls":
            server.starttls(context=ssl.create_default_context())
        if SMTP_USERNAME and SMTP_PASSWORD:
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(msg)


@app.exception_handler(RequestValidationError)
async def invalid_body(_: Request, __: RequestValidationError):
    return _error(422, "Invalid request body. Expected JSON with name, email and message.")


@api_router.get("/")
async def root():
    return {"status": "ok"}


@api_router.post("/contact")
async def contact(payload: ContactIn, request: Request):
    name = _clean(payload.name, single_line=True)
    email = _clean(payload.email, single_line=True)
    message = _clean(payload.message, single_line=False)

    errors = {}
    if not name:
        errors["name"] = "Name is required."
    elif len(name) > 100:
        errors["name"] = "Name must be 100 characters or fewer."
    if not email:
        errors["email"] = "Email is required."
    else:
        try:
            email = validate_email(email, check_deliverability=False).normalized
        except EmailNotValidError:
            errors["email"] = "Please enter a valid email address."
    if not message:
        errors["message"] = "Message is required."
    elif len(message) > 5000:
        errors["message"] = "Message must be 5000 characters or fewer."
    if errors:
        return _error(422, "Please correct the highlighted fields.", errors)

    ip = request.headers.get("x-forwarded-for", "").split(",")[0].strip() or (request.client.host if request.client else "unknown")
    if _rate_limited(ip):
        return _error(429, "Too many messages. Please try again later.")

    if not (SMTP_HOST and CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL):
        logger.error("Contact email is not configured (SMTP_HOST / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL)")
        return _error(503, "Email service is not configured.")

    try:
        await asyncio.to_thread(_send_mail, name, email, message)
    except Exception as exc:
        logger.error("Contact email delivery failed: %s", type(exc).__name__)
        return _error(502, "Unable to send message right now.")

    logger.info("Contact message delivered")
    return {"success": True, "message": "Message sent successfully."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)
