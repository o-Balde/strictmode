import { ImageResponse } from "next/og";

export const alt = "StrictMode — React & TypeScript Interview Reps";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#12100f",
          padding: "80px",
          color: "#f4ede4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "#e4572e",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#f4ede4",
            }}
          >
            strictmode
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "60px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#f4ede4",
            }}
          >
            Ten minutes of React + TypeScript reps a day.
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#a3998e",
              lineHeight: 1.4,
            }}
          >
            Spaced repetition drill for senior frontend interviews. 760+ questions. Zero signup.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "20px",
            color: "#e4572e",
            fontWeight: 600,
          }}
        >
          <span>strictmode.bermeo.dev</span>
          <span style={{ color: "#3a342f" }}>•</span>
          <span style={{ color: "#a3998e" }}>React 19 & Next.js RSC</span>
          <span style={{ color: "#3a342f" }}>•</span>
          <span style={{ color: "#a3998e" }}>SM-2 Scheduler</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
