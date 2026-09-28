import type { Locale } from "@/i18n/config";

// Datos personales del sitio: edita este archivo para personalizarlo.
// La biografía está en content/biografia(.en).md y los proyectos en content/proyectos/ (inglés en content/proyectos/en/).

// Datos que no cambian con el idioma
const base = {
  name: "Carlos Reyes",
  initials: "CR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Ruta a tu CV en PDF dentro de /public (ej. "/cv-carlos-reyes.pdf"). Vacío = no se muestra el botón.
  cv: "",

  // Redes: las que tengan href vacío no se muestran.
  social: [
    { label: "GitHub", href: "https://github.com/charlyreyess" },
    { label: "LinkedIn", href: "" },
  ],

  skills: ["Java", "Python", "JavaScript", "TypeScript", "Node.js", "Next.js", "Flutter", "FastAPI", "PostgreSQL", "MySQL", "Docker", "Supabase"],
};

type Icon = "code" | "server" | "desktop" | "bot";

// Textos del perfil en cada idioma
const localized = {
  es: {
    role: "Desarrollador de software Full Stack",
    roleShort: "Desarrollador Full Stack",
    location: "México",
    headline: "Convierto ideas en software que funciona.",
    intro:
      "Soy desarrollador Full Stack: diseño interfaces web y móviles, construyo APIs y automatizo procesos, con código limpio y un rendimiento que se nota.",
    // Descripción corta para buscadores, pie de página y tarjetas al compartir
    tagline:
      "Desarrollador de software Full Stack en México. Aplicaciones web, móviles y de escritorio, APIs y automatización con IA.",
    services: [
      { icon: "code" as Icon, title: "Frontend web y móvil", description: "Interfaces rápidas y accesibles, adaptadas a cualquier pantalla.", tags: ["Next.js", "React", "Flutter"] },
      { icon: "server" as Icon, title: "Backend y APIs", description: "APIs REST, autenticación, bases de datos y pagos en línea.", tags: ["Node.js", "FastAPI", "PostgreSQL"] },
      { icon: "desktop" as Icon, title: "Software de escritorio", description: "Sistemas internos, control de acceso e instaladores para Windows.", tags: ["Java", "Swing", "MySQL"] },
      { icon: "bot" as Icon, title: "Automatización e IA", description: "Bots, visión por computadora e integraciones con modelos de IA.", tags: ["Python", "YOLO", "LLM"] },
    ],
    layers: [
      { name: "Frontend", detail: "Web y móvil", tech: ["Next.js", "React", "Flutter", "Tailwind"] },
      { name: "Backend / API", detail: "Lógica y seguridad", tech: ["Node.js", "FastAPI", "Java", "JWT"] },
      { name: "Datos", detail: "Persistencia", tech: ["PostgreSQL", "MySQL", "Redis", "Supabase"] },
      { name: "Nube y DevOps", detail: "Despliegue", tech: ["Vercel", "Docker", "Cloudflare", "GitHub"] },
    ],
    process: [
      { title: "Descubrimiento", description: "Entiendo tu negocio, tus usuarios y los objetivos del proyecto." },
      { title: "Diseño", description: "Defino estructura, contenido y la interfaz antes de escribir código." },
      { title: "Desarrollo", description: "Construyo por etapas, con avances que puedes revisar en todo momento." },
      { title: "Lanzamiento", description: "Publico, mido el rendimiento y te dejo todo listo para crecer." },
    ],
  },
  en: {
    role: "Full Stack Software Developer",
    roleShort: "Full Stack Developer",
    location: "Mexico",
    headline: "I turn ideas into software that works.",
    intro:
      "I'm a Full Stack developer: I design web and mobile interfaces, build APIs and automate processes, with clean code and performance you can feel.",
    tagline:
      "Full Stack software developer based in Mexico. Web, mobile and desktop applications, APIs and AI-powered automation.",
    services: [
      { icon: "code" as Icon, title: "Web & mobile frontend", description: "Fast, accessible interfaces that adapt to any screen.", tags: ["Next.js", "React", "Flutter"] },
      { icon: "server" as Icon, title: "Backend & APIs", description: "REST APIs, authentication, databases and online payments.", tags: ["Node.js", "FastAPI", "PostgreSQL"] },
      { icon: "desktop" as Icon, title: "Desktop software", description: "Internal systems, access control and Windows installers.", tags: ["Java", "Swing", "MySQL"] },
      { icon: "bot" as Icon, title: "Automation & AI", description: "Bots, computer vision and integrations with AI models.", tags: ["Python", "YOLO", "LLM"] },
    ],
    layers: [
      { name: "Frontend", detail: "Web & mobile", tech: ["Next.js", "React", "Flutter", "Tailwind"] },
      { name: "Backend / API", detail: "Logic & security", tech: ["Node.js", "FastAPI", "Java", "JWT"] },
      { name: "Data", detail: "Persistence", tech: ["PostgreSQL", "MySQL", "Redis", "Supabase"] },
      { name: "Cloud & DevOps", detail: "Deployment", tech: ["Vercel", "Docker", "Cloudflare", "GitHub"] },
    ],
    process: [
      { title: "Discovery", description: "I get to know your business, your users and the project goals." },
      { title: "Design", description: "I define structure, content and the interface before writing code." },
      { title: "Development", description: "I build in stages, with progress you can review at any time." },
      { title: "Launch", description: "I ship it, measure performance and leave everything ready to grow." },
    ],
  },
};

export function getSite(lang: Locale) {
  return { ...base, ...localized[lang] };
}

// Versión en español (idioma por defecto): la usan los correos y los metadatos globales.
export const site = getSite("es");
export const socialLinks = base.social.filter((link) => link.href);
