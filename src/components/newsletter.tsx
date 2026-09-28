"use client";

import { useState, type FormEvent } from "react";

type Status = { kind: "idle" | "loading" | "ok" | "error"; message?: string };

export function Newsletter() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
      });
      const result = (await res.json()) as { message: string };
      setStatus({ kind: res.ok ? "ok" : "error", message: result.message });
      if (res.ok) form.reset();
    } catch {
      setStatus({ kind: "error", message: "No se pudo conectar. Inténtalo de nuevo." });
    }
  }

  return (
    <section id="newsletter" className="relative scroll-mt-24 overflow-hidden rounded-lg bg-accent p-7 text-on-accent shadow-card sm:p-12">
      <h2 className="text-2xl font-bold sm:text-3xl">Recibe novedades</h2>
      <p className="mt-2 max-w-prose opacity-90">
        Un correo cuando publique un proyecto o artículo nuevo. Sin spam y con baja en un clic.
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        {/* Campo trampa para bots: las personas no lo ven ni lo rellenan */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <label htmlFor="newsletter-email" className="sr-only">
          Tu email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="h-12 flex-1 rounded-md border-2 border-transparent bg-white px-5 text-[#282a3c] placeholder:text-[#595d6e] focus:border-[#86daf0] focus:outline-none"
        />
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="h-12 rounded-md bg-[#282a3c] px-6 font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {status.kind === "loading" ? "Enviando…" : "Suscribirme"}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-5 text-sm font-medium ${status.kind === "error" ? "font-semibold" : "opacity-90"}`}
      >
        {status.message}
      </p>
    </section>
  );
}
