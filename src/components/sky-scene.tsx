// Fondo técnico para cabeceras: cuadrícula de plano, brillo del color de marca y nodos conectados.
// (Mantiene el nombre SkyScene para no cambiar las páginas que lo usan.)
export function SkyScene({ variant = "hero" }: { variant?: "hero" | "band" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-blueprint absolute inset-0" />
      {/* Brillo suave: solo un degradado radial (sin filtros de desenfoque, que son costosos de pintar) */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(40rem 26rem at 85% 0%, var(--glow), transparent 70%)" }}
      />
      {variant === "hero" && (
        <svg viewBox="0 0 600 400" className="absolute right-0 bottom-0 hidden h-[70%] w-auto opacity-70 lg:block">
          {/* Red de nodos: servicios conectados */}
          <g stroke="var(--accent)" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 6" fill="none">
            <path d="M120 320 L260 250 L420 300 L540 200" />
            <path d="M260 250 L300 130 L460 90" />
            <path d="M420 300 L460 90" />
          </g>
          <g fill="var(--surface)" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5">
            {[
              [120, 320],
              [260, 250],
              [420, 300],
              [540, 200],
              [300, 130],
              [460, 90],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="7" />
            ))}
          </g>
          <g fill="var(--accent)" fillOpacity="0.7">
            <circle cx="260" cy="250" r="3" />
            <circle cx="460" cy="90" r="3" />
            <circle cx="540" cy="200" r="3" />
          </g>
        </svg>
      )}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-paper/60" />
    </div>
  );
}
