import { renderOgImage, ogSize } from "@/lib/og";
import { getAllPosts } from "@/lib/posts";

export const alt = "Artículo del blog";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);
  return renderOgImage({ eyebrow: "Blog", title: post?.title ?? "Artículo" });
}
