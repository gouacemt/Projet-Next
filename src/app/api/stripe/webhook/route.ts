import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // Quand un abonnement est créé
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.upsert({
          where: { stripeSubscriptionId: subscription.id },
          create: {
            stripeSubscriptionId: subscription.id,
            userId: subscription.metadata.userId,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCustomerId: subscription.customer as string,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
          update: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });
        break;
      }

      // Quand une facture est payée
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          await prisma.invoice.create({
            data: {
              stripeInvoiceId: invoice.id,
              userId: invoice.metadata?.userId || "",
              amount: invoice.amount_paid,
              currency: invoice.currency,
              status: "paid",
              hostedInvoiceUrl: invoice.hosted_invoice_url,
              invoicePdf: invoice.invoice_pdf,
            },
          });
        }
        break;
      }

      // Quand un abonnement est annulé
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "canceled" },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}