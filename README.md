# Harshitha C. — Portfolio

React (CRA) frontend + FastAPI backend. The backend only powers the Contact form (`POST /api/contact`), which emails each message to `CONTACT_TO_EMAIL` over SMTP. Messages are not stored.

## Backend (local)
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env        # fill in real values — never commit .env
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Gmail SMTP setup
1. Turn on 2-Step Verification for the sending Google account.
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Set in `backend/.env` (or your host's environment variables):
   - `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURITY=starttls`
   - `SMTP_USERNAME` / `CONTACT_FROM_EMAIL` = the sending Gmail address
   - `SMTP_PASSWORD` = the 16-character App Password
   - `CONTACT_TO_EMAIL=harshithac0512@gmail.com`
   - `CORS_ORIGINS` = comma-separated frontend origins, e.g. `http://localhost:3000,https://your-domain.com`

`SMTP_SECURITY` accepts `starttls` (port 587), `ssl` (port 465) or `none` (local test servers only).

### API
`POST /api/contact` — JSON `{ "name", "email", "message" }`
- `200` `{ "success": true, "message": "..." }`
- `422` validation errors `{ "success": false, "message", "errors": { field: reason } }`
- `429` too many messages from one IP (`CONTACT_RATE_LIMIT` per 10 minutes, default 5)
- `502` email delivery failed, `503` email not configured

## Frontend
```bash
cd frontend
yarn install
cp .env.example .env        # REACT_APP_BACKEND_URL = backend URL (no trailing slash)
yarn start
```
In production set `REACT_APP_BACKEND_URL` to your deployed backend URL and `REACT_APP_SITE_URL` to your live site URL (used for the social share preview), then rebuild.

The Resume buttons use `frontend/public/Harshitha_C_Resume.pdf` — replace that file (same name) to update it.
