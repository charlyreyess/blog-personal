import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos en los que he trabajado: qué construí, cómo y con qué tecnologías.",
  alternates: { canonical: "/proyectos" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <PageHero eyebrow="Portafolio" title="Proyectos">
        <p className="mt-4 max-w-xl text-lg font-medium text-sky-ink/80">
          Trabajos en los que he participado: el reto, la solución y el resultado.
        </p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <h2 className="sr-only">Lista de proyectos</h2>
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-surface p-8 text-muted shadow-card">Pronto publicaré mis proyectos aquí.</p>
        )}
      </div>
    </>
  );
}
