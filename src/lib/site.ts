// Datos personales del blog: edita este archivo para personalizarlo.
// La biografía está en content/biografia.md y los proyectos en content/proyectos/.
export const site = {
  name: "Carlos Reyes",
  initials: "CR",
  role: "Desarrollador web",
  tagline: "Escribo sobre desarrollo web, diseño y lo que aprendo construyendo productos.",
  location: "México",
  email: "carskingdom84@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_MX",
  social: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  // Servicios que aparecen en la portada ("Qué hago"). icon: "code" | "design" | "rocket"
  services: [
    {
      icon: "code",
      title: "Desarrollo web",
      description: "Sitios y aplicaciones rápidas con React, Next.js y TypeScript, listas para crecer.",
    },
    {
      icon: "design",
      title: "Diseño de interfaces",
      description: "Interfaces claras, accesibles y adaptadas a cualquier pantalla, del boceto al código.",
    },
    {
      icon: "rocket",
      title: "Despliegue y rendimiento",
      description: "Publicación en la nube, SEO técnico y optimización para que tu web cargue al instante.",
    },
  ],
  skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase", "Vercel"],
} as const;
