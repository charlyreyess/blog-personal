import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post, lang }: { post: PostMeta; lang: Locale }) {
  return (
    <article className="reveal group relative flex flex-col rounded-lg border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent/40">
      <p className="flex flex-wrap gap-2 text-xs font-medium">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-accent-soft px-2.5 py-1 text-accent">
            {tag}
          </span>
        ))}
      </p>
      <h3 className="mt-4 text-xl leading-snug font-semibold text-balance text-heading transition-colors group-hover:text-accent">
        <Link href={localePath(lang, `/blog/${post.slug}`)} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-pretty text-muted">{post.description}</p>
      <p className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
        <span>{post.readingTime} {getDictionary(lang).blog.readingTime}</span>
      </p>
    </article>
  );
}
