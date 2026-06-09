"use client";

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


function TrailMapBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.1]"
      viewBox="0 0 480 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Map grid */}
      <g stroke="white" strokeWidth="0.5" opacity="0.25">
        <path d="M0 64 H480 M0 128 H480 M0 192 H480 M0 256 H480" />
        <path d="M80 0 V320 M160 0 V320 M240 0 V320 M320 0 V320 M400 0 V320" />
      </g>

      {/* Elevation contours — top-right hill */}
      <g fill="none" stroke="white" strokeWidth="1" opacity="0.4">
        <path d="M300 120 C300 86 360 70 400 92 C436 112 432 158 392 166 C352 174 300 156 300 120 Z" />
        <path d="M322 122 C322 100 360 90 388 104 C414 117 412 146 384 152 C356 158 322 146 322 122 Z" />
        <path d="M344 124 C344 112 364 108 378 116 C392 124 388 138 372 140 C358 142 344 134 344 124 Z" />
      </g>

      {/* Elevation contours — lower-left hill */}
      <g fill="none" stroke="white" strokeWidth="1" opacity="0.35">
        <path d="M70 230 C70 204 118 196 146 214 C172 230 166 264 132 268 C100 272 70 258 70 230 Z" />
        <path d="M92 232 C92 216 122 210 142 222 C160 233 156 252 132 256 C110 259 92 248 92 232 Z" />
      </g>

      {/* Trail route */}
      <path
        d="M28 300 C78 270 58 214 120 204 C176 195 190 246 236 214 C282 184 286 128 346 140 C402 151 408 92 458 66"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 9"
        opacity="0.9"
      />

      {/* Waypoints */}
      <g fill="white">
        <circle cx="120" cy="204" r="3" opacity="0.6" />
        <circle cx="236" cy="214" r="3" opacity="0.6" />
        <circle cx="346" cy="140" r="3" opacity="0.6" />
      </g>

      {/* Start marker */}
      <circle cx="28" cy="300" r="6" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="28" cy="300" r="2" fill="white" />

      {/* End marker — location pin */}
      <path
        d="M458 50 C448 50 440 58 440 68 C440 80 458 92 458 92 C458 92 476 80 476 68 C476 58 468 50 458 50 Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <circle cx="458" cy="68" r="4" fill="white" />
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

export default function WaitlistLandingPage({
  waitlistCount = 0,
}: {
  waitlistCount?: number;
}) {
  const stats = [
    { value: "247+", label: "trails across NL, ready to explore" },
    {
      value: waitlistCount.toLocaleString(),
      label: "hikers already on the waitlist",
    },
    { value: "Free", label: "for everyone on the waitlist" },
  ];

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
        data.message ?? "You're on the list. We'll email you when NexTrails opens."
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
        <TrailMapBackground />

        <div className="relative z-10 mx-auto w-3/4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/trail.png" alt="NexTrails" className="mb-5 h-11 w-auto" />

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-normal text-neutral-300">
              <PulseDot />
              Coming soon to NL
            </span>

            <h1
              className="font-landing-display mt-6 text-5xl leading-[1.12] font-normal tracking-tight sm:text-6xl lg:text-7xl"
              style={{ color: "#f0ebe0" }}
            >
              Every trail.
              <br />
              <em className="text-neutral-200">One community.</em>
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

            <div className="mt-8 flex gap-7">
              {stats.map(({ value, label }) => (
                <div key={label} className="max-w-[120px] flex-1">
                  <p className="text-lg font-medium" style={{ color: "#f0ebe0" }}>
                    {value}
                  </p>
                  <p
                    className="mt-0.5 text-[11px] leading-snug"
                    style={{ color: "#a3a3a3" }}
                  >
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
          <img src="/trail.png" alt="NexTrails" className="mb-6 h-12 w-auto" />

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
            Be among the first hikers to access NexTrails when it launches.
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
        </div>
      </section>
    </div>
  );
}
