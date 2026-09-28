import { dateLocale, type Locale } from "@/i18n/config";

// Formato de fechas según el idioma (sin dependencias de servidor: se puede usar en el navegador).
export function formatDate(date: string, lang: Locale = "es") {
  return new Intl.DateTimeFormat(dateLocale[lang], { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${date}T00:00:00`),
  );
}

export function formatMonth(date: string, lang: Locale = "es") {
  return new Intl.DateTimeFormat(dateLocale[lang], { month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}
