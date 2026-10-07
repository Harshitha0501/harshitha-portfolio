import asyncio
import json
import logging
import os
import re
import time
import urllib.error
import urllib.request
from collections import defaultdict, deque
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

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("portfolio")

# Resend configuration
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
RESEND_FROM_EMAIL = os.environ.get(
    "RESEND_FROM_EMAIL",
    "onboarding@resend.dev",
)

CONTACT_TO_EMAIL = os.environ.get("CONTACT_TO_EMAIL", "")
CONTACT_FROM_NAME = os.environ.get(
    "CONTACT_FROM_NAME",
    "Portfolio Contact Form",
)

CORS_ORIGINS = [
    o.strip()
    for o in os.environ.get("CORS_ORIGINS", "").split(",")
    if o.strip()
]

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


def _error(
    status: int,
    message: str,
    errors: Optional[dict] = None,
) -> JSONResponse:
    body = {
        "success": False,
        "message": message,
    }

    if errors:
        body["errors"] = errors

    return JSONResponse(
        status_code=status,
        content=body,
    )


def _rate_limited(ip: str) -> bool:
    now = time.monotonic()
    q = _hits[ip]

    while q and now - q[0] > RATE_WINDOW:
        q.popleft()

    if len(q) >= RATE_LIMIT:
        return True

    q.append(now)
    return False


def _send_mail(
    name: str,
    email: str,
    message: str,
) -> None:
    if not RESEND_API_KEY:
        raise RuntimeError("RESEND_API_KEY is not configured")

    if not CONTACT_TO_EMAIL:
        raise RuntimeError("CONTACT_TO_EMAIL is not configured")

    subject = f"New portfolio message from {name}"

    text_content = (
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{message}\n"
    )

    html_content = f"""
    <html>
        <body>
            <h2>New Portfolio Contact Message</h2>

            <p>
                <strong>Name:</strong>
                {name}
            </p>

            <p>
                <strong>Email:</strong>
                {email}
            </p>

            <p>
                <strong>Message:</strong>
            </p>

            <p>
                {message.replace(chr(10), "<br>")}
            </p>
        </body>
    </html>
    """

    payload = {
        "from": f"{CONTACT_FROM_NAME} <{RESEND_FROM_EMAIL}>",
        "to": [CONTACT_TO_EMAIL],
        "reply_to": email,
        "subject": subject,
        "text": text_content,
        "html": html_content,
    }

    data = json.dumps(payload).encode("utf-8")

    request = urllib.request.Request(
        "https://api.resend.com/emails",
        data=data,
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            response_body = response.read().decode("utf-8")

            if response.status < 200 or response.status >= 300:
                raise RuntimeError(
                    f"Resend returned HTTP {response.status}: {response_body}"
                )

            logger.info("Resend email accepted: %s", response_body)

    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")

        logger.error(
            "Resend API error: HTTP %s - %s",
            exc.code,
            error_body,
        )

        raise RuntimeError(
            f"Resend API returned HTTP {exc.code}"
        ) from exc

    except urllib.error.URLError as exc:
        logger.error(
            "Unable to connect to Resend: %s",
            exc.reason,
        )

        raise RuntimeError(
            "Unable to connect to Resend"
        ) from exc


@app.exception_handler(RequestValidationError)
async def invalid_body(
    _: Request,
    __: RequestValidationError,
):
    return _error(
        422,
        "Invalid request body. Expected JSON with name, email and message.",
    )


@api_router.get("/")
async def root():
    return {"status": "ok"}


@api_router.post("/contact")
async def contact(
    payload: ContactIn,
    request: Request,
):
    name = _clean(
        payload.name,
        single_line=True,
    )

    email = _clean(
        payload.email,
        single_line=True,
    )

    message = _clean(
        payload.message,
        single_line=False,
    )

    errors = {}

    if not name:
        errors["name"] = "Name is required."
    elif len(name) > 100:
        errors["name"] = "Name must be 100 characters or fewer."

    if not email:
        errors["email"] = "Email is required."
    else:
        try:
            email = validate_email(
                email,
                check_deliverability=False,
            ).normalized

        except EmailNotValidError:
            errors["email"] = "Please enter a valid email address."

    if not message:
        errors["message"] = "Message is required."
    elif len(message) > 5000:
        errors["message"] = "Message must be 5000 characters or fewer."

    if errors:
        return _error(
            422,
            "Please correct the highlighted fields.",
            errors,
        )

    ip = (
        request.headers.get(
            "x-forwarded-for",
            "",
        )
        .split(",")[0]
        .strip()
        or (
            request.client.host
            if request.client
            else "unknown"
        )
    )

    if _rate_limited(ip):
        return _error(
            429,
            "Too many messages. Please try again later.",
        )

    if not RESEND_API_KEY or not CONTACT_TO_EMAIL:
        logger.error(
            "Contact email is not configured "
            "(RESEND_API_KEY / CONTACT_TO_EMAIL)"
        )

        return _error(
            503,
            "Email service is not configured.",
        )

    try:
        await asyncio.to_thread(
            _send_mail,
            name,
            email,
            message,
        )

    except Exception as exc:
        logger.error(
            "Contact email delivery failed: %s",
            type(exc).__name__,
        )

        return _error(
            502,
            "Unable to send message right now.",
        )

    logger.info("Contact message delivered")

    return {
        "success": True,
        "message": "Message sent successfully.",
    }


app.include_router(api_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=[
        "GET",
        "POST",
        "OPTIONS",
    ],
    allow_headers=[
        "Content-Type",
    ],
)