import Image from "next/image";

// Logo del proyecto sobre una ficha blanca (los logos se ven bien en ambos temas).
export function ProjectLogo({ src, title, size = 56 }: { src: string; title: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-card ring-4 ring-surface"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`Logo de ${title}`}
        width={size}
        height={size}
        quality={90}
        unoptimized={src.endsWith(".svg")}
        className="size-full rounded-lg object-contain"
      />
    </span>
  );
}
