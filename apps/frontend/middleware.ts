import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();
  // const pathName = req.nextUrl.pathname;

  // const free = ['/signup', '/login']

  // if(free.includes(pathName)){
  //   console.log("Didnt open other");
  //   return NextResponse.next();
  // }

  // console.log(`opened ${pathName}`)
  // url.pathname = '/login';
  // return NextResponse.redirect(`${url}`);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)"
  ]
};