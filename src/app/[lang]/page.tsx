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
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSite } from "@/lib/site";

const icons = {
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
    </>
  ),
  desktop: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M6 8h5M6 11h8" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 8V4M9 4h6M9 14h.01M15 14h.01M2 13v3M22 13v3" />
    </>
  ),
};

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const site = getSite(lang);
  const t = getDictionary(lang).home;
  const posts = getAllPosts().slice(0, 3);
  const allProjects = getAllProjects(lang);
  const featured = allProjects.filter((project) => project.featured);
  const projects = (featured.length > 0 ? featured : allProjects).slice(0, 4);
  const stats = [
    { value: allProjects.length, label: t.stats.projects },
    { value: site.skills.length, label: t.stats.tech },
    { value: 3, label: t.stats.platforms },
    { value: "E2E", label: t.stats.e2e },
  ];

  return (
    <>
      {/* Presentación */}
      <section className="relative isolate overflow-hidden bg-sky">
        <SkyScene />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:grid-cols-[1fr_26rem] lg:pt-28 lg:pb-28">
          <div>
          <h1 className="max-w-2xl text-4xl leading-[1.1] font-bold tracking-tight text-balance text-sky-ink sm:text-5xl lg:text-6xl">
            {site.headline}
            <span aria-hidden className="animate-blink ml-1 font-light text-accent">_</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed font-medium text-pretty text-sky-ink/80">{site.intro}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={localePath(lang, "/proyectos")}
              className="rounded-md bg-accent px-6 py-3.5 font-semibold text-on-accent shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5"
            >
              {t.seeProjects}
            </Link>
            <Link
              href={localePath(lang, "/contacto")}
              className="rounded-md bg-surface px-6 py-3.5 font-semibold text-heading shadow-card transition-transform hover:-translate-y-0.5"
            >
              {t.talk}
            </Link>
            {site.cv && (
              <a href={site.cv} download className="px-2 py-3 font-semibold text-sky-ink underline-offset-4 hover:underline">
                {t.downloadCv}
              </a>
            )}
          </div>
          </div>
          <div className="hidden lg:block">
            <TerminalCard lang={lang} />
          </div>
        </div>
      </section>

      {/* Stack */}
      <section aria-labelledby="stack" className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:gap-8">
          <h2 id="stack" className="shrink-0 font-mono text-xs font-semibold text-muted">
            <span aria-hidden className="text-accent">&gt;_ </span>
            {t.stackLabel}
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm font-semibold text-heading">
            {site.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Cifras */}
        <section aria-label={t.statsLabel} className="pt-14">
          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse rounded-lg border border-line bg-surface p-5 shadow-card">
                <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
                <dd className="font-mono text-3xl font-bold text-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Proyectos */}
        {projects.length > 0 && (
          <section aria-labelledby="proyectos" className="pt-20 sm:pt-24">
            <SectionHeading
              id="proyectos"
              eyebrow={t.portfolio.eyebrow}
              title={t.portfolio.title}
              description={t.portfolio.description}
              link={{ href: localePath(lang, "/proyectos"), label: t.portfolio.link }}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} lang={lang} wide={projects.length === 1} />
              ))}
            </div>
          </section>
        )}

        {/* Servicios */}
        <section aria-labelledby="servicios" className="pt-20 sm:pt-24">
          <SectionHeading
            id="servicios"
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            description={t.services.description}
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-xs">
                  {service.tags.map((tag) => (
                    <li key={tag} className="rounded bg-paper px-2 py-1 text-heading ring-1 ring-line">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Arquitectura */}
        <section aria-labelledby="arquitectura" className="pt-20 sm:pt-24">
          <SectionHeading
            id="arquitectura"
            eyebrow={t.architecture.eyebrow}
            title={t.architecture.title}
            description={t.architecture.description}
          />
          <ol className="relative grid gap-4 md:grid-cols-4">
            <div aria-hidden className="absolute top-9 right-[12%] left-[12%] hidden h-px border-t-2 border-dashed border-accent/30 md:block" />
            {site.layers.map((layer, index) => (
              <li key={layer.name} className="reveal relative rounded-lg border border-line bg-surface p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent font-mono text-sm font-bold text-on-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-heading">{layer.name}</h3>
                    <p className="font-mono text-xs text-muted">{layer.detail}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5 font-mono text-sm text-heading">
                  {layer.tech.map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span aria-hidden className="text-accent">▸</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* Proceso */}
        <section aria-labelledby="proceso" className="pt-20 sm:pt-24">
          <SectionHeading
            id="proceso"
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            description={t.process.description}
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
                  <span className="sr-only">{t.process.step} {index + 1}: </span>
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
              eyebrow={t.blog.eyebrow}
              title={t.blog.title}
              description={t.blog.description}
              link={{ href: localePath(lang, "/blog"), label: t.blog.link }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-24">
          <ContactCta lang={lang} />
        </div>

        <div className="mt-10">
          <Newsletter lang={lang} />
        </div>
      </div>
    </>
  );
}
