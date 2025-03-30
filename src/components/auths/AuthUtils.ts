import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

const secretKey = new TextEncoder().encode(
  process.env.APP_AUTH_KEY || "secretcode"
);

export async function encrypt(payload: JwtPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secretKey);
}

export async function decrypt(params: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(params, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function signIn(user: User) {
  const expires = new Date(Date.now() + 3600 * 10000);
  const session = await encrypt({ user, expires });

  (await cookies()).set("session", session, { expires });
}

export async function signOut() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}
export async function getSession(): Promise<JwtPayload | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  const result: JwtPayload = await decrypt(session);
  return result;
}

export async function refreshToken(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return NextResponse.redirect(new URL("/", request.url));
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    expires: parsed.expires,
  });
  return res;
}
