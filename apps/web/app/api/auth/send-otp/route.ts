import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { sendOTPEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validasi email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_EMAIL", message: "Invalid email address" } },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const ipRate = await checkRateLimit(`rate:ip:${ip}`, 5, 600);
    if (!ipRate.allowed) {
      return NextResponse.json(
        { success: false, error: { code: "RATE_LIMITED", message: "Too many requests. Please wait." } },
        { status: 429 }
      );
    }

    // Rate limit per email
    const emailRate = await checkRateLimit(`rate:email:${normalizedEmail}`, 3, 600);
    if (!emailRate.allowed) {
      return NextResponse.json(
        { success: false, error: { code: "RATE_LIMITED", message: "Too many OTP requests for this email." } },
        { status: 429 }
      );
    }

    // Cek cooldown resend
    const cooldown = await redis.get(`resend:${normalizedEmail}`);
    if (cooldown) {
      const remaining = await redis.ttl(`resend:${normalizedEmail}`);
      return NextResponse.json(
        { success: false, error: { code: "COOLDOWN", message: `Please wait ${remaining} seconds before requesting a new code.` } },
        { status: 429 }
      );
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Simpan OTP di Redis (5 menit)
    await redis.set(`otp:${normalizedEmail}`, hashedOTP, "EX", 300);
    await redis.set(`otp_attempts:${normalizedEmail}`, "0", "EX", 300);
    await redis.set(`resend:${normalizedEmail}`, "1", "EX", 60);

    // Kirim email (non-blocking)
    sendOTPEmail(normalizedEmail, otp);

    return NextResponse.json({
      success: true,
      data: { message: "Verification code sent to your email." },
    });
  } catch (error) {
    console.error("send-otp error:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Something went wrong." } },
      { status: 500 }
    );
  }
}