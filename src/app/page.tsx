import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { Newsletter } from "@/components/newsletter";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SkyScene } from "@/components/sky-scene";
import { TerminalCard } from "@/components/terminal-card";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

const icons = {
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 8V4M9 4h6M9 14h.01M15 14h.01M2 13v3M22 13v3" />
    </>
  ),
  design: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const allProjects = getAllProjects();
  const featured = allProjects.filter((project) => project.featured);
  const projects = (featured.length > 0 ? featured : allProjects).slice(0, 4);

  return (
    <>
      {/* Presentación */}
      <section className="relative isolate overflow-hidden bg-sky">
        <SkyScene />
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 pt-16 pb-60 sm:px-6 sm:pt-24 md:pb-44 lg:grid-cols-[1fr_26rem] lg:pt-28 lg:pb-52">
          <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-3.5 py-1.5 text-sm font-medium text-heading shadow-card backdrop-blur">
            <span aria-hidden className="size-2 rounded-full bg-grass ring-4 ring-grass/25" />
            {site.name} · {site.role} en {site.location}
          </p>
          <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] font-bold tracking-tight text-balance text-sky-ink sm:text-5xl lg:text-6xl">
            {site.headline}
            <span aria-hidden className="animate-blink ml-1 font-light text-accent">_</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed font-medium text-pretty text-sky-ink/80">{site.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/proyectos"
              className="rounded-md bg-accent px-6 py-3.5 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
            >
              Ver proyectos
            </Link>
            <Link
              href="/contacto"
              className="rounded-md bg-surface px-6 py-3.5 font-semibold text-heading shadow-card transition-transform hover:-translate-y-0.5"
            >
              Hablemos de tu proyecto
            </Link>
            {site.cv && (
              <a href={site.cv} download className="px-2 py-3 font-semibold text-sky-ink underline-offset-4 hover:underline">
                Descargar CV ↓
              </a>
            )}
          </div>
          </div>
          <div className="hidden lg:block lg:pt-4">
            <TerminalCard />
          </div>
        </div>
      </section>

      {/* Stack */}
      <section aria-labelledby="stack" className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:gap-8">
          <h2 id="stack" className="shrink-0 font-mono text-xs font-semibold text-muted">
            <span aria-hidden className="text-accent">&gt;_ </span>
            stack --tecnologías
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm font-semibold text-heading">
            {site.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Proyectos */}
        {projects.length > 0 && (
          <section aria-labelledby="proyectos" className="pt-20 sm:pt-24">
            <SectionHeading
              id="proyectos"
              eyebrow="Portafolio"
              title="Proyectos destacados"
              description="Una selección de trabajos: el problema, la solución y el resultado."
              link={{ href: "/proyectos", label: "Ver todos los proyectos" }}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} wide={projects.length === 1} />
              ))}
            </div>
          </section>
        )}

        {/* Servicios */}
        <section aria-labelledby="servicios" className="pt-20 sm:pt-24">
          <SectionHeading
            id="servicios"
            eyebrow="Servicios"
            title="En qué te puedo ayudar"
            description="Me involucro en todo el ciclo del proyecto para que el resultado sea coherente de principio a fin."
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {site.services.map((service) => (
              <li
                key={service.title}
                className="reveal group rounded-lg border border-line bg-surface p-7 shadow-card transition-colors hover:border-accent/40"
              >
                <span className="grid size-12 place-items-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-on-accent">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {icons[service.icon]}
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-semibold text-heading">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Proceso */}
        <section aria-labelledby="proceso" className="pt-20 sm:pt-24">
          <SectionHeading
            id="proceso"
            eyebrow="Proceso"
            title="Cómo trabajo"
            description="Un proceso claro y transparente, con avances que puedes revisar en cada etapa."
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.process.map((step, index) => (
              <li key={step.title} className="reveal relative rounded-lg bg-surface p-6 shadow-card">
                <span
                  aria-hidden
                  data-text={String(index + 1).padStart(2, "0")}
                  className="outline-accent block text-5xl before:content-[attr(data-text)]"
                />
                <h3 className="mt-4 text-lg font-semibold text-heading">
                  <span className="sr-only">Paso {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Blog */}
        {posts.length > 0 && (
          <section aria-labelledby="ultimos" className="pt-20 sm:pt-24">
            <SectionHeading
              id="ultimos"
              eyebrow="Blog"
              title="Últimos artículos"
              description="Guías prácticas y aprendizajes sobre desarrollo y diseño web."
              link={{ href: "/blog", label: "Ir al blog" }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-24">
          <ContactCta email={site.email} />
        </div>

        <div className="mt-10">
          <Newsletter />
        </div>
      </div>
    </>
  );
}
