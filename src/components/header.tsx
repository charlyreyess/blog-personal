import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const nav = [
  { href: "/blog", label: "Blog" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 shadow-card backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span aria-hidden className="grid size-9 place-items-center rounded-lg bg-accent text-sm font-semibold text-on-accent transition-transform group-hover:-rotate-6">
            {site.initials}
          </span>
          <span className="sr-only font-semibold text-heading sm:not-sr-only">{site.name}</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
        <nav aria-label="Principal">
          <ul className="flex items-center gap-0.5 text-sm font-medium sm:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-2.5 py-2 text-muted sm:px-3 transition-colors hover:bg-accent-soft hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
