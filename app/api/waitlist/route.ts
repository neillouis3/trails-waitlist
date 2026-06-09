import { NextRequest, NextResponse } from "next/server";
import { sendWaitlistConfirmationEmail } from "@/lib/emails/waitlist-confirmation";
import connection from "@/lib/mongo";
import Waitlist from "@/lib/models/waitlist";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; name?: string };
    const email = body.email?.trim().toLowerCase() ?? "";
    const name = body.name?.trim() ?? "";

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await connection();

    const existing = await Waitlist.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json({
        ok: true,
        alreadyJoined: true,
        message: "You're already on the waitlist. We'll be in touch soon.",
      });
    }

    await Waitlist.create({ email, name });

    const emailResult = await sendWaitlistConfirmationEmail({ email, name });
    const isDev = process.env.NODE_ENV === "development";

    return NextResponse.json({
      ok: true,
      alreadyJoined: false,
      emailSent: emailResult.sent,
      message: emailResult.sent
        ? "You're on the list. Check your inbox for a confirmation email."
        : "You're on the list. We'll email you when NexTrails opens up.",
      ...(isDev && emailResult.error ? { emailError: emailResult.error } : {}),
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json({
        ok: true,
        alreadyJoined: true,
        message: "You're already on the waitlist. We'll be in touch soon.",
      });
    }

    if (error instanceof Error && error.message === "MONGODB_URI is not set") {
      return NextResponse.json(
        { error: "Waitlist storage is not configured. Add MONGODB_URI to your environment." },
        { status: 503 }
      );
    }

    console.error("Waitlist signup failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
