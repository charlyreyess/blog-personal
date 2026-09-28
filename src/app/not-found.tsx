import Link from "next/link";
import { SkyScene } from "@/components/sky-scene";

export default function NotFound() {
  return (
    <section className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden bg-sky">
      <SkyScene />
      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-64 sm:px-6 sm:pt-20">
        <p className="outline-display text-[8rem] sm:text-[15rem]">404</p>
        <p className="mt-4 inline-block rounded-md bg-[#0d1117]/90 px-4 py-2 font-mono text-sm text-[#e6edf3]">
          <span className="text-[#7ee787]">$</span> cd esta-pagina
          <br />
          <span className="text-[#ff7b72]">bash: cd: esta-pagina: No existe el archivo o el directorio</span>
        </p>
        <h1 className="mt-6 text-3xl font-bold text-sky-ink sm:text-4xl">¿Cómo llegaste hasta aquí?</h1>
        <p className="mt-10 text-lg font-semibold text-sky-ink/90 sm:text-xl">
          Lo siento, no encuentro la página que buscas.
        </p>
        <p className="mt-2 max-w-md font-medium text-sky-ink/75">
          Puede que la dirección tenga una errata o que la página ya no exista.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-medium text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
