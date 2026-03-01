import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Accumulate — Delegated Authority You Can Prove";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0B0F17 0%, #101827 50%, #0B0F17 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,166,251,0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            zIndex: 1,
          }}
        >
          {/* Logo mark - network icon */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(135deg, #3B82F6, #00A6FB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 60px rgba(59,130,246,0.3)",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="6" fill="white" />
              <circle cx="24" cy="8" r="4" fill="white" opacity="0.8" />
              <circle cx="24" cy="40" r="4" fill="white" opacity="0.8" />
              <circle cx="8" cy="24" r="4" fill="white" opacity="0.8" />
              <circle cx="40" cy="24" r="4" fill="white" opacity="0.8" />
              <line x1="24" y1="18" x2="24" y2="12" stroke="white" strokeWidth="2" opacity="0.6" />
              <line x1="24" y1="36" x2="24" y2="30" stroke="white" strokeWidth="2" opacity="0.6" />
              <line x1="18" y1="24" x2="12" y2="24" stroke="white" strokeWidth="2" opacity="0.6" />
              <line x1="36" y1="24" x2="30" y2="24" stroke="white" strokeWidth="2" opacity="0.6" />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#E7EEF9",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Accumulate
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 24,
              color: "#A7B3C6",
              maxWidth: 600,
              textAlign: "center",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Delegated authority you can prove — across organizations.
          </div>

          {/* Bottom accent bar */}
          <div
            style={{
              width: 120,
              height: 3,
              borderRadius: 2,
              background: "linear-gradient(90deg, #3B82F6, #00A6FB)",
              marginTop: 8,
              display: "flex",
            }}
          />
        </div>

        {/* Bottom border line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #3B82F6, #00A6FB, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
