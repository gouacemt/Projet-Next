"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const plans = [
  {
    priceId: "price_1Spr2GEcoWfZo0Z51imsqEJ7",
    name: "Plan Gratuit",
    price: "0€",
    period: "Gratuit",
    description: "Pour découvrir l'application",
    features: [
      "Accès de base",
      "1 projet",
      "Support communautaire",
    ],
    buttonText: "Commencer",
    isFree: true,
  },
  {
    priceId: "price_1SpqylEcoWfZo0Z5kV698yPR",
    name: "Plan Pro",
    price: "9€",
    period: "/ mois",
    description: "Accès complet à l'application",
    features: [
      "Projets illimités",
      "Toutes les fonctionnalités",
      "Support prioritaire",
      "Exports avancés",
    ],
    buttonText: "S'abonner",
    popular: true,
  },
  {
    priceId: "price_1SpqylEcoWfZo0Z5twilHt6ci",
    name: "Plan Entreprise",
    price: "29€",
    period: "/ mois",
    description: "Pour les équipes",
    features: [
      "Tout du Plan Pro",
      "Utilisateurs illimités",
      "API Access",
      "Support dédié 24/7",
    ],
    buttonText: "S'abonner",
  },
];

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, isFree: boolean = false) => {
    // Tous les plans redirigent vers la page de connexion
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-gray-600">
            Des tarifs simples et transparents pour tous
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.priceId}
              className={`p-6 relative ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-xl scale-105"
                  : "border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Populaire
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCheckout(plan.priceId, plan.isFree)}
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                disabled={isLoading === plan.priceId}
              >
                {isLoading === plan.priceId ? "Chargement..." : plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}