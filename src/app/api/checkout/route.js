import Stripe from "stripe";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "WhalerX Pro",
            },
            unit_amount: 1900,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],

      // 🔑 USER ↔ SUBSCRIPTION LINK
      metadata: {
        clerk_user_id: user.id,
        plan: "pro",
        email: user.emailAddresses[0]?.emailAddress || "",
      },

      success_url: "http://localhost:3000/dashboard",
      cancel_url: "http://localhost:3000/",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Stripe session failed" },
      { status: 500 }
    );
  }
}
