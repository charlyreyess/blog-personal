import { site } from "@/lib/site";

// Plantilla de correo con el estilo del sitio: cabecera de cielo, tarjeta blanca, azul #0251fe y Poppins.
// HTML de tablas con estilos en línea para que se vea bien en Gmail, Outlook y Apple Mail.

const C = {
  paper: "#f7f8fa",
  surface: "#ffffff",
  ink: "#282a3c",
  heading: "#48465b",
  muted: "#595d6e",
  line: "#ebedf2",
  accent: "#0251fe",
  accentSoft: "#e6eeff",
};
const SANS = "Poppins, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function button(label: string, href: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 4px">
    <tr><td style="border-radius:8px;background:${C.accent}">
      <a href="${href}" style="display:inline-block;padding:14px 26px;font-family:${SANS};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px">${label}</a>
    </td></tr></table>`;
}

// Tabla de datos (etiqueta · valor) con separadores finos
export function fields(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;border-collapse:collapse">
    ${rows
      .map(
        ([label, value]) => `<tr>
      <td style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:13px;color:${C.muted};width:130px;vertical-align:top">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:14px;font-weight:600;color:${C.ink}">${value}</td>
    </tr>`,
      )
      .join("")}
  </table>`;
}

// Bloque de cita para el mensaje del visitante
export function quote(text: string) {
  return `<div style="margin:0;padding:16px 18px;background:${C.paper};border-left:4px solid ${C.accent};border-radius:6px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};white-space:pre-wrap">${escapeHtml(text)}</div>`;
}

export function paragraph(html: string) {
  return `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.muted}">${html}</p>`;
}

export function layout(opts: {
  preheader: string; // texto de vista previa en la bandeja de entrada
  eyebrow: string; // se muestra como comentario de código: // eyebrow
  title: string;
  content: string;
  footerNote?: string;
}) {
  const url = site.url.replace(/\/$/, "");
  const dominio = url.replace(/^https?:\/\//, "");
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.paper};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(opts.preheader)}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
<tr><td align="center" style="padding:28px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">

    <tr><td style="padding:0 4px 18px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="width:36px;height:36px;background:${C.accent};border-radius:9px;text-align:center;vertical-align:middle;font-family:${SANS};font-size:14px;font-weight:700;color:#ffffff">${site.initials}</td>
        <td style="padding-left:12px;font-family:${SANS}">
          <div style="font-size:15px;font-weight:600;color:${C.heading};line-height:1.2">${site.name}</div>
          <div style="font-family:${MONO};font-size:11px;color:${C.muted};line-height:1.4">${site.roleShort}</div>
        </td>
      </tr></table>
    </td></tr>

    <tr><td style="background:${C.surface};border-radius:12px;overflow:hidden;border:1px solid ${C.line}">
      <img src="${url}/email/cabecera-tech.png" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:12px 12px 0 0">
      <div style="padding:28px 32px 32px">
        <p style="margin:0 0 8px;font-family:${MONO};font-size:13px;font-weight:600;color:${C.accent}"><span style="color:${C.muted}">//</span> ${escapeHtml(opts.eyebrow)}</p>
        <h1 style="margin:0 0 16px;font-family:${SANS};font-size:24px;line-height:1.3;font-weight:700;color:${C.ink}">${escapeHtml(opts.title)}</h1>
        ${opts.content}
      </div>
    </td></tr>

    <tr><td style="padding:22px 8px 0;text-align:center;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted}">
      ${opts.footerNote ? `${opts.footerNote}<br>` : ""}
      © ${year} ${site.name} · <a href="${url}" style="color:${C.accent};text-decoration:none">${dominio}</a>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

// ---------- Correos concretos ----------

export function contactEmailHtml(d: { name: string; email: string; type: string; message: string; replyUrl?: string }) {
  const nombre = escapeHtml(d.name);
  return layout({
    preheader: `${d.name} te escribió sobre: ${d.type}`,
    eyebrow: "nuevo mensaje",
    title: `${d.name} quiere hablar contigo`,
    content:
      paragraph("Alguien te escribió desde el formulario de contacto de tu portafolio.") +
      fields([
        ["Nombre", nombre],
        ["Email", `<a href="mailto:${escapeHtml(d.email)}" style="color:${C.accent};text-decoration:none">${escapeHtml(d.email)}</a>`],
        ["Proyecto", `<span style="display:inline-block;padding:3px 10px;background:${C.accentSoft};color:${C.accent};border-radius:6px;font-size:13px">${escapeHtml(d.type)}</span>`],
      ]) +
      quote(d.message) +
      (d.replyUrl
        ? button(`Responder a ${nombre} con diseño`, d.replyUrl) +
          `<p style="margin:10px 0 0;font-family:${SANS};font-size:12px;color:${C.muted}">El enlace es privado y caduca en 30 días. No lo reenvíes.</p>`
        : button(`Responder a ${nombre}`, `mailto:${escapeHtml(d.email)}?subject=${encodeURIComponent("Re: tu mensaje en mi portafolio")}`)),
    footerNote: "También puedes pulsar «Responder» en tu correo para contestar sin diseño.",
  });
}

