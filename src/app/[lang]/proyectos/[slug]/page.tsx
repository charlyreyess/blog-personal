import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/project-cover";
import { ProjectLogo } from "@/components/project-logo";
import { SkyScene } from "@/components/sky-scene";
import { formatMonth } from "@/lib/format";
import { getAllProjects, getProject } from "@/lib/projects";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/metadata";
import { getSite } from "@/lib/site";

export const dynamicParams = false;

// Se llama una vez por idioma (el layout genera "es" y "en").
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return getAllProjects(params.lang as Locale).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/proyectos/[slug]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const project = await getProject(slug, lang);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: alternates(lang, `/proyectos/${project.slug}`),
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/proyectos/[slug]">) {
  const { lang: l, slug } = await params;
  const lang = l as Locale;
  const site = getSite(lang);
  const t = getDictionary(lang).projects;
  const project = await getProject(slug, lang);
  if (!project) notFound();

  const details = [
    { label: t.date, value: formatMonth(project.date, lang) },
    { label: t.role, value: project.role },
    { label: t.client, value: project.client },
  ].filter((item) => item.value);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: project.date,
    creator: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}${localePath(lang, `/proyectos/${project.slug}`)}`,
    inLanguage: lang,
    keywords: project.stack.join(", "),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="relative isolate overflow-hidden bg-sky">
        <SkyScene variant="band" />
        <div className="relative mx-auto max-w-4xl px-4 pt-10 pb-40 sm:px-6 sm:pt-14">
          <Link href={localePath(lang, "/proyectos")} className="text-sm font-medium text-sky-ink/80 hover:text-sky-ink">
            {t.back}
          </Link>
          <div className="mt-6 flex items-center gap-4 sm:gap-5">
            {project.logo && <ProjectLogo src={project.logo} alt={`${t.logo} ${project.title}`} size={72} />}
            <h1 className="text-3xl leading-tight font-bold text-balance text-sky-ink sm:text-5xl">{project.title}</h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg font-medium text-pretty text-sky-ink/80">{project.description}</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative -mt-32 aspect-video overflow-hidden rounded-lg border border-line bg-surface shadow-card">
          <ProjectCover project={project} alt={`${t.screenshot} ${project.title}`} priority sizes="(min-width: 896px) 896px, 100vw" />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_16rem]">
          <div className="rounded-lg bg-surface p-6 shadow-card sm:p-10">
            <div className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />
          </div>

          <aside className="h-fit space-y-6 rounded-lg bg-surface p-6 shadow-card md:sticky md:top-24">
            <dl className="space-y-4 text-sm">
              {details.map((item) => (
                <div key={item.label}>
                  <dt className="font-semibold text-heading">{item.label}</dt>
                  <dd className="mt-0.5 text-muted first-letter:uppercase">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="text-sm font-semibold text-heading">{t.technologies}</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-md bg-accent-soft px-2.5 py-1 text-accent">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            {(project.url || project.repo) && (
              <div className="flex flex-col gap-2 border-t border-line pt-5">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-accent px-4 py-2.5 text-center text-sm font-medium text-on-accent hover:opacity-90"
                  >
                    {t.visit}
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-line px-4 py-2.5 text-center text-sm font-medium text-heading hover:border-accent hover:text-accent"
                  >
                    {t.code}
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
