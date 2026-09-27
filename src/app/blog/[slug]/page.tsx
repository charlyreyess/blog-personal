import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCode } from "@/components/copy-code";
import { PostCard } from "@/components/post-card";
import { ShareButtons } from "@/components/share-buttons";
import { SkyScene } from "@/components/sky-scene";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPost, getPostNeighbors } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const { newer, older, related } = getPostNeighbors(post.slug);
  const postUrl = `${site.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <article>
      <div aria-hidden className="reading-progress fixed inset-x-0 top-0 z-50 h-1 origin-left bg-accent" />
      <CopyCode />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="relative isolate overflow-hidden bg-sky">
        <SkyScene variant="band" />
        <div className="relative mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14 sm:pb-28">
          <Link href="/blog" className="text-sm font-medium text-sky-ink/80 hover:text-sky-ink">
            ← Volver al blog
          </Link>
          <p className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-md bg-surface px-2.5 py-1 text-accent hover:bg-accent hover:text-on-accent"
              >
                {tag}
              </Link>
            ))}
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-bold text-balance text-sky-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-sm font-medium text-sky-ink/80">
            {site.name} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min de
            lectura
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative -mt-12 rounded-lg bg-surface p-6 shadow-card sm:p-10">
          <p className="mb-8 text-lg leading-relaxed font-medium text-pretty text-heading">{post.description}</p>
          {post.headings.length >= 3 && (
            <nav aria-label="Índice del artículo" className="mb-10 rounded-lg border border-line bg-paper p-5">
              <details open className="group">
                <summary className="cursor-pointer text-sm font-semibold text-heading marker:text-accent">
                  En este artículo
                </summary>
                <ol className="mt-3 space-y-1.5 pl-5 text-sm text-muted">
                  {post.headings.map((heading, i) => (
                    <li key={heading.id} className="list-none">
                      <a href={`#${heading.id}`} className="hover:text-accent">
                        <span className="mr-2 font-semibold text-accent">{i + 1}.</span>
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>
          )}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="mt-12 border-t border-line pt-6">
            <ShareButtons url={postUrl} title={post.title} />
          </div>
        </div>
        <footer className="mt-8 rounded-lg border-l-4 border-accent bg-surface p-6 shadow-card">
          <p className="font-semibold text-heading">¿Te ha resultado útil?</p>
          <p className="mt-1 text-sm text-muted">
            Escríbeme a{" "}
            <a href={`mailto:${site.email}`} className="break-all text-accent underline underline-offset-2">
              {site.email}
            </a>{" "}
            o <Link href="/#newsletter" className="text-accent underline underline-offset-2">suscríbete</Link> para
            recibir el próximo artículo.
          </p>
        </footer>

        {(older || newer) && (
          <nav aria-label="Más artículos" className="mt-8 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="rounded-lg bg-surface p-5 shadow-card transition-colors hover:text-accent"
              >
                <span className="text-xs font-medium text-muted">← Anterior</span>
                <span className="mt-1 block font-semibold text-heading">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="rounded-lg bg-surface p-5 text-right shadow-card transition-colors hover:text-accent"
              >
                <span className="text-xs font-medium text-muted">Siguiente →</span>
                <span className="mt-1 block font-semibold text-heading">{newer.title}</span>
              </Link>
            )}
          </nav>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="mx-auto mt-16 max-w-3xl px-4 sm:px-6">
          <h2 id="relacionados" className="mb-6 text-2xl font-bold text-heading">
            También te puede interesar
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
