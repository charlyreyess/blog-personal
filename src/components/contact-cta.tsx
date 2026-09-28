import Link from "next/link";
import { SkyScene } from "@/components/sky-scene";

export function ContactCta() {
  return (
    <section
      aria-labelledby="contacto"
      className="relative isolate overflow-hidden rounded-lg border border-accent/15 bg-sky px-6 py-14 text-center sm:px-12 sm:py-16"
    >
      <SkyScene variant="band" />
      <div className="relative">
        <h2 id="contacto" className="text-3xl font-bold text-balance text-sky-ink sm:text-4xl">
          ¿Tienes un proyecto en mente?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-medium text-pretty text-sky-ink/80">
          Desarrollo aplicaciones web, móviles y de escritorio a la medida, desde el análisis de requisitos hasta la
          puesta en producción. Cuéntame tu idea y te propongo la solución técnica, el alcance y los tiempos de entrega.
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
