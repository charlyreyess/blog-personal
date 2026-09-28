"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SkyScene } from "@/components/sky-scene";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// not-found no recibe parámetros: el idioma se deduce de la URL (/en/... = inglés).
export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
  const t = getDictionary(lang).notFound;

  return (
    <section className="relative isolate overflow-hidden bg-sky">
      <SkyScene />
      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24">
        <p aria-hidden data-text="404" className="outline-accent text-[7rem] leading-none before:content-[attr(data-text)] sm:text-[12rem]" />
        <p className="mt-4 inline-block rounded-md bg-[#0d1117]/90 px-4 py-2 font-mono text-sm text-[#e6edf3]">
          <span className="text-[#7ee787]">$</span> {t.command}
          <br />
          <span className="text-[#ff7b72]">{t.error}</span>
        </p>
        <h1 className="mt-6 text-3xl font-bold text-sky-ink sm:text-4xl">{t.title}</h1>
        <p className="mt-10 text-lg font-semibold text-sky-ink/90 sm:text-xl">{t.subtitle}</p>
        <p className="mt-2 max-w-md font-medium text-sky-ink/75">{t.text}</p>
        <Link
          href={localePath(lang, "/")}
          className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-medium text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
        >
          {t.back}
        </Link>
      </div>
    </section>
  );
}
