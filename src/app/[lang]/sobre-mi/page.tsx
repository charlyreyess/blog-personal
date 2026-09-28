import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { getBio } from "@/lib/bio";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/metadata";
import { getSite, socialLinks } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/sobre-mi">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).about;
  return { title: t.title, description: t.metaDescription, alternates: alternates(lang, "/sobre-mi") };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/sobre-mi">) {
  const lang = (await params).lang as Locale;
  const site = getSite(lang);
  const t = getDictionary(lang).about;
  const bio = await getBio(lang);

  return (
    <>
      <PageHero eyebrow={`${site.role} · ${site.location}`} title={t.title} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative -mt-12 grid gap-6 md:grid-cols-[1fr_18rem]">
          <div className="rounded-lg bg-surface p-6 shadow-card sm:p-10">
            <h2 className="text-xl font-semibold text-heading">{t.bio}</h2>
            <div className="prose mt-4" dangerouslySetInnerHTML={{ __html: bio.html }} />

            {bio.timeline.length > 0 && (
              <>
                <h2 className="mt-12 text-xl font-semibold text-heading">{t.timeline}</h2>
                <ol className="mt-6 border-l-2 border-accent-soft">
                  {bio.timeline.map((item) => (
                    <li key={`${item.period}-${item.title}`} className="relative pb-8 pl-6 last:pb-0">
                      <span
                        aria-hidden
                        className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-surface bg-accent"
                      />
                      <p className="text-xs font-semibold text-accent">{item.period}</p>
                      <p className="mt-1 font-semibold text-heading">
                        {item.title}
                        {item.place && <span className="font-normal text-muted"> · {item.place}</span>}
                      </p>
                      {item.description && <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>}
                    </li>
                  ))}
                </ol>
              </>
            )}

            <h2 className="mt-12 text-xl font-semibold text-heading">{t.skills}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {site.skills.map((skill) => (
                <li key={skill} className="rounded-md bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-lg bg-surface p-6 shadow-card md:sticky md:top-24">
            <div
              aria-hidden
              className="grid aspect-square w-28 place-items-center rounded-lg bg-sky text-4xl font-bold text-sky-ink md:w-full md:text-7xl"
            >
              {site.initials}
            </div>
            <p className="mt-5 text-lg font-semibold text-heading">{site.name}</p>
            <p className="text-sm text-muted">
              {site.role} · {site.location}
            </p>
            <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
              <li>
                <Link href={localePath(lang, "/contacto")} className="text-accent hover:underline">
                  {t.write}
                </Link>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
