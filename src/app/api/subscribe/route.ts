import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown; website?: unknown } | null;

  // Campo trampa relleno = bot. Respondemos "ok" sin guardar nada.
  if (typeof body?.website === "string" && body.website.length > 0) {
    return Response.json({ message: "¡Listo! Te avisaré cuando publique algo nuevo." });
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ message: "Introduce un email válido." }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return Response.json(
      { message: "La newsletter aún no está configurada (faltan las variables de Supabase)." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("subscribers").insert({ email });
  // 23505 = email duplicado (restricción unique): lo tratamos como éxito.
  if (error && error.code !== "23505") {
    console.error("Error al guardar suscriptor:", error.message);
    return Response.json({ message: "No se pudo completar la suscripción." }, { status: 500 });
  }

  return Response.json({ message: "¡Listo! Te avisaré cuando publique algo nuevo." });
}
