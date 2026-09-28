import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 404 para rutas que no pasan por un idioma (p. ej. /archivo.xml inexistente)
    globalNotFound: true,
  },
  images: {
    // Calidad alta para capturas y logos de proyectos; AVIF/WebP según el navegador
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
