import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";
import { renderMarkdown } from "@/lib/markdown";

export type Milestone = { period: string; title: string; place?: string; description?: string };

export async function getBio(lang: Locale = "es") {
  const dir = path.join(process.cwd(), "content");
  const traducida = path.join(dir, `biografia.${lang}.md`);
  const raw = fs.readFileSync(lang !== "es" && fs.existsSync(traducida) ? traducida : path.join(dir, "biografia.md"), "utf8");
  const { data, content } = matter(raw);
  const timeline: Milestone[] = Array.isArray(data.timeline)
    ? data.timeline.map((item: Record<string, unknown>) => ({
        period: String(item.period ?? ""),
        title: String(item.title ?? ""),
        place: item.place ? String(item.place) : undefined,
        description: item.description ? String(item.description) : undefined,
      }))
    : [];
  return { html: await renderMarkdown(content), timeline };
}
