import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { createAccessToken, createRefreshToken } from "@/lib/jwt";
import { checkRateLimit } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code || code.length !== 6) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_INPUT", message: "Invalid email or code." } },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit verify attempts
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const ipRate = await checkRateLimit(`verify:ip:${ip}`, 10, 300);
    if (!ipRate.allowed) {
      return NextResponse.json(
        { success: false, error: { code: "RATE_LIMITED", message: "Too many verification attempts." } },
        { status: 429 }
      );
    }

    // Cek OTP attempts
    const attempts = parseInt((await redis.get(`otp_attempts:${normalizedEmail}`)) || "0");
    if (attempts >= 5) {
      await redis.del(`otp:${normalizedEmail}`);
      return NextResponse.json(
        { success: false, error: { code: "MAX_ATTEMPTS", message: "Too many attempts. Request a new code." } },
        { status: 400 }
      );
    }

    // Ambil OTP dari Redis
    const hashedOTP = await redis.get(`otp:${normalizedEmail}`);
    if (!hashedOTP) {
      return NextResponse.json(
        { success: false, error: { code: "OTP_EXPIRED", message: "Code expired. Request a new one." } },
        { status: 400 }
      );
    }

    // Verifikasi OTP
    const isValid = await bcrypt.compare(code, hashedOTP);
    if (!isValid) {
      await redis.incr(`otp_attempts:${normalizedEmail}`);
      return NextResponse.json(
        { success: false, error: { code: "OTP_INVALID", message: "Invalid verification code." } },
        { status: 400 }
      );
    }

    // OTP valid - hapus dari Redis
    await redis.del(`otp:${normalizedEmail}`);
    await redis.del(`otp_attempts:${normalizedEmail}`);
    await redis.del(`resend:${normalizedEmail}`);

    // Cari atau buat user (simpel, tanpa database dulu)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Generate tokens
    const accessToken = await createAccessToken(userId);
    const refreshToken = await createRefreshToken(userId);

    // Set cookies
    const cookieStore = cookies();
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 900, // 15 menit
    });
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 604800, // 7 hari
    });

    return NextResponse.json({
      success: true,
      data: {
        user: { id: userId, email: normalizedEmail },
      },
    });
  } catch (error) {
    console.error("verify-otp error:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } },
      { status: 500 }
    );
  }
}