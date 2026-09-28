import { projectTypes } from "@/lib/contact";
import { isMailConfigured, sendContactEmail } from "@/lib/mail";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  // Campo trampa relleno = bot. Respondemos "ok" sin guardar nada.
  if (text(body?.website)) {
    return Response.json({ message: "Gracias, te responderé pronto." });
  }

  const name = text(body?.name);
  const email = text(body?.email).toLowerCase();
  const message = text(body?.message);
  const type = projectTypes.find((option) => option === text(body?.type)) ?? "Otro";

  if (!name || name.length > 100) {
    return Response.json({ message: "Escribe tu nombre." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ message: "Introduce un email válido." }, { status: 400 });
  }
  if (message.length < 10 || message.length > 3000) {
    return Response.json({ message: "El mensaje debe tener entre 10 y 3000 caracteres." }, { status: 400 });
  }

  // El mensaje se entrega por correo (Resend) y, si Supabase está configurado, también se guarda.
  const supabase = getSupabase();
  if (!isMailConfigured() && !supabase) {
    console.error("Formulario de contacto sin configurar: faltan RESEND_API_KEY/CONTACT_TO_EMAIL o Supabase.");
    return Response.json(
      { message: "No se pudo enviar el mensaje en este momento. Inténtalo de nuevo más tarde." },
      { status: 503 },
    );
  }

  let entregado = false;
  if (isMailConfigured()) {
    try {
      await sendContactEmail({ name, email, type, message });
      entregado = true;
    } catch (e) {
      console.error("Error al enviar el correo de contacto:", e);
    }
  }
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({ name, email, type, message });
    if (error) console.error("Error al guardar mensaje de contacto:", error.message);
    else entregado = true;
  }

  if (!entregado) {
    return Response.json(
      { message: "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos." },
      { status: 500 },
    );
  }

  return Response.json({ message: "Gracias por escribir. Te responderé en 1 a 2 días hábiles." });
}
