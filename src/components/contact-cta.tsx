import Link from "next/link";
import { SkyScene } from "@/components/sky-scene";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ContactCta({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).cta;
  return (
    <section
      aria-labelledby="contacto"
      className="relative isolate overflow-hidden rounded-lg border border-accent/15 bg-sky px-6 py-14 text-center sm:px-12 sm:py-16"
    >
      <SkyScene variant="band" />
      <div className="relative">
        <h2 id="contacto" className="text-3xl font-bold text-balance text-sky-ink sm:text-4xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-medium text-pretty text-sky-ink/80">
          {t.text}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href={localePath(lang, "/contacto")}
            className="rounded-md bg-accent px-6 py-3 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
          >
            {t.contact}
          </Link>
          <Link
            href={localePath(lang, "/proyectos")}
            className="rounded-md bg-surface px-6 py-3 font-semibold text-heading transition-transform hover:-translate-y-0.5"
          >
            {t.projects}
          </Link>
        </div>
      </div>
    </section>
  );
}
