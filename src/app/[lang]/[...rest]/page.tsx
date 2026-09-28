import { notFound } from "next/navigation";

// Cualquier ruta que no exista dentro de un idioma muestra la página 404 de ese idioma.
export default function CatchAll() {
  notFound();
}
