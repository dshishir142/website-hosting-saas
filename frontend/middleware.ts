import { NextResponse } from "next/server";

export async function middleware(req: Request) {
    const hostName = req.headers.get('host') || "";
    const parts = hostName?.split(".");
    const subdomain = parts?.length > 1 ? parts[0] : null;
    console.log(hostName);
    if (subdomain != "" || null) {
        return NextResponse.redirect('http://localhost:3000/dashboard')
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};