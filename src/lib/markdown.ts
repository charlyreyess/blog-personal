import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export async function renderMarkdown(content: string) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);
  return String(html);
}

// Los archivos que empiezan por "_" (plantillas) se ignoran.
export const isContentFile = (file: string) => file.endsWith(".md") && !file.startsWith("_");
export const isValidSlug = (slug: string) => /^[a-z0-9-]+$/.test(slug);
