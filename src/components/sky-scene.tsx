// Ilustración decorativa: cielo con nubes y colina con árboles (SVG propio, sin imágenes externas).
function Cloud({ x, y, s = 1, className = "" }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={`fill-cloud ${className}`}>
      <ellipse cx="0" cy="0" rx="46" ry="26" />
      <ellipse cx="40" cy="-14" rx="40" ry="34" />
      <ellipse cx="86" cy="-2" rx="38" ry="28" />
      <rect x="-40" y="0" width="160" height="26" rx="13" />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-2.5" y="-6" width="5" height="22" rx="2" className="fill-trunk" />
      <path d="M0 -44 L14 -18 H6 L18 2 H-18 L-6 -18 H-14 Z" className="fill-pine" />
    </g>
  );
}

export function SkyScene({ variant = "hero" }: { variant?: "hero" | "band" }) {
  if (variant === "band") {
    return (
      <svg aria-hidden viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full">
        <Cloud x={1080} y={70} s={0.6} className="animate-drift" />
        <Cloud x={1260} y={130} s={0.8} />
        <Cloud x={120} y={180} s={0.5} className="animate-drift-slow" />
        <path d="M0 220 C 260 170, 520 200, 760 190 S 1200 150, 1440 180 V 220 Z" className="fill-paper" />
      </svg>
    );
  }

  // En móvil la ilustración se limita a la franja inferior para no quedar detrás del texto.
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMaxYMax slice"
      className="absolute inset-x-0 bottom-0 h-56 w-full sm:h-72 md:inset-0 md:h-full"
    >
      <Cloud x={1210} y={70} s={0.55} className="animate-drift" />
      <Cloud x={930} y={170} s={0.8} className="animate-drift-slow" />
      <Cloud x={1300} y={200} s={0.7} />
      <Cloud x={760} y={60} s={0.45} className="animate-drift" />
      <Cloud x={150} y={430} s={0.5} className="animate-drift-slow" />

      {/* Colina */}
      <path d="M820 560 C 900 420, 1010 250, 1150 250 C 1280 250, 1360 380, 1440 470 V 560 Z" className="fill-grass" />
      <path
        d="M1000 560 C 1060 470, 1120 420, 1170 360 C 1210 312, 1190 280, 1150 262"
        className="fill-none stroke-path"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <Tree x={1100} y={300} s={0.9} />
      <Tree x={1215} y={275} s={1.05} />
      <Tree x={1260} y={340} s={0.85} />
      <Tree x={1060} y={380} s={0.8} />
      <Tree x={1330} y={400} s={0.9} />
      <Tree x={1140} y={470} s={0.75} />

      {/* Nubes bajas en primer plano */}
      <path
        d="M0 560 V 520 C 60 470, 150 470, 200 505 C 250 450, 360 450, 410 500 C 470 470, 560 480, 600 520 C 660 480, 760 480, 800 530 C 860 500, 940 505, 980 540 C 1040 500, 1140 505, 1180 545 C 1250 510, 1360 510, 1440 540 V 560 Z"
        className="fill-cloud"
      />
    </svg>
  );
}
