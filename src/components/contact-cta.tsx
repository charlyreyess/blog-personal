import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Llamada a la acción final: panel oscuro con degradado de marca, el momento de más contraste de la página.
export function ContactCta({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).cta;
  return (
    <section
      aria-labelledby="contacto"
      className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1b4d] via-[#1d3aa8] to-[#5b21b6] px-6 py-16 text-center shadow-xl shadow-violet-900/20 sm:px-12 sm:py-20"
    >
      {/* Cuadrícula y brillos de color sobre el degradado */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(22rem 16rem at 10% 0%, rgba(6,182,212,.35), transparent 70%), radial-gradient(22rem 16rem at 95% 100%, rgba(217,70,239,.30), transparent 70%)",
        }}
      />
      <p className="font-mono text-sm font-semibold text-cyan-300">{lang === "es" ? "// hablemos" : "// let's talk"}</p>
      <h2 id="contacto" className="mt-3 text-3xl font-bold text-balance text-white sm:text-4xl">
        {t.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-blue-100">{t.text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={localePath(lang, "/contacto")}
          className="rounded-md bg-white px-6 py-3 font-semibold text-[#1d3aa8] shadow-lg transition-transform hover:-translate-y-0.5"
        >
          {t.contact}
        </Link>
        <Link
          href={localePath(lang, "/proyectos")}
          className="rounded-md border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
        >
          {t.projects}
        </Link>
      </div>
    </section>
  );
}
