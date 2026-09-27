// Formato de fechas para México (sin dependencias de servidor: se puede usar en el navegador).
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${date}T00:00:00`),
  );
}

export function formatMonth(date: string) {
  return new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}
