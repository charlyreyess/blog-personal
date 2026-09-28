// Genera emails/newsletter.html (plantilla para Resend Broadcasts) y vistas previas de los correos.
import { writeFileSync, mkdirSync } from "node:fs";
import { contactEmailHtml, newsletterEmailHtml, subscriberEmailHtml } from "../src/lib/email-template";

const destino = process.argv[2] ?? "emails";
mkdirSync(destino, { recursive: true });
const url = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

writeFileSync(
  "emails/newsletter.html",
  newsletterEmailHtml({
    saludo: "Nuevo proyecto en mi portafolio",
    intro: "Hola 👋 Acabo de publicar un proyecto nuevo que creo que te va a interesar:",
    articulo: {
      titulo: "Detector y contador de objetos en tiempo real",
      resumen: "Aplicación que detecta, sigue y cuenta personas, vehículos y otros objetos en video o desde la cámara, con YOLO11 y ByteTrack.",
      url: `${url}/proyectos/detector-objetos`,
      imagen: `${url}/proyectos/detector-objetos/opengraph-image`,
      etiqueta: "Visión por computadora",
    },
  }),
);
writeFileSync(`${destino}/contacto.html`, contactEmailHtml({ name: "Ana Pruebas", email: "ana@ejemplo.com", type: "Tienda en línea", message: "Hola Carlos, vi tu portafolio y me interesa una tienda en línea para mi negocio de artesanías.\n\n¿Podemos agendar una llamada esta semana?" }));
writeFileSync(`${destino}/suscriptor.html`, subscriberEmailHtml("lector@ejemplo.com"));
console.log("ok");
