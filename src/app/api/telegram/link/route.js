import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  // 🔑 Generate short one-time link code
  const linkCode = crypto.randomBytes(4).toString("hex");

  // TEMP STORAGE (we'll move this later)
  // For now we return it to prove the flow
  return NextResponse.json({
    link_code: linkCode,
    clerk_user_id: user.id,
  });
}
