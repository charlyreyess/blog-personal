import type { Metadata } from "next";
import Link from "next/link";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

// 404 para URLs que no pertenecen a ningún idioma (archivos inexistentes, etc.). Bilingüe porque no hay idioma.
const sans = Poppins({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "600", "700"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "404 · Carlos Reyes" };

export default function GlobalNotFound() {
  return (
    <html lang="es-MX" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-dvh items-center bg-sky font-sans">
        <main className="mx-auto w-full max-w-3xl px-6 py-20">
          <p aria-hidden data-text="404" className="outline-accent text-[7rem] leading-none before:content-[attr(data-text)] sm:text-[10rem]" />
          <h1 className="mt-6 text-3xl font-bold text-sky-ink sm:text-4xl">Página no encontrada</h1>
          <p lang="en" className="mt-1 font-mono text-sm text-muted">
            Page not found
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-md bg-accent px-6 py-3 font-semibold text-on-accent">
              Volver al inicio
            </Link>
            <Link href="/en" lang="en" className="rounded-md bg-surface px-6 py-3 font-semibold text-heading shadow-card">
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
