import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyCookie } from "./actions/auth.actions";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/sign-in";
  try {
    console.log("Middleware is running...........");
    const cookie = req.cookies.get("session")?.value;

    if (!cookie) return NextResponse.redirect(url);

    return NextResponse.next();

  } catch (error) {
    console.log("fb error", error);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/"],
  runtime: "edge",
};
