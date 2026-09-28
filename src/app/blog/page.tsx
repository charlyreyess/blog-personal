import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogExplorer } from "@/components/blog-explorer";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Todos los artículos sobre desarrollo web, diseño y despliegue.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <PageHero eyebrow="Blog" title="Blog">
        <p className="mt-4 max-w-xl text-lg font-medium text-sky-ink/80">Guías, notas y aprendizajes.</p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-line bg-surface p-10 text-center shadow-card">
            <p className="font-mono text-sm text-accent">{"// próximamente"}</p>
            <p className="mt-2 text-lg font-semibold text-heading">Pronto publicaré artículos sobre desarrollo de software.</p>
            <p className="mt-1 text-muted">Mientras tanto, puedes ver mis proyectos.</p>
          </div>
        ) : (
        <>
        {/* Sin JavaScript (o mientras carga) se ve la lista completa */}
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          }
        >
          <BlogExplorer posts={posts} tags={tags} />
        </Suspense>
        </>
        )}
      </div>
    </>
  );
}
