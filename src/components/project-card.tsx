import Link from "next/link";
import { ProjectCover } from "@/components/project-cover";
import { formatMonth } from "@/lib/format";
import type { ProjectMeta } from "@/lib/projects";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-card transition-all hover:-translate-y-1 hover:border-accent/40">
      <div className="relative aspect-video overflow-hidden border-b border-line">
        <ProjectCover project={project} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium text-muted">
          {[project.role, formatMonth(project.date)].filter(Boolean).join(" · ")}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-heading transition-colors group-hover:text-accent">
          <Link href={`/proyectos/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md bg-accent-soft px-2.5 py-1 text-accent">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
