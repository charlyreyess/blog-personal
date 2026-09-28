import Link from "next/link";
import { SkyScene } from "@/components/sky-scene";

export function ContactCta() {
  return (
    <section
      aria-labelledby="contacto"
      className="relative isolate overflow-hidden rounded-lg bg-sky px-6 pt-12 pb-24 text-center sm:px-12 sm:pb-28"
    >
      <SkyScene variant="band" />
      <div className="relative">
        <h2 id="contacto" className="text-3xl font-bold text-balance text-sky-ink sm:text-4xl">
          ¿Tienes un proyecto en mente?
        </h2>
        <p className="mx-auto mt-3 max-w-lg font-medium text-pretty text-sky-ink/80">
          Estoy abierto a colaboraciones, proyectos freelance y nuevas oportunidades. Escríbeme y lo platicamos.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/contacto"
            className="rounded-md bg-accent px-6 py-3 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
          >
            Contactar
          </Link>
          <Link
            href="/proyectos"
            className="rounded-md bg-surface px-6 py-3 font-semibold text-heading transition-transform hover:-translate-y-0.5"
          >
            Ver proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
