import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } },
      { status: 401 }
    );
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: { code: "SESSION_EXPIRED", message: "Session expired" } },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      user: {
        id: payload.sub,
        email: (payload as any).email || "user@beulrock.dev",
      },
    },
  });
}