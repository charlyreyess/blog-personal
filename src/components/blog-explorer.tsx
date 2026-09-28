"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PostCard } from "@/components/post-card";
import type { Locale } from "@/i18n/config";
import type { PostMeta } from "@/lib/posts";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function BlogExplorer({ posts, tags, lang }: { posts: PostMeta[]; tags: string[]; lang: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedTag = searchParams.get("tag");
  const activeTag = requestedTag && tags.includes(requestedTag) ? requestedTag : null;
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) return false;
      const haystack = normalize([post.title, post.description, ...post.tags].join(" "));
      return terms.every((term) => haystack.includes(term));
    });
  }, [posts, activeTag, query]);

  function selectTag(tag: string | null) {
    router.replace(tag ? `${pathname}?tag=${encodeURIComponent(tag)}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por etiqueta" className="flex flex-wrap gap-2 text-sm font-medium">
          {[null, ...tags].map((tag) => {
            const active = tag === activeTag;
            return (
              <button
                key={tag ?? "todos"}
                type="button"
                onClick={() => selectTag(tag)}
                aria-pressed={active}
                className={`rounded-md px-4 py-2 transition-colors ${
                  active ? "bg-accent text-on-accent" : "bg-surface text-muted shadow-card hover:text-accent"
                }`}
              >
                {tag ?? "Todos"}
              </button>
            );
          })}
        </div>
        <div className="relative lg:w-72">
          <label htmlFor="buscar" className="sr-only">
            Buscar artículos
          </label>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="buscar"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar artículos…"
            className="h-11 w-full rounded-md border border-line bg-surface pr-4 pl-10 text-sm text-ink shadow-card placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <h2 className="sr-only">Artículos</h2>
      <p aria-live="polite" className="sr-only">
        {results.length} {results.length === 1 ? "artículo encontrado" : "artículos encontrados"}
      </p>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <PostCard key={post.slug} post={post} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-surface p-10 text-center shadow-card">
          <p className="font-semibold text-heading">No encontré artículos con esos criterios.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectTag(null);
            }}
            className="mt-3 text-sm font-medium text-accent hover:underline"
          >
            Ver todos los artículos
          </button>
        </div>
      )}
    </>
  );
}
