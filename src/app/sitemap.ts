import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/proyectos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/sobre-mi`, changeFrequency: "monthly", priority: 0.5 },
    ...getAllPosts().map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.date,
      priority: 0.7,
    })),
    ...getAllProjects().map((project) => ({
      url: `${site.url}/proyectos/${project.slug}`,
      lastModified: project.date,
      priority: 0.6,
    })),
  ];
}
