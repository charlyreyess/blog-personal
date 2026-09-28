import Image from "next/image";

// Logo del proyecto sobre una ficha blanca.
export function ProjectLogo({ src, alt, size = 56 }: { src: string; alt: string; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-1 shadow-card ring-4 ring-surface"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        quality={90}
        unoptimized={src.endsWith(".svg")}
        className="size-full rounded-lg object-contain"
      />
    </span>
  );
}
