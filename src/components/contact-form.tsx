"use client";

import { useState, type FormEvent } from "react";
import { projectTypes } from "@/lib/contact";

type Status = { kind: "idle" | "loading" | "ok" | "error"; message?: string };

const field =
  "mt-1.5 w-full rounded-md border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await res.json()) as { message: string };
      setStatus({ kind: res.ok ? "ok" : "error", message: result.message });
      if (res.ok) form.reset();
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
        <p className="mt-5 text-xl font-semibold text-heading">¡Mensaje enviado!</p>
        <p className="mt-2 text-muted">{status.message}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 text-sm font-semibold text-accent hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-surface p-6 shadow-card sm:p-10">
      {/* Campo trampa para bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-heading">
            Nombre
          </label>
          <input id="name" name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-heading">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={field}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="type" className="text-sm font-semibold text-heading">
          Tipo de proyecto
        </label>
        <select id="type" name="type" className={field} defaultValue={projectTypes[0]}>
          {projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-semibold text-heading">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          className={`${field} resize-y`}
          placeholder="Cuéntame sobre tu proyecto: objetivos, plazos y cualquier detalle útil."
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">Respondo en un plazo de 1 a 2 días hábiles.</p>
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="rounded-md bg-accent px-7 py-3.5 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status.kind === "loading" ? "Enviando…" : "Enviar mensaje"}
        </button>
      </div>

      <p role="alert" aria-live="assertive" className="mt-4 min-h-5 text-sm font-medium text-heading">
        {status.kind === "error" && status.message}
      </p>
    </form>
  );
}
