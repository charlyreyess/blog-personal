import { sendReplyEmail } from "@/lib/mail";
import { verifyReplyToken } from "@/lib/reply-token";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { t?: unknown; reply?: unknown } | null;
  const datos = verifyReplyToken(typeof body?.t === "string" ? body.t : null);
  if (!datos) {
    return Response.json({ message: "El enlace no es válido o ya caducó." }, { status: 403 });
  }

  const reply = typeof body?.reply === "string" ? body.reply.trim() : "";
  if (reply.length < 2 || reply.length > 5000) {
    return Response.json({ message: "La respuesta debe tener entre 2 y 5000 caracteres." }, { status: 400 });
  }

  try {
    await sendReplyEmail({ name: datos.name, email: datos.email, type: datos.type, original: datos.message, reply });
  } catch (e) {
    const err = e as Error & { status?: number; detalle?: string };
    console.error("Error al enviar la respuesta:", err.message);
    // Sin dominio verificado, Resend solo permite enviar al correo de la cuenta.
    if (err.status === 403 && /own email|verify a domain|testing emails/i.test(err.detalle ?? "")) {
      return Response.json(
        {
          message:
            "Resend aún no permite enviar a otras personas: verifica un dominio propio en resend.com/domains y configura CONTACT_FROM.",
        },
        { status: 503 },
      );
    }
    return Response.json({ message: "No se pudo enviar la respuesta. Inténtalo de nuevo." }, { status: 500 });
  }

  return Response.json({ message: `Respuesta enviada a ${datos.name}.` });
}
