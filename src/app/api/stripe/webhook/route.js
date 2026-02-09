import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const event = await req.json();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.clerk_user_id;
        const plan = session.metadata?.plan;

        if (!userId || !plan) {
          console.error("Missing metadata:", session.metadata);
          break;
        }

        // 🔑 UPDATE USER PLAN IN CLERK
        await clerkClient.users.updateUser(userId, {
          publicMetadata: {
            plan: plan,
          },
        });

        console.log(`✅ User ${userId} upgraded to ${plan}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("❌ Subscription cancelled:", subscription.id);
        // (We’ll downgrade later if needed)
        break;
      }

      default:
        console.log("Unhandled event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
