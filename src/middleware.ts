import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validateSessionToken } from "./app/lib/auth";

const protectedRoutes = ["/pokemon", "/posts", "/practice"];
const publicRoutes = ["/login", "/signup", "/"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const sessionToken = (await cookies()).get("sessionToken")?.value;

  if (isPublicRoute) return NextResponse.next();

  if (isProtectedRoute) {
    if (!sessionToken)
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    return NextResponse.next();
  }
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
