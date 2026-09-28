import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

// Cada página aparece en español e inglés, enlazadas entre sí (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const url = site.url.replace(/\/$/, "");
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly"; lastModified?: string }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/proyectos", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sobre-mi", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contacto", priority: 0.6, changeFrequency: "yearly" },
    ...(getAllPosts().length > 0 ? [{ path: "/blog", priority: 0.8, changeFrequency: "weekly" as const }] : []),
    ...getAllPosts().map((post) => ({ path: `/blog/${post.slug}`, priority: 0.7, changeFrequency: "monthly" as const, lastModified: post.date })),
    ...getAllProjects().map((p) => ({ path: `/proyectos/${p.slug}`, priority: 0.6, changeFrequency: "monthly" as const, lastModified: p.date })),
  ];

  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${url}${localePath(lang, page.path)}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: {
          "es-MX": `${url}${localePath("es", page.path)}`,
          en: `${url}${localePath("en", page.path)}`,
        },
      },
    })),
  );
}
