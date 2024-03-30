import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: "/",
};

export function middleware(request: NextRequest) {
    console.log("middle");
    return NextResponse.redirect(new URL("/", request.url));
}
