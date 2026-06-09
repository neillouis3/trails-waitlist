"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";

import { ACCENT } from "@/lib/theme";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HERO_DARK = "#171717";

const FEATURES = [
  "Map 247+ NL trails and log your hikes",
  "Follow local hikers and build your trail feed",
  "Share photos, routes, and difficulty ratings",
];

const STATS = [
  { value: "247+", label: "Trails mapped" },
  { value: "NL-wide", label: "Province coverage" },
  { value: "Free", label: "Always" },
];

function TopoBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.08]"
      viewBox="0 0 480 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        d="M-20 130 Q100 60 200 100 Q300 140 500 70"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
      />
      <path
        d="M-20 160 Q80 90 200 130 Q330 170 500 100"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
      />
      <path
        d="M-20 190 Q90 120 210 155 Q340 195 500 130"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
      />
      <path
        d="M-20 220 Q100 155 220 185 Q350 220 500 160"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
      />
      <path
        d="M-20 260 Q110 200 230 230 Q355 265 500 205"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
      />
      <path
        d="M-20 100 Q110 30 220 70 Q320 110 500 45"
        fill="none"
        stroke="white"
        strokeWidth="1.2"
      />
      <circle cx="220" cy="90" r="4" fill="white" opacity="0.5" />
      <circle cx="310" cy="115" r="3" fill="white" opacity="0.35" />
      <path
        d="M220 90 L310 115"
        stroke="white"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}

function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ backgroundColor: "#52b07a" }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: "#52b07a" }}
      />
    </span>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
      style={{
        background: "rgba(82,176,122,0.18)",
        border: "0.5px solid rgba(82,176,122,0.45)",
      }}
    >
      <svg width="8" height="7" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke="#52b07a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function WaitlistLandingPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          name: name.trim() || undefined,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setError(data.error ?? "Unable to join the waitlist. Try again.");
        return;
      }

      setSuccessMessage(
        data.message ?? "You're on the list. We'll email you when Trail opens."
      );
      setEmail("");
      setName("");
    } catch {
      setError("Unable to join the waitlist. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen flex-col font-sans">
      <section
        className="relative flex h-screen w-screen flex-col justify-center overflow-hidden px-10"
        style={{ backgroundColor: HERO_DARK }}
      >
        <TopoBackground />

        <div className="relative z-10 mx-auto w-3/4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/trail.png" alt="Trail" className="mb-5 h-11 w-auto" />

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-normal text-neutral-300">
              <PulseDot />
              Coming soon to NL
            </span>

            <h1
              className="font-landing-display mt-6 text-5xl leading-[1.12] font-normal tracking-tight sm:text-6xl lg:text-7xl"
              style={{ color: "#f0ebe0" }}
            >
              Discover{" "}
              <em className="text-neutral-200">every trail</em>
              <br />
              in the province
            </h1>

            <p
              className="mt-3 text-sm leading-relaxed font-light"
              style={{ color: "#a3a3a3" }}
            >
              A social platform for hikers across Newfoundland & Labrador —
              map routes, share adventures, and find your next hike.
            </p>

            <ul className="mt-7 space-y-2.5">
              {FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[12.5px] leading-snug"
                  style={{ color: "#d4d4d4" }}
                >
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <div
              className="mt-8 flex gap-7 border-t pt-7"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-lg font-medium" style={{ color: "#f0ebe0" }}>
                    {value}
                  </p>
                  <p className="text-[11px]" style={{ color: "#a3a3a3" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-2.5">
              <Button
                onPress={scrollToWaitlist}
                className="h-11 gap-2 font-medium"
                style={{ backgroundColor: ACCENT, color: "#ffffff" }}
              >
                Join the waitlist
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 3v10M3 8l5 5 5-5"
                    stroke="#ffffff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>

              <Button
                variant="outline"
                onPress={scrollToWaitlist}
                className="h-11 gap-2 border-white/20 font-normal"
                style={{ color: "#a8d5b5" }}
              >
                Learn more
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M8 3l5 5-5 5"
                    stroke="#a8d5b5"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
        </div>
      </section>

      <section
        id="waitlist"
        className="flex h-screen w-screen flex-col justify-center bg-white px-10"
      >
        <div className="mx-auto w-3/4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trail.png" alt="Trail" className="mb-6 h-12 w-auto" />

          <h2
            className="font-landing-display text-[22px] font-normal"
            style={{ color: "#1a2e1f" }}
          >
            Get early access
          </h2>
          <p
            className="mt-1.5 mb-7 text-[13px] leading-relaxed"
            style={{ color: "#6b7c71" }}
          >
            Be among the first hikers to access Trail when it launches.
          </p>

          <div className="mb-6 h-px" style={{ backgroundColor: "#d8d0c0" }} />

          {successMessage ? (
            <div
              className="rounded-xl border px-5 py-5 text-center"
              style={{ backgroundColor: "#e4f0e8", borderColor: "#a8c8b5" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="mx-auto mb-3"
              >
                <circle cx="16" cy="16" r="15" stroke="#2d6a4f" strokeWidth="1" />
                <path
                  d="M10 16.5L13.5 20L22 12"
                  stroke="#2d6a4f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm font-medium" style={{ color: "#1a3d2b" }}>
                You&apos;re on the list!
              </p>
              <p
                className="mt-1 text-sm leading-relaxed"
                style={{ color: "#2d6a4f" }}
              >
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                fullWidth
                value={name}
                onChange={setName}
                isDisabled={isLoading}
              >
                <Label
                  className="text-[11.5px] font-medium"
                  style={{ color: "#4a6355" }}
                >
                  Name{" "}
                  <span className="font-normal" style={{ color: "#a39b88" }}>
                    (optional)
                  </span>
                </Label>
                <Input
                  placeholder="Your name"
                  autoComplete="name"
                  className="border-[0.5px] border-[#e5e5e5] bg-white text-[#1a2e1f] placeholder:text-[#a39b88] hover:border-[#d4d4d4] focus-within:border-[#2d6a4f]"
                />
              </TextField>

              <TextField
                fullWidth
                isRequired
                type="email"
                value={email}
                onChange={setEmail}
                isDisabled={isLoading}
              >
                <Label
                  className="text-[11.5px] font-medium"
                  style={{ color: "#4a6355" }}
                >
                  Email
                </Label>
                <Input
                  placeholder="you@example.com"
                  autoComplete="email"
                  type="email"
                  className="border-[0.5px] border-[#e5e5e5] bg-white text-[#1a2e1f] placeholder:text-[#a39b88] hover:border-[#d4d4d4] focus-within:border-[#2d6a4f]"
                />
              </TextField>

              {error ? (
                <p className="text-xs" style={{ color: "#b84040" }}>
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                fullWidth
                isDisabled={isLoading}
                className="h-11 font-medium"
                style={{ backgroundColor: ACCENT, color: "#ffffff" }}
              >
                {isLoading ? "Joining…" : "Join the waitlist"}
              </Button>
            </form>
          )}

          <p className="mt-5 text-center text-xs" style={{ color: "#8a9e90" }}>
            Already have access?{" "}
            <Link
              href="/login"
              className="font-medium hover:underline"
              style={{ color: ACCENT }}
            >
              Sign in →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
