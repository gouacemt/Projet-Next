import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY manquante');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore - On force TS à ignorer la vérification de version si elle bloque
  apiVersion: '2024-12-18.acacia', 
  typescript: true,
});