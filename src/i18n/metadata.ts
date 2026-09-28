import { localePath, type Locale } from "@/i18n/config";

// URL canónica y versiones en otros idiomas (hreflang) de una página.
export function alternates(lang: Locale, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: {
      "es-MX": localePath("es", path),
      en: localePath("en", path),
      "x-default": localePath("es", path),
    },
  };
}
