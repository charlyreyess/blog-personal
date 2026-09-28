import Link from "next/link";

// Cabecera de sección homogénea: etiqueta, título, descripción y enlace opcional.
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  link,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="font-mono text-sm font-semibold text-accent">
          <span aria-hidden className="text-muted">{"// "}</span>
          {eyebrow.toLowerCase()}
        </p>
        <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-balance text-heading sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-pretty text-muted">{description}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="shrink-0 text-sm font-semibold whitespace-nowrap text-accent hover:underline"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}
