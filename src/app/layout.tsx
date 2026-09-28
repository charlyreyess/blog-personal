import type { Metadata, Viewport } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { themeScript } from "@/components/theme-toggle";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Poppins({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
  authors: [{ name: site.name }],
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { type: "website", locale: site.locale, siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171a31" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const showBlog = getAllPosts().length > 0;
  return (
    <html lang="es-MX" className={`${sans.variable} ${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Saltar al contenido
        </a>
        <Header showBlog={showBlog} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer showBlog={showBlog} />
        <BackToTop />
      </body>
    </html>
  );
}
