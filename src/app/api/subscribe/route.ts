import { addSubscriber, isResendConfigured, notifyNewSubscriber } from "@/lib/mail";
import { messagesFor } from "@/lib/contact";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown; website?: unknown; lang?: unknown } | null;
  const m = messagesFor(body?.lang);

  // Campo trampa relleno = bot. Respondemos "ok" sin guardar nada.
  if (typeof body?.website === "string" && body.website.length > 0) {
    return Response.json({ message: m.subscribed });
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ message: m.email }, { status: 400 });
  }

  // Los suscriptores se guardan en Resend (contactos) y, si está configurado, también en Supabase.
  const supabase = getSupabase();
  if (!isResendConfigured() && !supabase) {
    console.error("Newsletter sin configurar: falta RESEND_API_KEY o Supabase.");
    return Response.json({ message: m.subscribeFailed }, { status: 503 });
  }

  let guardado = false;
  if (isResendConfigured()) {
    try {
      await addSubscriber(email);
      guardado = true;
    } catch (e) {
      console.error("Error al guardar suscriptor en Resend:", e);
    }
  }
  if (supabase) {
    const { error } = await supabase.from("subscribers").insert({ email });
    // 23505 = email duplicado (restricción unique): lo tratamos como éxito.
    if (!error || error.code === "23505") guardado = true;
    else console.error("Error al guardar suscriptor en Supabase:", error.message);
  }

  if (!guardado) {
    return Response.json({ message: m.subscribeFailed }, { status: 500 });
  }

  await notifyNewSubscriber(email).catch((e) => console.error("Aviso de suscripción:", e));
  return Response.json({ message: m.subscribed });
}
