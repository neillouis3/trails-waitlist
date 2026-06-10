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

// ─── SVG / icon helpers ──────────────────────────────────────────────────────

function TrailMapBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.1]"
      viewBox="0 0 480 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="white" strokeWidth="0.5" opacity="0.25">
        <path d="M0 64 H480 M0 128 H480 M0 192 H480 M0 256 H480" />
        <path d="M80 0 V320 M160 0 V320 M240 0 V320 M320 0 V320 M400 0 V320" />
      </g>
      <g fill="none" stroke="white" strokeWidth="1" opacity="0.4">
        <path d="M300 120 C300 86 360 70 400 92 C436 112 432 158 392 166 C352 174 300 156 300 120 Z" />
        <path d="M322 122 C322 100 360 90 388 104 C414 117 412 146 384 152 C356 158 322 146 322 122 Z" />
        <path d="M344 124 C344 112 364 108 378 116 C392 124 388 138 372 140 C358 142 344 134 344 124 Z" />
      </g>
      <g fill="none" stroke="white" strokeWidth="1" opacity="0.35">
        <path d="M70 230 C70 204 118 196 146 214 C172 230 166 264 132 268 C100 272 70 258 70 230 Z" />
        <path d="M92 232 C92 216 122 210 142 222 C160 233 156 252 132 256 C110 259 92 248 92 232 Z" />
      </g>
      <path
        d="M28 300 C78 270 58 214 120 204 C176 195 190 246 236 214 C282 184 286 128 346 140 C402 151 408 92 458 66"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 9"
        opacity="0.9"
      />
      <g fill="white">
        <circle cx="120" cy="204" r="3" opacity="0.6" />
        <circle cx="236" cy="214" r="3" opacity="0.6" />
        <circle cx="346" cy="140" r="3" opacity="0.6" />
      </g>
      <circle cx="28" cy="300" r="6" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="28" cy="300" r="2" fill="white" />
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

// ─── Feature section illustrations ───────────────────────────────────────────

/** Trailbook: minimalist map with traced routes filling in */
function TrailbookIllustration() {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      {/* Map background */}
      <rect width="360" height="260" rx="12" fill="#1a2e1f" />
      {/* Grid */}
      <g stroke="#2d4a35" strokeWidth="0.5">
        <path d="M0 52 H360 M0 104 H360 M0 156 H360 M0 208 H360" />
        <path d="M72 0 V260 M144 0 V260 M216 0 V260 M288 0 V260" />
      </g>
      {/* Region fill blobs — visited trails */}
      <ellipse cx="110" cy="80" rx="38" ry="26" fill="rgba(82,176,122,0.15)" />
      <ellipse cx="240" cy="140" rx="50" ry="32" fill="rgba(82,176,122,0.12)" />
      <ellipse cx="160" cy="190" rx="42" ry="24" fill="rgba(82,176,122,0.10)" />
      {/* Traced trail routes */}
      <path
        d="M40 200 C80 170 70 120 110 100 C148 80 170 130 210 118 C248 106 260 60 310 44"
        stroke="#52b07a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 0"
        opacity="0.9"
      />
      <path
        d="M60 240 C100 210 130 220 160 200 C192 180 200 200 240 188 C276 176 290 190 330 180"
        stroke="#52b07a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M100 140 C130 120 150 100 180 110 C210 120 220 145 255 130"
        stroke="#a8d5b5"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="4 3"
        opacity="0.5"
      />
      {/* Trail waypoints */}
      {([
        [110, 100],
        [210, 118],
        [160, 200],
        [240, 188],
      ] as [number, number][]).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5" fill="#1a2e1f" stroke="#52b07a" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2" fill="#52b07a" />
        </g>
      ))}
      {/* Stats overlay */}
      <rect x="16" y="16" width="120" height="52" rx="8" fill="rgba(0,0,0,0.55)" />
      <text x="28" y="36" fill="#52b07a" fontSize="18" fontWeight="600" fontFamily="sans-serif">14</text>
      <text x="50" y="36" fill="#a3a3a3" fontSize="10" fontFamily="sans-serif">/ 47 trails</text>
      <text x="28" y="52" fill="#f0ebe0" fontSize="11" fontFamily="sans-serif">Gros Morne region</text>
      <text x="28" y="63" fill="#6b7c71" fontSize="9" fontFamily="sans-serif">243 km · 8,400 m elev</text>
    </svg>
  );
}

