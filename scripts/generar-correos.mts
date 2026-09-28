// Genera emails/newsletter.html (plantilla para Resend Broadcasts) y vistas previas de los correos.
import { writeFileSync, mkdirSync } from "node:fs";
import { contactEmailHtml, newsletterEmailHtml, subscriberEmailHtml } from "../src/lib/email-template";

const destino = process.argv[2] ?? "emails";
mkdirSync(destino, { recursive: true });
const url = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

writeFileSync(
  "emails/newsletter.html",
  newsletterEmailHtml({
    saludo: "Nuevo artículo en el blog",
    intro: "Hola 👋 Acabo de publicar algo nuevo que creo que te va a interesar:",
    articulo: {
      titulo: "Cómo construí un detector y contador de objetos con YOLO11",
      resumen: "Detección, seguimiento y conteo de personas y vehículos en tiempo real con Python, YOLO11, ByteTrack y una interfaz en Tkinter.",
      url: `${url}/blog/detector-objetos-yolo11`,
      imagen: `${url}/blog/detector-objetos-yolo11/opengraph-image`,
      etiqueta: "Visión por computadora",
    },
  }),
);
writeFileSync(`${destino}/contacto.html`, contactEmailHtml({ name: "Ana Pruebas", email: "ana@ejemplo.com", type: "Tienda en línea", message: "Hola Carlos, vi tu portafolio y me interesa una tienda en línea para mi negocio de artesanías.\n\n¿Podemos agendar una llamada esta semana?" }));
writeFileSync(`${destino}/suscriptor.html`, subscriberEmailHtml("lector@ejemplo.com"));
console.log("ok");
