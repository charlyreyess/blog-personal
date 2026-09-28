import { notFound } from "next/navigation";

// Idiomas del sitio. El español es el idioma por defecto y vive en la raíz (/proyectos);
// el inglés lleva prefijo (/en/proyectos). El proxy (src/proxy.ts) reescribe las rutas sin prefijo a /es.
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

// Ruta pública de una página en un idioma: localePath("en", "/proyectos") → "/en/proyectos"
export function localePath(lang: Locale, path = "/") {
  const limpio = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return limpio;
  return limpio === "/" ? `/${lang}` : `/${lang}${limpio}`;
}

// Quita el prefijo de idioma de una ruta pública: "/en/proyectos" → "/proyectos"
export function stripLocale(pathname: string) {
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export const htmlLang: Record<Locale, string> = { es: "es-MX", en: "en" };
export const ogLocale: Record<Locale, string> = { es: "es_MX", en: "en_US" };
export const dateLocale: Record<Locale, string> = { es: "es-MX", en: "en-US" };

// Valida el idioma de la URL en páginas y rutas: si no es un idioma (p. ej. "rss.xml"), muestra la 404.
export function assertLocale(value: string | undefined): Locale {
  if (!value || !hasLocale(value)) notFound();
  return value;
}
