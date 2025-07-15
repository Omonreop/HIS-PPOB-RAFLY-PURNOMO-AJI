import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname, search } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  const isProtectedPage = pathname === "/";

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedPage && !token) {
    const loginUrl = new URL("/auth/login", request.url);

    const relativeCallback = pathname + search;

    if (!request.nextUrl.searchParams.has("callbackUrl")) {
      loginUrl.searchParams.set("callbackUrl", relativeCallback);
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
