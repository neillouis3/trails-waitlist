# NexTrails — Waitlist

Standalone Next.js app for the **NexTrails** waitlist: a landing page, a signup API, MongoDB storage, and Resend confirmation emails. NexTrails is a social platform for hikers across Newfoundland & Labrador.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string. Signups are stored in the `waitlist` collection. |
| `MONGODB_DB_NAME` | No | Database name (defaults to `trail`). |
| `RESEND_API_KEY` | For emails | Resend API key. If unset, signups still save but no confirmation email is sent. |
| `WAITLIST_FROM_EMAIL` | For emails | Verified sender, e.g. `NexTrails <hello@yourdomain.com>`. The `onboarding@resend.dev` default only delivers to your own Resend account email. |
| `APP_BASE_URL` | Recommended | Deployed URL, used for links in the confirmation email. |
| `RESEND_WAITLIST_TEMPLATE_ID` | No | Resend template ID. Falls back to the built-in HTML email if unset. |
| `WAITLIST_EMAIL_SUBJECT` | No | Overrides the default email subject. |
| `WAITLIST_EMAIL_LOGO_URL` | No | Logo shown in the confirmation email. |

## Deploy on Vercel

Push to GitHub and import the repo into [Vercel](https://vercel.com/new). Vercel auto-detects Next.js — no extra config needed. Add the environment variables above under **Settings → Environment Variables**. The minimum to go live is `MONGODB_URI`.
