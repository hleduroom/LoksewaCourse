import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const IS_ADMIN_ROUTE = pathname.startsWith("/admin");
  const IS_PROTECTED_ROUTE = pathname.startsWith("/student");
  const Is_COURSE_ROUTE = pathname.startsWith("/courses");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (IS_ADMIN_ROUTE) {
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (IS_PROTECTED_ROUTE && !session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (Is_COURSE_ROUTE && !session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
