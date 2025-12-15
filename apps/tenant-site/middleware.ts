import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest){

    const hostName = req.headers.get('host') || '';
    const subdomain = hostName.split('.')[0];

    const parentAppUrl = process.env.NEXT_PUBLIC_PARENT_APP_URL
    
    if(subdomain && subdomain != hostName && subdomain != 'www' ){
        console.log(`${subdomain}`);
        return NextResponse.next();
    }

    return NextResponse.redirect(`${parentAppUrl}`);
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico).*)"
  ]
};
