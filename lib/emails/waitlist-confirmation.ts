import { Resend } from "resend";

const TRAIL_GREEN = "#2D6A4F";
const RESEND_TEST_RECIPIENT_HINT =
  "Resend test mode only delivers to your account email. Verify a domain at resend.com/domains to send to any address.";

type WaitlistConfirmationParams = {
  email: string;
  name?: string;
};

type SendResult = {
  sent: boolean;
  error?: string;
  method?: "template" | "html";
};

function getBaseUrl() {
  return process.env.APP_BASE_URL ?? "http://localhost:3000";
}

function getFromAddress() {
  return process.env.WAITLIST_FROM_EMAIL ?? "Trail <onboarding@resend.dev>";
}

function getSubject() {
  return process.env.WAITLIST_EMAIL_SUBJECT ?? "You're on the Trail waitlist";
}

function getTemplateVariables(name?: string): Record<string, string> {
  const greeting = name?.trim() ? `Hi ${name.trim()},` : "Hi there,";

  return {
    GREETING: greeting,
    NAME: name?.trim() || "there",
    LOGIN_URL: `${getBaseUrl()}/login`,
  };
}

function isResendTestRecipientError(message?: string) {
  return message?.includes("only send testing emails to your own email address") ?? false;
}

function buildHtml({ name }: WaitlistConfirmationParams) {
  const greeting = name?.trim() ? `Hi ${name.trim()},` : "Hi there,";
  const baseUrl = getBaseUrl();
  const logoUrl =
    process.env.WAITLIST_EMAIL_LOGO_URL ??
    "https://resend-attachments.s3.amazonaws.com/86863b8b-73a0-4c43-9dd2-9eba5bd7cf4d";

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="width=device-width" name="viewport" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      body { margin: 0; padding: 40px 16px; background: #eee9df; font-family: 'DM Sans', Arial, sans-serif; color: #1a2e1f; }
      .wrap { max-width: 560px; margin: 0 auto; }
      .logo { text-align: center; padding-bottom: 28px; }
      .logo img { height: 40px; width: auto; }
      .card { background: #1a3d2b; border-radius: 16px; overflow: hidden; }
      .hero { padding: 36px 32px 28px; }
      .hero h1 { margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 400; line-height: 1.2; color: #f0ebe0; }
      .hero h1 em { color: #7ecfa0; font-style: italic; }
      .hero p { margin: 14px 0 0; font-size: 14px; line-height: 1.6; color: #7ea88f; font-weight: 300; }
      .body { background: #ffffff; padding: 32px; }
      .body p { margin: 0 0 16px; font-size: 15px; line-height: 1.65; color: #4a6355; }
      .footer { padding: 0 32px 28px; background: #ffffff; }
      .footer p { margin: 0; font-size: 12px; color: #8a9e90; }
      .footer a { color: ${TRAIL_GREEN}; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="logo">
        <img src="${logoUrl}" alt="Trail" />
      </div>
      <div class="card">
        <div class="hero">
          <h1>The trails are <em>waiting</em></h1>
          <p>You're on the Trail waitlist for Newfoundland &amp; Labrador.</p>
        </div>
        <div class="body">
          <p>${greeting}</p>
          <p>Thanks for signing up. We're building a social platform for hikers — map routes, share adventures, and find your next hike.</p>
          <p>We'll email you when early access opens. No spam, just a note when Trail is ready.</p>
        </div>
        <div class="footer">
          <p>Already have access? <a href="${baseUrl}/login">Sign in</a></p>
        </div>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

function buildText({ name }: WaitlistConfirmationParams) {
  const greeting = name?.trim() ? `Hi ${name.trim()},` : "Hi there,";

  return `${greeting}

You're on the Trail waitlist for Newfoundland & Labrador.

Thanks for signing up. We'll email you when early access opens.

Sign in if you already have access: ${getBaseUrl()}/login

— The Trail team`;
}

async function sendHtmlEmail(
  resend: Resend,
  params: WaitlistConfirmationParams
): Promise<SendResult> {
  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: params.email,
    subject: getSubject(),
    html: buildHtml(params),
    text: buildText(params),
  });

  if (error) {
    const message = isResendTestRecipientError(error.message)
      ? RESEND_TEST_RECIPIENT_HINT
      : error.message;

    console.error("Waitlist HTML email failed:", error);
    return { sent: false, error: message, method: "html" };
  }

  return { sent: true, method: "html" };
}

async function sendTemplateEmail(
  resend: Resend,
  params: WaitlistConfirmationParams
): Promise<SendResult> {
  const templateId = process.env.RESEND_WAITLIST_TEMPLATE_ID;
  if (!templateId) {
    return { sent: false, error: "RESEND_WAITLIST_TEMPLATE_ID is not set" };
  }

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: params.email,
    subject: getSubject(),
    template: {
      id: templateId,
      variables: getTemplateVariables(params.name),
    },
  });

  if (error) {
    const message = isResendTestRecipientError(error.message)
      ? RESEND_TEST_RECIPIENT_HINT
      : error.message;

    console.error("Waitlist template email failed:", error);
    return { sent: false, error: message, method: "template" };
  }

  return { sent: true, method: "template" };
}

export async function sendWaitlistConfirmationEmail(
  params: WaitlistConfirmationParams
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set; skipping waitlist confirmation email.");
    return { sent: false, error: "RESEND_API_KEY is not set" };
  }

  try {
    const resend = new Resend(apiKey);
    const templateId = process.env.RESEND_WAITLIST_TEMPLATE_ID;

    if (templateId) {
      const templateResult = await sendTemplateEmail(resend, params);
      if (templateResult.sent) {
        return templateResult;
      }

      if (isResendTestRecipientError(templateResult.error)) {
        return templateResult;
      }

      console.warn(
        "Waitlist template send failed; falling back to inline HTML:",
        templateResult.error
      );
      return sendHtmlEmail(resend, params);
    }

    return sendHtmlEmail(resend, params);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send confirmation email";
    console.error("Waitlist confirmation email failed:", error);
    return { sent: false, error: message };
  }
}
