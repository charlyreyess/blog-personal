import Link from "next/link";
import { site, socialLinks } from "@/lib/site";

const pages = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-sm sm:grid-cols-[1.5fr_1fr_1fr] sm:px-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-accent text-sm font-semibold text-on-accent">
              {site.initials}
            </span>
            <span className="font-semibold text-heading">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs leading-relaxed text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Pie de página">
          <p className="font-semibold text-heading">Navegación</p>
          <ul className="mt-3 space-y-2">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-muted hover:text-accent">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-heading">Contacto</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={`mailto:${site.email}`} className="break-all text-muted hover:text-accent">
                {site.email}
              </a>
            </li>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                  {link.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href="/rss.xml" className="text-muted hover:text-accent">
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {site.name} · {site.location}. Hecho con Next.js y desplegado en Vercel.
        </p>
      </div>
    </footer>
  );
}