export function subscriberEmailHtml(email: string) {
  return layout({
    preheader: `${email} se suscribió a tu newsletter`,
    eyebrow: "nuevo suscriptor",
    title: "Tienes un nuevo suscriptor",
    content:
      paragraph("Una persona más quiere recibir tus próximos artículos.") +
      fields([
        ["Email", escapeHtml(email)],
        ["Fecha", new Date().toLocaleString("es-MX", { dateStyle: "long", timeStyle: "short", timeZone: "America/Mexico_City" })],
      ]) +
      button("Ver suscriptores en Resend", "https://resend.com/audience"),
  });
}

// Newsletter: un artículo destacado. Pensada para pegarse como HTML en Resend → Broadcasts.
// {{{RESEND_UNSUBSCRIBE_URL}}} lo sustituye Resend por el enlace de baja de cada suscriptor.
export function newsletterEmailHtml(n: {
  saludo: string;
  intro: string;
  articulo: { titulo: string; resumen: string; url: string; imagen?: string; etiqueta?: string };
}) {
  const a = n.articulo;
  const imagen = a.imagen
    ? `<a href="${a.url}"><img src="${a.imagen}" width="536" alt="" style="display:block;width:100%;height:auto;border:0;border-radius:8px;margin:0 0 18px"></a>`
    : "";
  const etiqueta = a.etiqueta
    ? `<span style="display:inline-block;margin:0 0 10px;padding:3px 10px;background:${C.accentSoft};color:${C.accent};border-radius:6px;font-family:${SANS};font-size:12px;font-weight:600">${escapeHtml(a.etiqueta)}</span>`
    : "";
  return layout({
    preheader: a.resumen,
    eyebrow: "newsletter",
    title: n.saludo,
    content:
      paragraph(n.intro) +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;border:1px solid ${C.line};border-radius:10px">
        <tr><td style="padding:20px">
          ${imagen}${etiqueta}
          <h2 style="margin:0 0 8px;font-family:${SANS};font-size:19px;line-height:1.35;font-weight:700;color:${C.ink}"><a href="${a.url}" style="color:${C.ink};text-decoration:none">${escapeHtml(a.titulo)}</a></h2>
          <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.65;color:${C.muted}">${escapeHtml(a.resumen)}</p>
          ${button("Ver más →", a.url)}
        </td></tr>
      </table>`,
    footerNote: `Recibes este correo porque te suscribiste a la newsletter de ${site.name}. <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${C.muted}">Darme de baja</a>`,
  });
}

// Respuesta de Carlos a quien escribió por el formulario: su texto, la cita del mensaje original y la firma.
export function replyEmailHtml(d: { name: string; type: string; original: string; reply: string }) {
  const url = site.url.replace(/\/$/, "");
  const parrafos = d.reply
    .trim()
    .split(/\n{2,}/)
    .map((p) => paragraph(escapeHtml(p).replace(/\n/g, "<br>")).replace(`color:${C.muted}`, `color:${C.ink}`))
    .join("");
  const firma = `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;padding-top:20px;border-top:1px solid ${C.line};width:100%"><tr>
      <td style="width:44px;vertical-align:top"><div style="width:40px;height:40px;line-height:40px;background:${C.accent};border-radius:10px;text-align:center;font-family:${SANS};font-size:15px;font-weight:700;color:#ffffff">${site.initials}</div></td>
      <td style="padding-left:12px;font-family:${SANS};vertical-align:top">
        <div style="font-size:15px;font-weight:600;color:${C.ink}">${site.name}</div>
        <div style="font-family:${MONO};font-size:12px;color:${C.muted}">${site.role}</div>
        <a href="${url}" style="font-size:13px;color:${C.accent};text-decoration:none">${url.replace(/^https?:\/\//, "")}</a>
      </td></tr></table>`;
  return layout({
    preheader: d.reply.slice(0, 120),
    eyebrow: "respuesta",
    title: `Hola, ${d.name}`,
    content:
      parrafos +
      firma +
      `<p style="margin:28px 0 8px;font-family:${MONO};font-size:12px;color:${C.muted}">// tu mensaje · ${escapeHtml(d.type)}</p>` +
      quote(d.original),
    footerNote: "Puedes responder directamente a este correo.",
  });
}
