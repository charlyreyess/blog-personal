// Correos y contactos con Resend (https://resend.com) mediante su API REST, sin dependencias.
// Variables de entorno (solo en el servidor, nunca con prefijo NEXT_PUBLIC_):
//   RESEND_API_KEY    clave de la API de Resend ("Full access" para poder guardar suscriptores)
//   RESEND_SEGMENT_ID opcional: segmento de Resend al que se añaden los suscriptores
//   CONTACT_TO_EMAIL  correo donde recibes los mensajes (no se muestra en la web)
//   CONTACT_FROM      remitente opcional; por defecto el de pruebas de Resend

import { contactEmailHtml, subscriberEmailHtml } from "@/lib/email-template";

export const isMailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

async function resend(path: string, body: unknown) {
  return fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export const isResendConfigured = () => Boolean(process.env.RESEND_API_KEY);

// Guarda al suscriptor como contacto de Resend. Un email ya existente cuenta como éxito.
export async function addSubscriber(email: string) {
  const segment = process.env.RESEND_SEGMENT_ID;
  const res = await resend("/contacts", { email, unsubscribed: false, ...(segment ? { segments: [segment] } : {}) });
  if (res.ok || res.status === 409) return;
  const detalle = (await res.text()).slice(0, 300);
  if (/already exists/i.test(detalle)) return;
  throw new Error(`Resend (contactos) respondió ${res.status}: ${detalle}`);
}

// Aviso al dueño del sitio cuando alguien se suscribe (no bloquea la suscripción si falla).
export async function notifyNewSubscriber(email: string) {
  if (!isMailConfigured()) return;
  const res = await resend("/emails", {
    from: process.env.CONTACT_FROM || "Portafolio <onboarding@resend.dev>",
    to: [process.env.CONTACT_TO_EMAIL],
    subject: "Nuevo suscriptor en tu newsletter",
    html: subscriberEmailHtml(email),
    text: `${email} se acaba de suscribir a tu newsletter.`,
  });
  if (!res.ok) console.error("No se pudo enviar el aviso de suscripción:", res.status, (await res.text()).slice(0, 200));
}

export async function sendContactEmail(data: { name: string; email: string; type: string; message: string }) {
  const res = await resend("/emails", {
    from: process.env.CONTACT_FROM || "Portafolio <onboarding@resend.dev>",
    to: [process.env.CONTACT_TO_EMAIL],
    reply_to: data.email,
    subject: `Nuevo mensaje de ${data.name} · ${data.type}`,
    html: contactEmailHtml(data),
    text: `Nombre: ${data.name}
Email: ${data.email}
Tipo: ${data.type}

${data.message}`,
  });
  if (!res.ok) {
    throw new Error(`Resend respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}
