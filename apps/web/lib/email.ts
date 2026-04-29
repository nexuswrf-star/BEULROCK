import { Resend } from "resend";

export async function sendOTPEmail(email: string, otp: string) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_test_123") {
    console.log(`[DEV] OTP for ${email}: ${otp}`);
    return { success: true };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Beulrock <noreply@beulrock.dev>",
      to: email,
      subject: "Your Beulrock Verification Code",
      html: `<div style="background:#0B0B0B;color:#fff;padding:32px;font-family:sans-serif;"><h2 style="color:#FF0000;">BEULROCK EXECUTOR</h2><p style="font-size:32px;letter-spacing:8px;color:#FF0000;">${otp}</p><p style="color:#666;">Code expires in 5 minutes.</p></div>`,
    });
    return { success: true };
  } catch (error) {
    console.error("Email failed:", error);
    return { success: false, error };
  }
}