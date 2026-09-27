import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { Newsletter } from "@/components/newsletter";
import { SkyScene } from "@/components/sky-scene";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

const icons = {
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
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
  const posts = getAllPosts().slice(0, 6);
  const allProjects = getAllProjects();
  const featured = allProjects.filter((project) => project.featured);
  const projects = (featured.length > 0 ? featured : allProjects).slice(0, 4);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-sky">
        <SkyScene />
        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-56 sm:px-6 sm:pt-24 md:pb-40 lg:pb-48">
          {/* Texto decorativo dibujado con CSS (no es contenido) */}
          <span
            aria-hidden
            data-text="¡Hola!"
            className="outline-display block text-[5.5rem] before:content-[attr(data-text)] sm:text-[9rem] lg:text-[11rem]"
          />
          <h1 className="mt-4 max-w-xl text-3xl font-bold text-balance text-sky-ink sm:text-5xl">
            Soy {site.name}, {site.role.toLowerCase()}.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed font-medium text-pretty text-sky-ink/80">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-md bg-accent px-6 py-3 font-medium text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
            >
              Leer el blog
            </Link>
            <Link
              href="/proyectos"
              className="rounded-md bg-surface px-6 py-3 font-medium text-heading transition-transform hover:-translate-y-0.5"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section aria-labelledby="que-hago" className="pt-16">
          <p className="text-sm font-semibold text-accent">Servicios</p>
          <h2 id="que-hago" className="mt-1 text-3xl font-bold text-heading">
            Qué hago
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {site.services.map((service) => (
              <li key={service.title} className="reveal rounded-lg border border-line bg-surface p-6 shadow-card">
                <span className="grid size-12 place-items-center rounded-lg bg-accent-soft text-accent">
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

        <section aria-labelledby="ultimos" className="pt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-accent">Blog</p>
              <h2 id="ultimos" className="mt-1 text-3xl font-bold text-heading">
                Últimos artículos
              </h2>
            </div>
            <Link href="/blog" className="shrink-0 text-sm font-medium whitespace-nowrap text-accent hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section aria-labelledby="proyectos" className="pt-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-accent">Portafolio</p>
                <h2 id="proyectos" className="mt-1 text-3xl font-bold text-heading">
                  Proyectos destacados
                </h2>
              </div>
              <Link href="/proyectos" className="shrink-0 text-sm font-medium whitespace-nowrap text-accent hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-20">
          <ContactCta email={site.email} />
        </div>

        <div className="mt-10">
          <Newsletter />
        </div>
      </div>
    </>
  );
}
