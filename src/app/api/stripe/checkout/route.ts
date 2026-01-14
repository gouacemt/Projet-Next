import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          // Utilisation de "as string" en minuscule
          price: process.env.STRIPE_PRO_PRICE_ID as string, 
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: "ID_UTILISATEUR_TEST",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });

} catch (error: any) {
  console.error("STRIPE_ERROR:", error);

  return NextResponse.json(
    { error: error.message || "Internal Error" },
    { status: 500 }
  );
}
}