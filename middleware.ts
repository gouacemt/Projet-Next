import { auth } from "@/lib/auth"; // <-- Chemin corrigé
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                     req.nextUrl.pathname.startsWith("/register");

  // Si l'utilisateur est sur une page d'auth et déjà connecté
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
  if (!isAuthPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/api/auth/:path*"],
};