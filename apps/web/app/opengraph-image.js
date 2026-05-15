import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f7f8fb",
          color: "#17202a",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              alignItems: "center",
              background: "#0b6bcb",
              borderRadius: 16,
              color: "#ffffff",
              display: "flex",
              fontSize: 34,
              fontWeight: 900,
              height: 78,
              justifyContent: "center",
              width: 78,
            }}
          >
            CT
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#0f8b7c", fontSize: 24, fontWeight: 900 }}>Commerce Toolbase</span>
            <span style={{ color: "#5d6b7a", fontSize: 22 }}>Source-aware e-commerce software reviews</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 940 }}>
          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: 0, lineHeight: 1 }}>
            Compare tools by workflow, fit, and tradeoffs.
          </div>
          <div style={{ color: "#5d6b7a", fontSize: 30, lineHeight: 1.3 }}>
            Reviews, rankings, comparisons, alternatives, and methodology for online sellers.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Reviews", "Best lists", "Comparisons", "Alternatives"].map((label) => (
            <div
              key={label}
              style={{
                background: "#ffffff",
                border: "1px solid #d9e1ea",
                borderRadius: 999,
                color: "#17202a",
                fontSize: 24,
                fontWeight: 800,
                padding: "12px 20px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
