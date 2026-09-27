// Datos personales del sitio: edita este archivo para personalizarlo.
// La biografía está en content/biografia.md y los proyectos en content/proyectos/.
export const site = {
  name: "Carlos Reyes",
  initials: "CR",
  role: "Desarrollador web",
  location: "México",
  email: "carskingdom84@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_MX",

  // Portada
  headline: "Desarrollo sitios web rápidos, accesibles y pensados para convertir.",
  intro:
    "Ayudo a negocios y profesionales a llevar sus ideas a la web: del diseño al despliegue, con código limpio y un rendimiento que se nota.",
  // Descripción corta para buscadores, pie de página y tarjetas al compartir
  tagline: "Desarrollador web en México. Proyectos, guías y aprendizajes sobre desarrollo y diseño web.",

  // Ruta a tu CV en PDF dentro de /public (ej. "/cv-carlos-reyes.pdf"). Vacío = no se muestra el botón.
  cv: "",

  // Redes: las que tengan href vacío no se muestran.
  social: [
    { label: "GitHub", href: "https://github.com/charlyreyess" },
    { label: "LinkedIn", href: "" },
  ],

  // Servicios ("Qué hago"). icon: "code" | "design" | "rocket"
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

  // Proceso de trabajo ("Cómo trabajo")
  process: [
    { title: "Descubrimiento", description: "Entiendo tu negocio, tus usuarios y los objetivos del proyecto." },
    { title: "Diseño", description: "Defino estructura, contenido y la interfaz antes de escribir código." },
    { title: "Desarrollo", description: "Construyo por etapas, con avances que puedes revisar en todo momento." },
    { title: "Lanzamiento", description: "Publico, mido el rendimiento y te dejo todo listo para crecer." },
  ],

  skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase", "Vercel"],
} as const;

export const socialLinks = site.social.filter((link) => link.href);
