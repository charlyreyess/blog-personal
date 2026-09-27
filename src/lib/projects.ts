import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isContentFile, isValidSlug, renderMarkdown } from "@/lib/markdown";

const PROJECTS_DIR = path.join(process.cwd(), "content", "proyectos");
const LOGOS_DIR = path.join(process.cwd(), "public", "proyectos", "logos");

// Logo: el indicado en el encabezado o, si no, public/proyectos/logos/<slug>.(svg|png|webp|jpg)
function findLogo(slug: string, explicit?: string) {
  if (explicit) return explicit;
  const ext = ["svg", "png", "webp", "jpg"].find((e) => fs.existsSync(path.join(LOGOS_DIR, `${slug}.${e}`)));
  return ext ? `/proyectos/logos/${slug}.${ext}` : undefined;
}

export type ProjectMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  role?: string;
  client?: string;
  stack: string[];
  image?: string;
  logo?: string;
  url?: string;
  repo?: string;
  featured: boolean;
  order?: number;
};

export type Project = ProjectMeta & { html: string };

const optional = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

function readProjectFile(slug: string) {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const meta: ProjectMeta = {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    role: optional(data.role),
    client: optional(data.client),
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    image: optional(data.image),
    logo: findLogo(slug, optional(data.logo)),
    url: optional(data.url),
    repo: optional(data.repo),
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : undefined,
  };
  return { meta, content, draft: data.draft === true };
}

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter(isContentFile)
    .map((file) => readProjectFile(file.replace(/\.md$/, "")))
    .filter((project) => !project.draft)
    .map((project) => project.meta)
    // Primero los que tienen "order" (1, 2, 3…), luego los destacados y después por fecha.
    .sort(
      (a, b) =>
        (a.order ?? Infinity) - (b.order ?? Infinity) ||
        Number(b.featured) - Number(a.featured) ||
        b.date.localeCompare(a.date),
    );
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!isValidSlug(slug) || !fs.existsSync(path.join(PROJECTS_DIR, `${slug}.md`))) return null;
  const { meta, content } = readProjectFile(slug);
  return { ...meta, html: await renderMarkdown(content) };
}
