import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { assertLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/metadata";
import { getAllProjects } from "@/lib/projects";

export async function generateMetadata({ params }: PageProps<"/[lang]/proyectos">): Promise<Metadata> {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).projects;
  return { title: t.heroTitle, description: t.metaDescription, alternates: alternates(lang, "/proyectos") };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/proyectos">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).projects;
  const projects = getAllProjects(lang);

  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle}>
        <p className="mt-4 max-w-xl text-lg font-medium text-sky-ink/80">{t.heroText}</p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <h2 className="sr-only">{t.listTitle}</h2>
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} lang={lang} wide={projects.length === 1} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-surface p-8 text-muted shadow-card">{t.empty}</p>
        )}
      </div>
    </>
  );
}
