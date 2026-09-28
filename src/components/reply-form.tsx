"use client";

import { useState, type FormEvent } from "react";

type Status = { kind: "idle" | "loading" | "ok" | "error"; message?: string };

export function ReplyForm({ token, name }: { token: string; name: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reply = String(new FormData(event.currentTarget).get("reply") ?? "");
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token, reply }),
      });
      const data = (await res.json()) as { message: string };
      setStatus({ kind: res.ok ? "ok" : "error", message: data.message });
    } catch {
      setStatus({ kind: "error", message: "No se pudo conectar. Inténtalo de nuevo." });
    }
  }

  if (status.kind === "ok") {
    return (
      <div role="status" className="rounded-lg bg-surface p-8 text-center shadow-card sm:p-12">
        <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-full bg-accent-soft text-2xl text-accent">
          ✓
        </span>
        <p className="mt-5 text-xl font-semibold text-heading">¡Respuesta enviada!</p>
        <p className="mt-2 text-muted">{status.message} Si te contesta, lo recibirás en tu correo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-surface p-6 shadow-card sm:p-10">
      <label htmlFor="reply" className="text-sm font-semibold text-heading">
        Tu respuesta para {name}
      </label>
      <textarea
        id="reply"
        name="reply"
        required
        minLength={2}
        maxLength={5000}
        rows={10}
        placeholder={`Hola ${name}, gracias por escribir…`}
        className="mt-1.5 w-full resize-y rounded-md border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <p className="mt-2 text-xs text-muted">
        Se enviará con el diseño de tu web, tu firma y una cita de su mensaje. Separa párrafos con una línea en blanco.
      </p>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="rounded-md bg-accent px-7 py-3.5 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status.kind === "loading" ? "Enviando…" : "Enviar respuesta"}
        </button>
      </div>
      <p role="alert" className="mt-4 min-h-5 text-sm font-medium text-heading">
        {status.kind === "error" && status.message}
      </p>
    </form>
  );
}
