import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

// Imagen para compartir en redes con el estilo del sitio: cuadrícula de plano y nodos conectados.
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
          background: "#eaf1ff",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          {Array.from({ length: 38 }, (_, i) => (
            <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="630" stroke="#0251fe" strokeOpacity="0.08" />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 32} x2="1200" y2={i * 32} stroke="#0251fe" strokeOpacity="0.08" />
          ))}
          <circle cx="1050" cy="80" r="260" fill="#0251fe" fillOpacity="0.07" />
          <g stroke="#0251fe" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" fill="none">
            <path d="M820 520 L930 450 L1060 500 L1150 400" />
            <path d="M930 450 L960 330 L1100 290" />
          </g>
          {[[820, 520], [930, 450], [1060, 500], [1150, 400], [960, 330], [1100, 290]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="9" fill="#ffffff" stroke="#0251fe" strokeOpacity="0.6" strokeWidth="2" />
          ))}
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
          <div style={{ fontSize: 26, color: "#0251fe", fontWeight: 700, fontFamily: "monospace" }}>{`// ${eyebrow}`}</div>
          <div style={{ fontSize: title.length > 50 ? 56 : 68, fontWeight: 800, color: "#1d2a4a", lineHeight: 1.1, marginTop: 12 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
