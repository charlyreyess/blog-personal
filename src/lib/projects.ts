import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";
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
  imageFit: "cover" | "contain";
  imageBg?: string;
  logo?: string;
  url?: string;
  repo?: string;
  featured: boolean;
  order?: number;
};

export type Project = ProjectMeta & { html: string };

const optional = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

// Traducción opcional: content/proyectos/<lang>/<slug>.md sobrescribe título, descripción, rol, cliente y texto.
function readTranslation(slug: string, lang: Locale) {
  if (lang === "es") return null;
  const file = path.join(PROJECTS_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return matter(fs.readFileSync(file, "utf8"));
}

function readProjectFile(slug: string, lang: Locale = "es") {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
  const original = matter(raw);
  const traduccion = readTranslation(slug, lang);
  const data = { ...original.data, ...(traduccion?.data ?? {}) };
  const content = traduccion ? traduccion.content : original.content;
  const meta: ProjectMeta = {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    role: optional(data.role),
    client: optional(data.client),
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    image: optional(data.image),
    imageFit: data.imageFit === "contain" ? "contain" : "cover",
    imageBg: optional(data.imageBg),
    logo: findLogo(slug, optional(data.logo)),
    url: optional(data.url),
    repo: optional(data.repo),
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : undefined,
  };
  return { meta, content, draft: data.draft === true };
}

export function getAllProjects(lang: Locale = "es"): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter(isContentFile)
    .map((file) => readProjectFile(file.replace(/\.md$/, ""), lang))
    .filter((project) => !project.draft)
    .map((project) => project.meta)
    // "order" fija la posición (sin order = 50, en medio); a igual posición, destacados y luego por fecha.
    .sort(
      (a, b) =>
        (a.order ?? 50) - (b.order ?? 50) ||
        Number(b.featured) - Number(a.featured) ||
        b.date.localeCompare(a.date),
    );
}

export async function getProject(slug: string, lang: Locale = "es"): Promise<Project | null> {
  if (!isValidSlug(slug) || !fs.existsSync(path.join(PROJECTS_DIR, `${slug}.md`))) return null;
  const { meta, content } = readProjectFile(slug, lang);
  return { ...meta, html: await renderMarkdown(content) };
}
