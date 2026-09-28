import type { Locale } from "@/i18n/config";
import { getSite } from "@/lib/site";

// Ventana de terminal decorativa para la portada.
const stack = (lang: Locale) => ({
  frontend: ["Next.js", "React", "Flutter"],
  backend: ["Node.js", "Java", "Python"],
  [lang === "es" ? "datos" : "data"]: ["PostgreSQL", "MySQL"],
});

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p>
      <span className="text-[#7ee787]">carlos@portafolio</span>
      <span className="text-[#8b949e]">:</span>
      <span className="text-[#79c0ff]">~</span>
      <span className="text-[#8b949e]">$ </span>
      <span className="text-[#e6edf3]">{children}</span>
    </p>
  );
}

export function TerminalCard({ lang }: { lang: Locale }) {
  const site = getSite(lang);
  const entries = Object.entries(stack(lang));
  return (
    <figure
      aria-label={`Terminal: ${site.name}, ${site.roleShort}`}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]/95 font-mono text-[13px] leading-relaxed shadow-2xl shadow-[#0d1117]/40 backdrop-blur"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-2.5">
        <span aria-hidden className="size-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-[#8b949e]">~/carlos-reyes — bash</span>
      </div>
      <div className="space-y-1 p-5 text-[#e6edf3]">
        <Prompt>whoami</Prompt>
        <p className="text-[#e6edf3]">
          {site.name} <span className="text-[#8b949e]">—</span> <span className="text-[#ffa657]">{site.roleShort}</span>
        </p>
        <Prompt>cat stack.json</Prompt>
        <div>
          <span className="text-[#8b949e]">{"{"}</span>
          {entries.map(([key, values], i) => (
            <p key={key} className="pl-4">
              <span className="text-[#79c0ff]">&quot;{key}&quot;</span>
              <span className="text-[#8b949e]">: [</span>
              {values.map((value, j) => (
                <span key={value}>
                  <span className="text-[#a5d6ff]">&quot;{value}&quot;</span>
                  {j < values.length - 1 && <span className="text-[#8b949e]">, </span>}
                </span>
              ))}
              <span className="text-[#8b949e]">]{i < entries.length - 1 ? "," : ""}</span>
            </p>
          ))}
          <span className="text-[#8b949e]">{"}"}</span>
        </div>
        <p>
          <span className="text-[#7ee787]">carlos@portafolio</span>
          <span className="text-[#8b949e]">:</span>
          <span className="text-[#79c0ff]">~</span>
          <span className="text-[#8b949e]">$ </span>
          <span aria-hidden className="animate-blink inline-block h-4 w-2 translate-y-0.5 bg-[#e6edf3]" />
        </p>
      </div>
    </figure>
  );
}
