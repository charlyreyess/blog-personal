import { SkyScene } from "@/components/sky-scene";

// Franja de cielo para la cabecera de las páginas interiores.
export function PageHero({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-sky">
      <SkyScene variant="band" />
      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-24 sm:px-6 sm:pt-20 sm:pb-28">
        {eyebrow && <p className="text-sm font-semibold text-sky-ink/80">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-4xl font-bold text-balance text-sky-ink sm:text-5xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}
