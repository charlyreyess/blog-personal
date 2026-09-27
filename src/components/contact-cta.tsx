"use client";

import { useState } from "react";
import { SkyScene } from "@/components/sky-scene";

export function ContactCta({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

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
          <a
            href={`mailto:${email}`}
            className="rounded-md bg-accent px-6 py-3 font-medium text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
          >
            Escríbeme
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-md bg-surface px-6 py-3 font-medium text-heading transition-transform hover:-translate-y-0.5"
          >
            <span aria-live="polite">{copied ? "¡Email copiado!" : "Copiar email"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
