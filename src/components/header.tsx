"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localePath, stripLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSite } from "@/lib/site";

// Selector ES / EN: enlaza a la misma página en el otro idioma.
function LanguageSwitch({ lang, path, label, title }: { lang: Locale; path: string; label: string; title: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-md border border-line p-0.5 font-mono text-xs font-semibold">
      {(["es", "en"] as const).map((l) =>
        l === lang ? (
          <span key={l} aria-current="true" className="rounded bg-gradient-to-r from-[#0251fe] to-violet-600 px-2 py-1 text-white uppercase">
            {l}
          </span>
        ) : (
          <Link
            key={l}
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            title={title}
            className="rounded px-2 py-1 text-muted uppercase transition-colors hover:bg-accent-soft hover:text-accent"
          >
            {l}
          </Link>
        ),
      )}
    </div>
  );
}

export function Header({ lang, showBlog = true }: { lang: Locale; showBlog?: boolean }) {
  const t = getDictionary(lang).nav;
  const site = getSite(lang);
  const pathname = usePathname();
  const path = stripLocale(pathname); // ruta sin prefijo de idioma, p. ej. "/proyectos"
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/proyectos", label: t.projects },
    { href: "/blog", label: t.blog },
    { href: "/sobre-mi", label: t.about },
  ].filter((item) => showBlog || item.href !== "/blog");
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

  // Cierra el menú móvil con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 shadow-card backdrop-blur-md">
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-cyan-400 via-[#0251fe] to-violet-500 opacity-60" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={localePath(lang, "/")} className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-[#0251fe] to-violet-600 text-sm font-semibold text-white shadow-md shadow-violet-500/20 transition-transform group-hover:-rotate-6"
          >
            {site.initials}
          </span>
          <span className="leading-tight">
            <span className="block font-semibold text-heading">{site.name}</span>
            <span className="block font-mono text-xs text-muted">{site.roleShort}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label={t.main} className="hidden md:block">
            <ul className="flex items-center gap-1 text-sm font-medium">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(lang, item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-md px-3 py-2 transition-colors hover:bg-accent-soft hover:text-accent ${
                      isActive(item.href) ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitch lang={lang} path={path} label={t.language} title={t.switchTo} />
          <Link
            href={localePath(lang, "/contacto")}
            className="hidden rounded-md bg-gradient-to-r from-[#0251fe] to-violet-600 text-white px-4 py-2 text-sm font-semibold shadow-md shadow-violet-500/20 transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            {t.contactCta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? t.closeMenu : t.openMenu}
            className="grid size-9 place-items-center rounded-md text-heading hover:bg-accent-soft md:hidden"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label={t.mobile} className="border-t border-line bg-surface md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-base font-medium">
            {[...nav, { href: "/contacto", label: t.contact }].map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(lang, item.href)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-md px-3 py-3 hover:bg-accent-soft ${
                    isActive(item.href) ? "bg-accent-soft text-accent" : "text-heading"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