/** Checkpoints: phone screen showing checkpoint prompt */
function CheckpointsIllustration() {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="360" height="260" rx="12" fill="#0f1a12" />
      {/* Trail path */}
      <path
        d="M30 240 C80 200 100 160 150 140 C200 120 220 150 270 120 C310 96 330 70 350 50"
        stroke="#2d4a35"
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M30 240 C80 200 100 160 150 140 C200 120 220 150 270 120 C310 96 330 70 350 50"
        stroke="#3a5c42"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
        opacity="0.6"
      />
      {/* Completed checkpoints */}
      {([
        [150, 140],
        [270, 120],
      ] as [number, number][]).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="#1a3d2b" stroke="#52b07a" strokeWidth="1.5" />
          <path
            d={`M${cx - 4} ${cy} L${cx - 1} ${cy + 3} L${cx + 5} ${cy - 4}`}
            stroke="#52b07a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
      {/* Active checkpoint pin */}
      <g>
        <circle cx="150" cy="60" r="16" fill="#52b07a" opacity="0.15" />
        <circle cx="150" cy="60" r="10" fill="#52b07a" opacity="0.25" />
        <path
          d="M150 42 C143 42 137 48 137 55 C137 64 150 74 150 74 C150 74 163 64 163 55 C163 48 157 42 150 42 Z"
          fill="#52b07a"
        />
        <circle cx="150" cy="55" r="4" fill="white" />
      </g>
      {/* Notification card */}
      <rect x="60" y="90" width="240" height="80" rx="10" fill="rgba(26,45,31,0.96)" stroke="rgba(82,176,122,0.3)" strokeWidth="0.5" />
      <text x="80" y="114" fill="#52b07a" fontSize="10" fontFamily="sans-serif" fontWeight="500">CHECKPOINT REACHED</text>
      <text x="80" y="132" fill="#f0ebe0" fontSize="13" fontFamily="sans-serif" fontWeight="500">Western Brook Pond Gorge</text>
      <text x="80" y="148" fill="#6b7c71" fontSize="10" fontFamily="sans-serif">Take a photo to verify your visit</text>
      {/* Camera button */}
      <rect x="200" y="154" width="84" height="28" rx="6" fill="#52b07a" />
      <text x="242" y="172" fill="white" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">📷 Take photo</text>
      {/* Rarity badge */}
      <rect x="16" y="16" width="88" height="22" rx="11" fill="rgba(186,117,23,0.2)" stroke="rgba(186,117,23,0.4)" strokeWidth="0.5" />
      <text x="60" y="31" fill="#ef9f27" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="500">✦ RARE checkpoint</text>
    </svg>
  );
}

/** Stats profile card illustration */
function StatsIllustration() {
  const bars = [38, 55, 42, 70, 61, 83, 74, 90, 68, 95, 78, 100];
  const barW = 18;
  const barGap = 6;
  const chartX = 20;
  const chartY = 212;
  const chartH = 48;
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="360" height="260" rx="12" fill="#f7f5f0" />

      {/* Profile header */}
      <circle cx="36" cy="36" r="18" fill="rgba(82,176,122,0.15)" stroke="rgba(82,176,122,0.4)" strokeWidth="1" />
      <text x="36" y="41" fill="#2d6a4f" fontSize="13" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">NL</text>
      <text x="64" y="32" fill="#1a2e1f" fontSize="13" fontWeight="600" fontFamily="sans-serif">Neil L.</text>
      <text x="64" y="47" fill="#6b7c71" fontSize="10" fontFamily="sans-serif">Hiking since 2021</text>

      <rect x="20" y="64" width="320" height="0.5" fill="#e0d8cc" />

      {/* Big stat cards */}
      {[
        { x: 20,  label: "Distance", value: "312 km" },
        { x: 130, label: "Elevation", value: "14,820 m" },
        { x: 240, label: "Trails", value: "38" },
      ].map(({ x, label, value }) => (
        <g key={label}>
          <rect x={x} y="76" width="100" height="56" rx="8" fill="white" stroke="#e0d8cc" strokeWidth="0.5" />
          <text x={x + 50} y="102" fill="#1a2e1f" fontSize="16" fontWeight="600" fontFamily="sans-serif" textAnchor="middle">{value}</text>
          <text x={x + 50} y="118" fill="#6b7c71" fontSize="9" fontFamily="sans-serif" textAnchor="middle">{label}</text>
        </g>
      ))}

      {/* Section label */}
      <text x="20" y="153" fill="#a39b88" fontSize="9" fontFamily="sans-serif" fontWeight="500">MONTHLY DISTANCE (KM)</text>

      {/* Bar chart */}
      {bars.map((pct, i) => {
        const bx = chartX + i * (barW + barGap);
        const bh = (pct / 100) * chartH;
        const by = chartY - bh;
        const isLast = i === bars.length - 1;
        return (
          <g key={i}>
            <rect x={bx} y={by} width={barW} height={bh} rx="3"
              fill={isLast ? "#52b07a" : "rgba(82,176,122,0.25)"}
            />
          </g>
        );
      })}

      {/* Month labels */}
      {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
        <text key={m + i} x={chartX + i * (barW + barGap) + barW / 2} y={chartY + 14}
          fill="#a39b88" fontSize="8" fontFamily="sans-serif" textAnchor="middle"
        >{m}</text>
      ))}

      {/* This year badge */}
      <rect x="20" y="232" width="320" height="0.5" fill="#e0d8cc" />
      <text x="20" y="251" fill="#6b7c71" fontSize="9" fontFamily="sans-serif">This year</text>
      <text x="340" y="251" fill="#2d6a4f" fontSize="9" fontFamily="sans-serif" fontWeight="500" textAnchor="end">↑ 41% more than last year</text>
    </svg>
  );
}

