"use client";

import { useEffect } from "react";

// Añade un botón "Copiar" a cada bloque de código del artículo.
export function CopyCode() {
  useEffect(() => {
    document.querySelectorAll<HTMLPreElement>(".prose pre").forEach((pre) => {
      if (pre.querySelector(".copy-code")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code";
      button.textContent = "Copiar";
      button.setAttribute("aria-label", "Copiar código");
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector("code")?.innerText ?? "");
          button.textContent = "¡Copiado!";
        } catch {
          button.textContent = "No se pudo copiar";
        }
        setTimeout(() => (button.textContent = "Copiar"), 1800);
      });
      pre.appendChild(button);
    });
  }, []);

  return null;
}
