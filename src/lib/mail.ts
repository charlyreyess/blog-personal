// Envío de correos con Resend (https://resend.com) mediante su API REST, sin dependencias.
// Variables de entorno (solo en el servidor, nunca con prefijo NEXT_PUBLIC_):
//   RESEND_API_KEY    clave de la API de Resend
//   CONTACT_TO_EMAIL  correo donde recibes los mensajes (no se muestra en la web)
//   CONTACT_FROM      remitente opcional; por defecto el de pruebas de Resend

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const isMailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);

export async function sendContactEmail(data: { name: string; email: string; type: string; message: string }) {
  const html = `
    <h2 style="margin:0 0 12px">Nuevo mensaje desde tu portafolio</h2>
    <p><strong>Nombre:</strong> ${escape(data.name)}<br>
    <strong>Email:</strong> ${escape(data.email)}<br>
    <strong>Tipo de proyecto:</strong> ${escape(data.type)}</p>
    <p style="white-space:pre-wrap;border-left:3px solid #0251fe;padding-left:12px">${escape(data.message)}</p>
    <p style="color:#6b7280;font-size:12px">Responde a este correo para contestar directamente a ${escape(data.name)}.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portafolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `Nuevo mensaje de ${data.name} · ${data.type}`,
      html,
      text: `Nombre: ${data.name}\nEmail: ${data.email}\nTipo: ${data.type}\n\n${data.message}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend respondió ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}
