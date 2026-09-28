// Sistema de color de apoyo. Cada tono tiene un papel fijo en todo el sitio:
//   blue    → marca / backend        cyan    → frontend, web y móvil
//   violet  → datos                  emerald → despliegue, automatización e IA
// Las clases están escritas completas para que Tailwind las detecte.
export type Tone = "blue" | "cyan" | "violet" | "emerald";

export const tones: Record<
  Tone,
  { text: string; soft: string; ring: string; bar: string; dot: string; hoverBorder: string; iconHover: string }
> = {
  blue: {
    text: "text-blue-700",
    soft: "bg-blue-50",
    ring: "ring-blue-200",
    bar: "from-blue-500 to-indigo-500",
    dot: "bg-blue-500",
    hoverBorder: "hover:border-blue-300",
    iconHover: "group-hover:bg-blue-600 group-hover:text-white",
  },
  cyan: {
    text: "text-cyan-700",
    soft: "bg-cyan-50",
    ring: "ring-cyan-200",
    bar: "from-cyan-500 to-sky-500",
    dot: "bg-cyan-500",
    hoverBorder: "hover:border-cyan-300",
    iconHover: "group-hover:bg-cyan-600 group-hover:text-white",
  },
  violet: {
    text: "text-violet-700",
    soft: "bg-violet-50",
    ring: "ring-violet-200",
    bar: "from-violet-500 to-fuchsia-500",
    dot: "bg-violet-500",
    hoverBorder: "hover:border-violet-300",
    iconHover: "group-hover:bg-violet-600 group-hover:text-white",
  },
  emerald: {
    text: "text-emerald-700",
    soft: "bg-emerald-50",
    ring: "ring-emerald-200",
    bar: "from-emerald-500 to-teal-500",
    dot: "bg-emerald-500",
    hoverBorder: "hover:border-emerald-300",
    iconHover: "group-hover:bg-emerald-600 group-hover:text-white",
  },
};

// Degradado de marca (azul → violeta → cian) para texto destacado y botones principales
export const brandGradientText = "bg-gradient-to-r from-[#0251fe] via-violet-600 to-cyan-600 bg-clip-text text-transparent";
export const brandGradientButton = "bg-gradient-to-r from-[#0251fe] to-violet-600";
