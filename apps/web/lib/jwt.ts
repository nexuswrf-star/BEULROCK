import { SignJWT, jwtVerify } from "jose";

const getSecret = () =>
  new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");

export async function createAccessToken(userId: string) {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(getSecret());
}

export async function createRefreshToken(userId: string) {
  return new SignJWT({ sub: userId, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}