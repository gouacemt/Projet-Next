import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // Récupération du priceId depuis le body
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID requis" },
        { status: 400 }
      );
    }

    // Récupération de l'utilisateur connecté (optionnel mais recommandé)
    const session = await auth();
    const userId = session?.user?.id || "guest";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Utilisation du priceId dynamique
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: userId,
        priceId: priceId,
      },
      customer_email: session?.user?.email || undefined,
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