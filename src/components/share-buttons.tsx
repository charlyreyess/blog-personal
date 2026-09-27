"use client";

import { useState } from "react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  const networks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${link}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}` },
    { label: "X", href: `https://x.com/intent/post?text=${text}&url=${link}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // El portapapeles puede no estar disponible (http sin TLS); no hacemos nada.
    }
  }

  const chip =
    "rounded-md border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-heading">Compartir:</span>
      {networks.map((network) => (
        <a key={network.label} href={network.href} target="_blank" rel="noopener noreferrer" className={chip}>
          {network.label}
        </a>
      ))}
      <button type="button" onClick={copyLink} className={chip}>
        <span aria-live="polite">{copied ? "¡Enlace copiado!" : "Copiar enlace"}</span>
      </button>
    </div>
  );
}
