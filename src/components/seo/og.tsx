import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

type Props = { eyebrow: string; title: string; subtitle: string; footer: string };

/** Shared Open Graph card used by the home page and case studies in both locales. */
export function renderOgImage({ eyebrow, title, subtitle, footer }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#F5F4F0",
          color: "#17191C",
          backgroundImage:
            "linear-gradient(to right, rgba(23,25,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,25,28,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", fontWeight: 700, fontSize: 40, letterSpacing: -1 }}>
            DS<span style={{ color: "#4169E1" }}>.</span>
          </div>
          <div style={{ display: "flex", color: "#62666D" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 80, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 32, color: "#62666D" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#62666D" }}>
          <div style={{ display: "flex", width: 48, height: 4, background: "#4169E1", marginRight: 20 }} />
          {footer}
        </div>
      </div>
    ),
    ogSize,
  );
}
