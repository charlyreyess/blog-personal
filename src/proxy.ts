import { NextResponse, type NextRequest } from "next/server";

// Idiomas por ruta: el español vive en la raíz (/proyectos) y el inglés con prefijo (/en/proyectos).
// Internamente todas las páginas están en app/[lang], así que las rutas sin prefijo se reescriben a /es.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /es/... es la misma página que la raíz: redirigimos para no duplicar URLs.
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo excepto la API, los archivos internos de Next.js y los archivos con extensión (imágenes, sitemap.xml…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
