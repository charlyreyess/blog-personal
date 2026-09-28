import type { Locale } from "@/i18n/config";

// Opciones del formulario de contacto (compartidas entre el formulario y la API).
// El valor que se envía es siempre el español (así llega en tu correo); la etiqueta cambia según el idioma.
export const projectTypes = ["Sitio web", "Tienda en línea", "Aplicación web", "Rediseño", "Otro"] as const;

export const projectTypeLabels: Record<Locale, Record<(typeof projectTypes)[number], string>> = {
  es: { "Sitio web": "Sitio web", "Tienda en línea": "Tienda en línea", "Aplicación web": "Aplicación web", Rediseño: "Rediseño", Otro: "Otro" },
  en: { "Sitio web": "Website", "Tienda en línea": "Online store", "Aplicación web": "Web application", Rediseño: "Redesign", Otro: "Other" },
};

// Mensajes de la API de contacto y newsletter
export const apiMessages = {
  es: {
    thanks: "Gracias por escribir. Te responderé en 1 a 2 días hábiles.",
    name: "Escribe tu nombre.",
    email: "Introduce un email válido.",
    length: "El mensaje debe tener entre 10 y 3000 caracteres.",
    unavailable: "No se pudo enviar el mensaje en este momento. Inténtalo de nuevo más tarde.",
    failed: "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.",
    subscribed: "¡Listo! Te avisaré cuando publique algo nuevo.",
    subscribeFailed: "No se pudo completar la suscripción. Inténtalo más tarde.",
  },
  en: {
    thanks: "Thanks for reaching out. I'll get back to you within 1–2 business days.",
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    length: "Your message must be between 10 and 3000 characters.",
    unavailable: "Your message couldn't be sent right now. Please try again later.",
    failed: "Your message couldn't be sent. Please try again in a few minutes.",
    subscribed: "Done! I'll let you know when I publish something new.",
    subscribeFailed: "The subscription couldn't be completed. Please try again later.",
  },
};

export const messagesFor = (lang: unknown) => apiMessages[lang === "en" ? "en" : "es"];
