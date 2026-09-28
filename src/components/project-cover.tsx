import Image from "next/image";
import type { ProjectMeta } from "@/lib/projects";

// Imagen del proyecto o, si no tiene, una portada generada con estilo de ventana de código.
export function ProjectCover({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
  alt,
}: {
  project: ProjectMeta;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.image) {
    const contain = project.imageFit === "contain";
    return (
      <div className="absolute inset-0" style={contain ? { background: project.imageBg ?? "#ffffff" } : undefined}>
        <Image
          src={project.image}
          alt={alt ?? project.title}
          fill
          priority={priority}
          sizes={sizes}
          quality={90}
          className={contain ? "object-contain" : "object-cover object-top"}
        />
      </div>
    );
  }

  const nombre = project.title.split(" — ")[0];
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col overflow-hidden bg-[#0d1117] font-mono">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#161b22] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11px] text-[#8b949e]">~/proyectos/{project.slug}</span>
      </div>
      <div
        className="relative flex flex-1 flex-col justify-center gap-3 px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <p className="text-xs text-[#7ee787]">$ run {project.slug}</p>
        <p className="font-sans text-2xl leading-tight font-bold text-[#e6edf3] sm:text-3xl">{nombre}</p>
        <p className="text-xs text-[#8b949e]">
          <span className="text-[#79c0ff]">stack</span>: [{project.stack.slice(0, 3).map((t) => `"${t}"`).join(", ")}]
        </p>
      </div>
    </div>
  );
}
