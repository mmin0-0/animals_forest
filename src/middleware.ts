import { auth } from "./auth"
import {NextResponse} from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/i/flow/login`);
  }
}

export const config = {
  matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
}