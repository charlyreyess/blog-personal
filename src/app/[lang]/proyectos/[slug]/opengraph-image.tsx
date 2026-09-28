import { assertLocale, defaultLocale, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { renderOgImage, ogSize } from "@/lib/og";
import { getAllProjects } from "@/lib/projects";

export const alt = "Proyecto · Project";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  return getAllProjects(hasLocale(params.lang) ? params.lang : defaultLocale).map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: l, slug } = await params;
  const lang = assertLocale(l);
  const t = getDictionary(lang).projects;
  const project = getAllProjects(lang).find((item) => item.slug === slug);
  return renderOgImage({ eyebrow: t.ogEyebrow, title: project?.title ?? t.ogEyebrow });
}