// ─── Feature sections data ────────────────────────────────────────────────────

const FEATURE_SECTIONS = [
  {
    eyebrow: "Trailbook",
    heading: "Every hike you've ever done, on one map.",
    body: "Your Trailbook fills in as you hike — a living map of every trail you've completed across Newfoundland & Labrador. Watch your province slowly light up. Share it. Make others jealous.",
    bullets: [
      "Trails traced on your personal map as you log hikes",
      "Region completion — see how much of NL you've covered",
      "Total distance, elevation, and trail count at a glance",
      "Shareable profile that updates in real time",
    ],
    Illustration: TrailbookIllustration,
    imageRight: false,
    bg: "#ffffff",
    accentColor: "#52b07a",
  },
  {
    eyebrow: "Checkpoints",
    heading: "The trails have secrets. Go find them.",
    body: "Hidden checkpoints are placed along trails — viewpoints, summits, hidden coves. Your phone buzzes when you're close. Take a photo to claim it. Some are rare. Some only appear in certain seasons.",
    bullets: [
      "GPS-triggered photo verification at key moments",
      "Rare, seasonal, and limited-time checkpoint tiers",
      "Collectible stamps on your Trailbook profile",
      "Community-nominated checkpoint locations",
    ],
    Illustration: CheckpointsIllustration,
    imageRight: true,
    bg: "#f7f5f0",
    accentColor: "#52b07a",
  },
  {
    eyebrow: "Your stats",
    heading: "See how far you've actually come.",
    body: "Total distance, elevation gained, trails completed, longest hike, most active month. Watch the numbers grow over weeks, months, and years.",
    bullets: [
      "Total distance and elevation logged over your lifetime",
      "Monthly activity chart",
      "Trails completed, unique regions visited, longest streak",
      "Year-over-year comparison so progress feels real",
    ],
    Illustration: StatsIllustration,
    imageRight: false,
    bg: "#ffffff",
    accentColor: "#52b07a",
  },
];

// ─── Reusable feature row ─────────────────────────────────────────────────────

