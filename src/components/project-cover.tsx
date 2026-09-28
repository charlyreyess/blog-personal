import Image from "next/image";
import type { ProjectMeta } from "@/lib/projects";

// Imagen del proyecto o, si no tiene, una portada generada en el estilo del sitio.
export function ProjectCover({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  project: ProjectMeta;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.image) {
    const contain = project.imageFit === "contain";
    return (
      <div
        className="absolute inset-0"
        style={
          contain ? { background: project.imageBg ?? "#ffffff" } : undefined
        }
      >
        <Image
          src={project.image}
          alt={`Captura del proyecto ${project.title}`}
          fill
          priority={priority}
          sizes={sizes}
          quality={90}
          className={contain ? "object-contain" : "object-cover object-top"}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 grid place-items-center overflow-hidden bg-sky"
    >
      <svg
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 size-full"
      >
        <g className="fill-cloud">
          <ellipse cx="320" cy="50" rx="34" ry="16" />
          <ellipse cx="345" cy="42" rx="24" ry="18" />
          <ellipse cx="60" cy="70" rx="26" ry="12" />
        </g>
        <path
          d="M200 225 C 250 150, 300 110, 350 120 C 380 128, 395 160, 400 175 V 225 Z"
          className="fill-grass"
        />
        <path
          d="M0 225 V 205 C 40 185, 90 190, 120 205 C 160 185, 220 190, 250 210 C 300 190, 360 195, 400 212 V 225 Z"
          className="fill-cloud"
        />
      </svg>
      {/* Solo el nombre corto (lo que va antes de " — ") para que la portada respire */}
      <span className="outline-display relative px-6 text-center text-4xl sm:text-5xl">
        {project.title.split(" — ")[0]}
      </span>
    </div>
  );
}
