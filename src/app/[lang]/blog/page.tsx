import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogExplorer } from "@/components/blog-explorer";
import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { assertLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/metadata";
import { getAllPosts, getAllTags } from "@/lib/posts";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).blog;
  return { title: t.title, description: t.text, alternates: alternates(lang, "/blog") };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).blog;
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <PageHero eyebrow={t.title} title={t.title}>
        <p className="mt-4 max-w-xl text-lg font-medium text-sky-ink/80">{t.text}</p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-line bg-surface p-10 text-center shadow-card">
            <p className="font-mono text-sm text-accent">{t.soonEyebrow}</p>
            <p className="mt-2 text-lg font-semibold text-heading">{t.soonTitle}</p>
            <p className="mt-1 text-muted">{t.soonText}</p>
          </div>
        ) : (
        <>
        {/* Sin JavaScript (o mientras carga) se ve la lista completa */}
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          }
        >
          <BlogExplorer posts={posts} tags={tags} lang={lang} />
        </Suspense>
        </>
        )}
      </div>
    </>
  );
}
