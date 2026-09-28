import type { Metadata, Viewport } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { hasLocale, htmlLang, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/metadata";
import { getAllPosts } from "@/lib/posts";
import { getSite } from "@/lib/site";
import "../globals.css";

const sans = Poppins({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const site = getSite(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
    description: site.tagline,
    authors: [{ name: site.name }],
    alternates: alternates(lang, "/"),
    openGraph: { type: "website", locale: ogLocale[lang], siteName: site.name },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const showBlog = getAllPosts().length > 0;

  return (
    <html lang={htmlLang[lang]} className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          {t.nav.skip}
        </a>
        <Header lang={lang} showBlog={showBlog} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} showBlog={showBlog} />
        <BackToTop label={t.nav.backToTop} />
      </body>
    </html>
  );
}