function FeatureSection({
  eyebrow,
  heading,
  body,
  bullets,
  Illustration,
  imageRight,
  bg,
  accentColor,
}: (typeof FEATURE_SECTIONS)[number]) {
  return (
    <section
      className="w-full px-6 py-20 sm:px-8 md:px-10 lg:py-28"
      style={{ backgroundColor: bg }}
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Illustration — left or right */}
        <div
          className={`relative aspect-[7/5] w-full overflow-hidden rounded-2xl ${imageRight ? "lg:order-last" : ""}`}
          style={{ border: "0.5px solid rgba(0,0,0,0.07)" }}
        >
          <Illustration />
        </div>

        {/* Text */}
        <div>
          <span
            className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {eyebrow}
          </span>
          <h2
            className="font-landing-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl"
            style={{ color: "#1a2e1f" }}
          >
            {heading}
          </h2>
          <p
            className="mt-4 text-[14px] leading-relaxed"
            style={{ color: "#4a5e52" }}
          >
            {body}
          </p>
          <ul className="mt-6 space-y-2.5">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[13px] leading-snug"
                style={{ color: "#4a5e52" }}
              >
                <span
                  className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(82,176,122,0.15)",
                    border: "0.5px solid rgba(82,176,122,0.4)",
                  }}
                >
                  <svg width="8" height="7" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke={accentColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Regional pride section ───────────────────────────────────────────────────

function SocialIllustration() {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="360" height="260" rx="12" fill="#0f1a12" />

      {/* Post card 1 */}
      <rect x="20" y="16" width="220" height="108" rx="10" fill="#1a2e1f" stroke="#2d4a35" strokeWidth="0.5" />
      <rect x="20" y="16" width="220" height="64" rx="10" fill="#2d4a35" />
      <rect x="20" y="60" width="220" height="20" fill="#2d4a35" />
      <path d="M20 58 Q80 44 130 50 Q180 56 240 46 L240 80 L20 80Z" fill="#1e3d26" />
      <path d="M60 58 Q75 48 90 52 Q105 56 115 50 Q125 44 135 50 L135 58Z" fill="#162d1c" />
      <circle cx="36" cy="92" r="10" fill="#2d6a4f" stroke="#0f1a12" strokeWidth="1.5" />
      <text x="36" y="96" fill="#a8d5b5" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">AJ</text>
      <text x="52" y="90" fill="#f0ebe0" fontSize="10" fontFamily="sans-serif" fontWeight="500">Alex J.</text>
      <text x="52" y="102" fill="#6b7c71" fontSize="8" fontFamily="sans-serif">Signal Hill · 2h ago</text>
      <text x="164" y="102" fill="#52b07a" fontSize="9" fontFamily="sans-serif">♥ 24</text>
      <text x="198" y="102" fill="#6b7c71" fontSize="9" fontFamily="sans-serif">💬 6</text>

      {/* Post card 2 */}
      <rect x="20" y="136" width="220" height="108" rx="10" fill="#1a2e1f" stroke="#2d4a35" strokeWidth="0.5" />
      <rect x="20" y="136" width="220" height="64" rx="10" fill="#243d2a" />
      <rect x="20" y="176" width="220" height="24" fill="#243d2a" />
      <path d="M20 168 Q60 158 100 164 Q150 170 240 160 L240 200 L20 200Z" fill="#1a3030" />
      <path d="M180 158 L200 136 L220 145 L240 136 L240 158Z" fill="#1e3220" />
      <circle cx="36" cy="212" r="10" fill="#3d5e45" stroke="#0f1a12" strokeWidth="1.5" />
      <text x="36" y="216" fill="#a8d5b5" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">MR</text>
      <text x="52" y="210" fill="#f0ebe0" fontSize="10" fontFamily="sans-serif" fontWeight="500">Maya R.</text>
      <text x="52" y="222" fill="#6b7c71" fontSize="8" fontFamily="sans-serif">Tablelands · 5h ago</text>
      <text x="164" y="222" fill="#52b07a" fontSize="9" fontFamily="sans-serif">♥ 41</text>
      <text x="198" y="222" fill="#6b7c71" fontSize="9" fontFamily="sans-serif">💬 9</text>

      {/* Right panel */}
      <rect x="256" y="16" width="88" height="228" rx="10" fill="#1a2e1f" stroke="#2d4a35" strokeWidth="0.5" />
      <text x="300" y="36" fill="#6b7c71" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Following</text>
      <rect x="268" y="42" width="64" height="0.5" fill="#2d4a35" />
      {([
        { initials: "TK", name: "Tom K.", action: "logged a hike", y: 60 },
        { initials: "SR", name: "Sara R.", action: "photo post", y: 100 },
        { initials: "DJ", name: "Dan J.", action: "new trail", y: 140 },
        { initials: "KL", name: "Kim L.", action: "logged a hike", y: 180 },
      ] as { initials: string; name: string; action: string; y: number }[]).map(({ initials, name, action, y }) => (
        <g key={initials}>
          <circle cx="276" cy={y + 8} r="8" fill="#2d4a35" />
          <text x="276" y={y + 12} fill="#a8d5b5" fontSize="6" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">{initials}</text>
          <text x="290" y={y + 7} fill="#d4d4d4" fontSize="7.5" fontFamily="sans-serif" fontWeight="500">{name}</text>
          <text x="290" y={y + 17} fill="#6b7c71" fontSize="7" fontFamily="sans-serif">{action}</text>
        </g>
      ))}
    </svg>
  );
}

