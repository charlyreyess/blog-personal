import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

// Imagen para compartir en redes con el estilo del sitio: cielo, nubes y colina.
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#86daf0",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <ellipse cx="1010" cy="110" rx="70" ry="34" fill="#fff" />
          <ellipse cx="1060" cy="92" rx="52" ry="40" fill="#fff" />
          <path d="M760 630 C 840 470, 930 360, 1040 360 C 1120 360, 1170 430, 1200 480 V 630 Z" fill="#74c23d" />
          <path d="M0 630 V 590 C 80 550, 170 555, 230 585 C 300 545, 400 550, 450 590 C 530 555, 650 560, 700 600 C 780 565, 900 570, 950 605 C 1030 570, 1130 575, 1200 600 V 630 Z" fill="#fff" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#0251fe",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#1d2a4a" }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820, marginBottom: 60 }}>
          <div style={{ fontSize: 28, color: "#0251fe", fontWeight: 700 }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 50 ? 56 : 68, fontWeight: 800, color: "#1d2a4a", lineHeight: 1.1, marginTop: 12 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
