import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { clerk_user_id } = await req.json();

    if (!clerk_user_id) {
      return NextResponse.json(
        { error: "Missing clerk_user_id" },
        { status: 400 }
      );
    }

    const user = await clerkClient.users.getUser(clerk_user_id);

    const plan = user.publicMetadata?.plan || "free";

    return NextResponse.json({ plan });
  } catch (err) {
    console.error("Plan lookup failed:", err);
    return NextResponse.json(
      { error: "Plan lookup failed" },
      { status: 500 }
    );
  }
}
