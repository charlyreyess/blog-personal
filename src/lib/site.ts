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
  headline: "Construyo software de punta a punta: del frontend a la base de datos.",
  intro:
    "Soy desarrollador Full Stack: diseño interfaces web y móviles, construyo APIs y automatizo procesos, con código limpio y un rendimiento que se nota.",
  // Descripción corta para buscadores, pie de página y tarjetas al compartir
  tagline: "Desarrollador de software Full Stack en México. Proyectos, guías y aprendizajes sobre desarrollo de software.",

  // Ruta a tu CV en PDF dentro de /public (ej. "/cv-carlos-reyes.pdf"). Vacío = no se muestra el botón.
  cv: "",

  // Redes: las que tengan href vacío no se muestran.
  social: [
    { label: "GitHub", href: "https://github.com/charlyreyess" },
    { label: "LinkedIn", href: "" },
  ],

  // Servicios ("Qué hago"). icon: "code" | "server" | "bot" | "design" | "rocket"
  services: [
    {
      icon: "code",
      title: "Frontend web y móvil",
      description: "Interfaces rápidas y accesibles con Next.js, React y Flutter, adaptadas a cualquier pantalla.",
    },
    {
      icon: "server",
      title: "Backend y APIs",
      description: "APIs REST con Node.js, Python (FastAPI) y Java, bases de datos PostgreSQL y MySQL, y pagos en línea.",
    },
    {
      icon: "bot",
      title: "Automatización e IA",
      description: "Bots, integraciones con modelos de IA y herramientas que automatizan tareas repetitivas.",
    },
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
