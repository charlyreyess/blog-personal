// Datos personales del sitio: edita este archivo para personalizarlo.
// La biografía está en content/biografia.md y los proyectos en content/proyectos/.
export const site = {
  name: "Carlos Reyes",
  initials: "CR",
  role: "Desarrollador de software Full Stack",
  roleShort: "Desarrollador Full Stack",
  location: "México",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_MX",

  // Portada
  heroLabel: "Software a la medida · Web · Móvil · Escritorio · IA",
  headline: "Construyo software de punta a punta: del frontend a la base de datos.",
  intro:
    "Soy desarrollador Full Stack: diseño interfaces web y móviles, construyo APIs y automatizo procesos, con código limpio y un rendimiento que se nota.",
  // Descripción corta para buscadores, pie de página y tarjetas al compartir
  tagline: "Desarrollador de software Full Stack en México. Aplicaciones web, móviles y de escritorio, APIs y automatización con IA.",

  // Ruta a tu CV en PDF dentro de /public (ej. "/cv-carlos-reyes.pdf"). Vacío = no se muestra el botón.
  cv: "",

  // Redes: las que tengan href vacío no se muestran.
  social: [
    { label: "GitHub", href: "https://github.com/charlyreyess" },
    { label: "LinkedIn", href: "" },
  ],

  // Servicios ("Qué hago"). icon: "code" | "server" | "desktop" | "bot"
  services: [
    {
      icon: "code",
      title: "Frontend web y móvil",
      description: "Interfaces rápidas y accesibles, adaptadas a cualquier pantalla.",
      tags: ["Next.js", "React", "Flutter"],
    },
    {
      icon: "server",
      title: "Backend y APIs",
      description: "APIs REST, autenticación, bases de datos y pagos en línea.",
      tags: ["Node.js", "FastAPI", "PostgreSQL"],
    },
    {
      icon: "desktop",
      title: "Software de escritorio",
      description: "Sistemas internos, control de acceso e instaladores para Windows.",
      tags: ["Java", "Swing", "MySQL"],
    },
    {
      icon: "bot",
      title: "Automatización e IA",
      description: "Bots, visión por computadora e integraciones con modelos de IA.",
      tags: ["Python", "YOLO", "LLM"],
    },
  ],

  // Arquitectura de punta a punta (sección de la portada)
  layers: [
    { name: "Frontend", detail: "Web y móvil", tech: ["Next.js", "React", "Flutter", "Tailwind"] },
    { name: "Backend / API", detail: "Lógica y seguridad", tech: ["Node.js", "FastAPI", "Java", "JWT"] },
    { name: "Datos", detail: "Persistencia", tech: ["PostgreSQL", "MySQL", "Redis", "Supabase"] },
    { name: "Nube y DevOps", detail: "Despliegue", tech: ["Vercel", "Docker", "Cloudflare", "GitHub"] },
  ],

  // Proceso de trabajo ("Cómo trabajo")
  process: [
    { title: "Descubrimiento", description: "Entiendo tu negocio, tus usuarios y los objetivos del proyecto." },
    { title: "Diseño", description: "Defino estructura, contenido y la interfaz antes de escribir código." },
    { title: "Desarrollo", description: "Construyo por etapas, con avances que puedes revisar en todo momento." },
    { title: "Lanzamiento", description: "Publico, mido el rendimiento y te dejo todo listo para crecer." },
  ],

  skills: ["Java", "Python", "JavaScript", "TypeScript", "Node.js", "Next.js", "Flutter", "FastAPI", "PostgreSQL", "MySQL", "Docker", "Supabase"],
} as const;

export const socialLinks = site.social.filter((link) => link.href);
