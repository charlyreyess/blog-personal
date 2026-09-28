import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/metadata";
import { getSite, socialLinks } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contacto">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).contact;
  return { title: t.eyebrow, description: t.metaDescription, alternates: alternates(lang, "/contacto") };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contacto">) {
  const lang = (await params).lang as Locale;
  const site = getSite(lang);
  const t = getDictionary(lang).contact;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title}>
        <p className="mt-4 max-w-xl text-lg font-medium text-sky-ink/80">{t.text}</p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative -mt-12 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <ContactForm lang={lang} />

          <aside className="h-fit space-y-6 rounded-lg bg-surface p-6 shadow-card sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-heading">{t.location}</h2>
              <p className="mt-1 text-muted">
                {site.location} · {t.remote}
              </p>
            </div>
            {socialLinks.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-heading">{t.social}</h2>
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
              <p className="font-semibold">{t.tipsTitle}</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
                {t.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
