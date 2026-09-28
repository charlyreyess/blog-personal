// Decoración de fondo con temática de desarrollo. Todo es decorativo (aria-hidden), sin filtros ni animaciones
// costosas, y los elementos de los márgenes solo aparecen en pantallas anchas.

type Side = "left" | "right";

// Fragmento de código flotando en el margen
export function CodeFloat({
  code,
  top,
  side,
  rotate = 0,
}: {
  code: string;
  top: string;
  side: Side;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute hidden rounded-md border border-accent/10 bg-surface/70 px-2.5 py-1.5 font-mono text-[11px] whitespace-nowrap text-accent/60 shadow-sm select-none 2xl:block"
      // Se coloca justo fuera del contenido (72rem): a la izquierda crece hacia el margen izquierdo y viceversa.
      style={{
        top,
        ...(side === "left" ? { right: "calc(50% + 36rem + 1.5rem)" } : { left: "calc(50% + 36rem + 1.5rem)" }),
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {code}
    </span>
  );
}

// Símbolo grande y tenue detrás de un título de sección
export function Glyph({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -z-10 font-mono leading-none font-bold text-accent/[0.05] select-none ${className}`}
    >
      {text}
    </span>
  );
}

// Trazas de circuito (líneas con giros a 90° y nodos) para un lateral de la sección
export function CircuitTraces({ side, className = "" }: { side: Side; className?: string }) {
  const flip = side === "left" ? "scale(-1,1) translate(-220,0)" : undefined;
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 320"
      className={`pointer-events-none absolute -z-10 hidden h-80 w-56 lg:block ${side === "left" ? "-left-24" : "-right-24"} ${className}`}
    >
      <g transform={flip} fill="none" stroke="var(--accent)" strokeOpacity="0.18" strokeWidth="1.5">
        <path d="M0 40 H90 V100 H160 V60 H220" />
        <path d="M0 120 H60 V180 H140 V140 H220" />
        <path d="M0 210 H110 V260 H220" />
        <path d="M0 290 H70 V240" />
        <path d="M90 100 V20" strokeDasharray="3 5" />
      </g>
      <g transform={flip} fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1.5">
        {[
          [90, 100],
          [160, 60],
          [60, 180],
          [140, 140],
          [110, 260],
          [70, 240],
          [90, 20],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
        ))}
      </g>
    </svg>
  );
}

// Separador entre secciones: línea con nodos y una etiqueta de código en el centro
export function SectionDivider({ label }: { label: string }) {
  return (
    <div aria-hidden className="relative mt-20 flex items-center gap-3 sm:mt-24">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/25 to-accent/25" />
      <span className="size-2 rounded-full border border-accent/40 bg-surface" />
      <span className="rounded-full border border-accent/15 bg-surface px-3 py-1 font-mono text-[11px] text-accent">{label}</span>
      <span className="size-2 rounded-full border border-accent/40 bg-surface" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-accent/25 to-accent/25" />
    </div>
  );
}
