import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // =====================================================
  // 1. LOGGER
  // =====================================================

  if (pathname.startsWith("/api/")) {
    const waktu = new Date().toISOString();

    console.log(
      `[${waktu}] ${request.method} ${pathname}`
    );
  }

  // =====================================================
  // 2. MAINTENANCE MODE
  // =====================================================

  const isMaintenance =
    process.env.MAINTENANCE_MODE === "true";

  const isMaintenancePage =
    pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(
      new URL("/maintenance", request.url)
    );
  }

  // =====================================================
  // 3. AUTH GUARD
  // =====================================================

  if (pathname === "/favorites") {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }
  }

  // =====================================================
  // 4. LANJUTKAN REQUEST
  // =====================================================

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
}; 