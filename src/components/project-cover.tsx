import Image from "next/image";
import type { ProjectMeta } from "@/lib/projects";

// Imagen del proyecto o, si no tiene, una portada generada en el estilo del sitio.
export function ProjectCover({ project, priority = false }: { project: ProjectMeta; priority?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Captura del proyecto ${project.title}`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center overflow-hidden bg-sky">
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full">
        <g className="fill-cloud">
          <ellipse cx="320" cy="50" rx="34" ry="16" />
          <ellipse cx="345" cy="42" rx="24" ry="18" />
          <ellipse cx="60" cy="70" rx="26" ry="12" />
        </g>
        <path d="M200 225 C 250 150, 300 110, 350 120 C 380 128, 395 160, 400 175 V 225 Z" className="fill-grass" />
        <path d="M0 225 V 205 C 40 185, 90 190, 120 205 C 160 185, 220 190, 250 210 C 300 190, 360 195, 400 212 V 225 Z" className="fill-cloud" />
      </svg>
      <span className="outline-display relative px-6 text-center text-4xl sm:text-5xl">{project.title}</span>
    </div>
  );
}
