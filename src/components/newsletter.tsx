"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Status = { kind: "idle" | "loading" | "ok" | "error"; message?: string };

export function Newsletter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).newsletter;
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
        body: JSON.stringify({ email: data.get("email"), website: data.get("website"), lang }),
      });
      const result = (await res.json()) as { message: string };
      setStatus({ kind: res.ok ? "ok" : "error", message: result.message });
      if (res.ok) form.reset();
    } catch {
      setStatus({ kind: "error", message: t.offline });
    }
  }

  return (
    <section id="newsletter" className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-card sm:p-12">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-[#0251fe] to-violet-600" />
      <h2 className="text-2xl font-bold text-heading sm:text-3xl">{t.title}</h2>
      <p className="mt-2 max-w-prose text-muted">
        {t.text}
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        {/* Campo trampa para bots: las personas no lo ven ni lo rellenan */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <label htmlFor="newsletter-email" className="sr-only">
          {t.label}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.placeholder}
          className="h-12 flex-1 rounded-md border border-line bg-paper px-5 text-ink placeholder:text-muted focus:border-violet-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="h-12 rounded-md bg-gradient-to-r from-[#0251fe] to-violet-600 px-6 font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status.kind === "loading" ? t.sending : t.submit}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-5 text-sm font-medium ${status.kind === "error" ? "text-red-700" : "text-emerald-700"}`}
      >
        {status.message}
      </p>
    </section>
  );
}
