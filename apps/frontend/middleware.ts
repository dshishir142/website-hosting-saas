import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathName = req.nextUrl.pathname;
  const cookieToken = req.cookies.get('token');

  const free = ['/signup', '/login']

  if (free.includes(pathName)) {
    return NextResponse.next();
  }

  if (!cookieToken) {
    url.pathname = '/login';
    return NextResponse.redirect(`${url}`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)"
  ]
};