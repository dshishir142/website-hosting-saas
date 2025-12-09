import axios from "axios";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";
  const pathname = url.pathname;

  const parts = hostname.split(".");
  const subdomain = parts.length > 1 ? parts[0] : null;
  const reserved = ["localhost", "www", "admin"];

  if (!subdomain || reserved.includes(subdomain)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tenant/check/${subdomain}`);
  console.log(res.data);

  if (res.data.status == 'error') {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/((?!dashboard|settings|profile|api|_next|favicon.ico).*)"
  ],
};
