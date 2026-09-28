import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ReplyForm } from "@/components/reply-form";
import { verifyReplyToken } from "@/lib/reply-token";

// Página privada: solo se llega desde el enlace firmado del correo de contacto.
export const metadata: Metadata = {
  title: "Responder mensaje",
  robots: { index: false, follow: false },
};

export default async function ResponderPage({ searchParams }: PageProps<"/responder">) {
  const { t } = await searchParams;
  const token = typeof t === "string" ? t : null;
  const datos = verifyReplyToken(token);

  if (!token || !datos) {
    return (
      <>
        <PageHero eyebrow="Responder" title="Enlace no válido" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="relative -mt-12 rounded-lg bg-surface p-8 shadow-card">
            <p className="text-muted">
              Este enlace no es válido o ya caducó (duran 30 días). Abre el botón «Responder con diseño» del correo más
              reciente o contesta desde tu correo.
            </p>
            <Link href="/" className="mt-4 inline-block font-semibold text-accent hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Responder mensaje" title={`Responder a ${datos.name}`}>
        <p className="mt-4 font-mono text-sm font-medium text-sky-ink/80">{datos.email}</p>
      </PageHero>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative -mt-12 grid gap-6 lg:grid-cols-[1fr_22rem]">
          <ReplyForm token={token} name={datos.name} />
          <aside className="h-fit rounded-lg bg-surface p-6 shadow-card">
            <p className="font-mono text-xs font-semibold text-accent">
              <span className="text-muted">{"// "}</span>su mensaje
            </p>
            <p className="mt-3 inline-block rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
              {datos.type}
            </p>
            <blockquote className="mt-4 border-l-4 border-accent pl-4 text-sm leading-relaxed whitespace-pre-wrap text-muted">
              {datos.message}
            </blockquote>
          </aside>
        </div>
      </div>
    </>
  );
}
