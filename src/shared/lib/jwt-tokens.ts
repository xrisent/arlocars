import { SignJWT, jwtVerify } from "jose";

import { getJwtAccessSecret, getJwtRefreshSecret } from "@/shared/config/env";

const ACCESS_TTL = "15m";
const REFRESH_TTL = "7d";

export interface AccessPayload {
  sub: number;
  isAdmin: boolean;
}

export async function signAccessToken(payload: AccessPayload): Promise<string> {
  return new SignJWT({ isAdmin: payload.isAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(payload.sub))
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .sign(getJwtAccessSecret());
}

export async function signRefreshToken(userId: number): Promise<string> {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(REFRESH_TTL)
    .sign(getJwtRefreshSecret());
}

export async function verifyAccessToken(token: string): Promise<AccessPayload> {
  const { payload } = await jwtVerify(token, getJwtAccessSecret());
  const sub = Number(payload.sub);
  if (!Number.isFinite(sub)) {
    throw new Error("Invalid token subject");
  }
  return {
    sub,
    isAdmin: Boolean(payload.isAdmin),
  };
}

export async function verifyRefreshToken(token: string): Promise<number> {
  const { payload } = await jwtVerify(token, getJwtRefreshSecret());
  const sub = Number(payload.sub);
  if (!Number.isFinite(sub)) {
    throw new Error("Invalid refresh token subject");
  }
  return sub;
}
