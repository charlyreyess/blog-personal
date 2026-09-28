import { createHmac, timingSafeEqual } from "node:crypto";

// Enlace firmado para responder a un mensaje de contacto desde /responder.
// Solo permite escribir a la persona que envió el mensaje y caduca a los 30 días.
// Requiere la variable de entorno REPLY_SECRET (una cadena aleatoria larga).

export type ReplyPayload = { name: string; email: string; type: string; message: string; exp: number };

const DIAS = 30;
const b64 = (s: string | Buffer) => Buffer.from(s).toString("base64url");

function firma(datos: string) {
  const secret = process.env.REPLY_SECRET;
  if (!secret) throw new Error("Falta REPLY_SECRET");
  return createHmac("sha256", secret).update(datos).digest("base64url");
}

export const isReplyConfigured = () => Boolean(process.env.REPLY_SECRET);

export function createReplyToken(d: Omit<ReplyPayload, "exp">) {
  const payload: ReplyPayload = { ...d, message: d.message.slice(0, 1500), exp: Date.now() + DIAS * 86_400_000 };
  const datos = b64(JSON.stringify(payload));
  return `${datos}.${firma(datos)}`;
}

export function verifyReplyToken(token: string | undefined | null): ReplyPayload | null {
  if (!token || !isReplyConfigured()) return null;
  const [datos, sig] = token.split(".");
  if (!datos || !sig) return null;
  const esperada = Buffer.from(firma(datos));
  const recibida = Buffer.from(sig);
  if (esperada.length !== recibida.length || !timingSafeEqual(esperada, recibida)) return null;
  try {
    const payload = JSON.parse(Buffer.from(datos, "base64url").toString("utf8")) as ReplyPayload;
    return payload.exp > Date.now() ? payload : null;
  } catch {
    return null;
  }
}
