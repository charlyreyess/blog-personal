import { renderOgImage, ogSize } from "@/lib/og";
import { getAllProjects } from "@/lib/projects";

export const alt = "Proyecto del portafolio";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getAllProjects().find((item) => item.slug === slug);
  return renderOgImage({ eyebrow: "Proyecto", title: project?.title ?? "Proyecto" });
}
