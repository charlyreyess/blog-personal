import type { Locale } from "@/i18n/config";
import { renderOgImage, ogSize } from "@/lib/og";
import { getSite, site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const s = getSite((await params).lang as Locale);
  return renderOgImage({ eyebrow: `${s.role} · ${s.location}`, title: s.headline });
}
