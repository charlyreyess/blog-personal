import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isContentFile, isValidSlug, renderMarkdown } from "@/lib/markdown";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
};

export type Heading = { id: string; text: string };
export type Post = PostMeta & { html: string; headings: Heading[] };

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function readPostFile(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: readingTime(content),
  };
  return { meta, content, draft: data.draft === true };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(isContentFile)
    .map((file) => readPostFile(file.replace(/\.md$/, "")))
    .filter((post) => !post.draft)
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.tags))].sort();
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isValidSlug(slug) || !fs.existsSync(path.join(POSTS_DIR, `${slug}.md`))) {
    return null;
  }
  const { meta, content } = readPostFile(slug);
  const html = await renderMarkdown(content);
  const headings = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map(([, id, inner]) => ({
    id,
    text: inner.replace(/<[^>]+>/g, "").replace(/&#x26;|&amp;/g, "&"),
  }));
  return { ...meta, html, headings };
}


// Anterior/siguiente por fecha y artículos relacionados.
export function getPostNeighbors(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  const current = posts[index];
  // Primero los que comparten más etiquetas; si no hay, los más recientes.
  const related = posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: post.tags.filter((tag) => current?.tags.includes(tag)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ post }) => post);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
    related,
  };
}
