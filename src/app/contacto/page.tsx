import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { site, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Cuéntale a ${site.name} sobre tu proyecto web.`,
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contacto" title="Hablemos de tu proyecto">
        <p className="mt-4 max-w-xl text-lg font-medium text-sky-ink/80">
          Cuéntame qué necesitas y te respondo con los siguientes pasos.
        </p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative -mt-12 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <ContactForm email={site.email} />

          <aside className="h-fit space-y-6 rounded-lg bg-surface p-6 shadow-card sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-heading">Email directo</h2>
              <a href={`mailto:${site.email}`} className="mt-1 block break-all text-accent hover:underline">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-heading">Ubicación</h2>
              <p className="mt-1 text-muted">{site.location} · Trabajo en remoto</p>
            </div>
            {socialLinks.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-heading">Redes</h2>
                <ul className="mt-1 space-y-1">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-md bg-accent-soft p-4 text-sm text-heading">
              <p className="font-semibold">¿Qué incluir en tu mensaje?</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
                <li>Objetivo del proyecto</li>
                <li>Fecha deseada de entrega</li>
                <li>Enlaces o referencias que te gusten</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
