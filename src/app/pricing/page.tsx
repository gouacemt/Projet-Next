"use client"; // Obligatoire pour utiliser le onClick

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // On appelle ton API de checkout
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        // Redirection vers la page sécurisée de Stripe
        window.location.href = data.url;
      } else {
        console.error("Erreur: Pas d'URL de retour", data);
        alert("Erreur lors de la création de la session Stripe");
      }
    } catch (error) {
      console.error("Erreur lors du checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Pricing</h1>

      <Card className="p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-2">Plan Pro</h2>
        <p className="mb-4 text-muted-foreground">Accès complet à l’application</p>
        <p className="text-2xl font-bold mb-4">9€ / mois</p>

        <Button 
          onClick={handleCheckout} 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "S’abonner"}
        </Button>
      </Card>
    </main>
  );
}