function SocialSection() {
  return (
    <section
      className="w-full px-6 py-20 sm:px-8 md:px-10 lg:py-28"
      style={{ backgroundColor: "#1a2e1f" }}
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div
          className="relative aspect-[7/5] w-full overflow-hidden rounded-2xl lg:order-last"
          style={{ border: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <SocialIllustration />
        </div>

        <div>
          <span
            className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: "#52b07a" }}
          >
            Community
          </span>
          <h2
            className="font-landing-display text-3xl font-normal leading-tight tracking-tight sm:text-4xl"
            style={{ color: "#f0ebe0" }}
          >
            Hike together, even when you're apart.
          </h2>
          <p
            className="mt-4 text-[14px] leading-relaxed"
            style={{ color: "#7a9e87" }}
          >
            Follow local hikers, see what trails they're hitting, and share your own adventures. A feed built around people who actually hike in NL.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Photo posts with trail tags, conditions, and difficulty",
              "Follow friends and see their hikes in real time",
              "Trail stories — ephemeral 24hr posts from the trail",
              "Activity feed so you never miss a hike in your circle",
            ].map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[13px] leading-snug"
                style={{ color: "#7a9e87" }}
              >
                <span
                  className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(82,176,122,0.15)",
                    border: "0.5px solid rgba(82,176,122,0.35)",
                  }}
                >
                  <svg width="8" height="7" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#52b07a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Social proof / CTA strip ─────────────────────────────────────────────────

function CtaStrip({ onJoin }: { onJoin: () => void }) {
  return (
    <section
      className="w-full px-6 py-16 sm:px-8 md:px-10"
      style={{ backgroundColor: "#f7f5f0", borderTop: "0.5px solid #e0d8cc" }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            className="font-landing-display text-2xl font-normal"
            style={{ color: "#1a2e1f" }}
          >
            Ready to start your next trail?
          </h2>
          <p className="mt-1 text-[13px]" style={{ color: "#6b7c71" }}>
            Free early access for everyone on the waitlist.
          </p>
        </div>
        <Button
          onPress={onJoin}
          className="h-11 shrink-0 font-medium"
          style={{ backgroundColor: ACCENT, color: "#ffffff" }}
        >
          Join the waitlist →
        </Button>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function WaitlistLandingPage({
  waitlistCount = 0,
}: {
  waitlistCount?: number;
}) {
  const stats = [
    { value: "247+", label: "trails across NL, ready to explore" },
    {
      value: (waitlistCount + 100).toLocaleString(),
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
        data.message ??
          "You're on the list. We'll email you when NexTrails opens."
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
    <div className="flex w-full flex-col font-sans">
      {/* ── Hero ── */}
      <section
        className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden px-6 py-16 sm:px-8 md:px-10"
        style={{ backgroundColor: HERO_DARK }}
      >
        <TrailMapBackground />

        <div className="relative z-10 mx-auto w-full max-w-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/trail.png" alt="NexTrails" className="mb-5 h-11 w-auto" />

          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-normal text-neutral-300">
            <PulseDot />
            Coming soon to NL
          </span>

          <h1
            className="font-landing-display mt-6 text-4xl leading-[1.12] font-normal tracking-tight sm:text-6xl lg:text-7xl"
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

          <div className="mt-8 flex flex-wrap gap-5 sm:gap-7">
            {stats.map(({ value, label }) => (
              <div key={label} className="min-w-[90px] max-w-[120px] flex-1">
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

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <Button
              onPress={scrollToWaitlist}
              className="h-11 w-full justify-center gap-2 font-medium sm:w-auto"
              style={{ backgroundColor: ACCENT, color: "#ffffff" }}
            >
              Join the waitlist
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M3 8l5 5 5-5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button
              variant="outline"
              onPress={scrollToWaitlist}
              className="h-11 w-full justify-center gap-2 border-white/20 font-normal sm:w-auto"
              style={{ color: "#a8d5b5" }}
            >
              Learn more
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="#a8d5b5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Feature sections ── */}
      {FEATURE_SECTIONS.map((section) => (
        <FeatureSection key={section.eyebrow} {...section} />
      ))}

      {/* ── Regions ── */}
      <SocialSection />

      {/* ── CTA strip ── */}
      <CtaStrip onJoin={scrollToWaitlist} />

      {/* ── Waitlist form ── */}
      <section
        id="waitlist"
        className="flex min-h-[100svh] w-full flex-col justify-center bg-white px-6 py-16 sm:px-8 md:px-10"
      >
        <div className="mx-auto w-full max-w-md">
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
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-3">
                <circle cx="16" cy="16" r="15" stroke="#2d6a4f" strokeWidth="1" />
                <path d="M10 16.5L13.5 20L22 12" stroke="#2d6a4f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-medium" style={{ color: "#1a3d2b" }}>
                You&apos;re on the list!
              </p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "#2d6a4f" }}>
                {successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField fullWidth value={name} onChange={setName} isDisabled={isLoading}>
                <Label className="text-[11.5px] font-medium" style={{ color: "#4a6355" }}>
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

              <TextField fullWidth isRequired type="email" value={email} onChange={setEmail} isDisabled={isLoading}>
                <Label className="text-[11.5px] font-medium" style={{ color: "#4a6355" }}>
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
