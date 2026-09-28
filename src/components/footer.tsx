import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSite, socialLinks } from "@/lib/site";

export function Footer({ lang, showBlog = true }: { lang: Locale; showBlog?: boolean }) {
  const t = getDictionary(lang);
  const site = getSite(lang);
  const pages = [
    { href: "/", label: t.nav.home },
    { href: "/blog", label: t.nav.blog },
    { href: "/proyectos", label: t.nav.projects },
    { href: "/sobre-mi", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ].filter((page) => showBlog || page.href !== "/blog");

  return (
    <footer className="relative mt-24 border-t border-line bg-surface">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400 via-[#0251fe] to-violet-500 opacity-60" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-sm sm:grid-cols-[1.5fr_1fr_1fr] sm:px-6">
        <div>
          <Link href={localePath(lang, "/")} className="inline-flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-[#0251fe] to-violet-600 text-sm font-semibold text-white">
              {site.initials}
            </span>
            <span className="font-semibold text-heading">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs leading-relaxed text-muted">{site.tagline}</p>
        </div>

        <nav aria-label={t.footer.label}>
          <p className="font-semibold text-heading">{t.footer.navigation}</p>
          <ul className="mt-3 space-y-2">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={localePath(lang, page.href)} className="text-muted hover:text-accent">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-heading">{t.footer.contact}</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href={localePath(lang, "/contacto")} className="text-muted hover:text-accent">
                {t.footer.contactForm}
              </Link>
            </li>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
