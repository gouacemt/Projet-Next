import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Pricing</h1>

      <Card className="p-6 max-w-sm">
        <h2 className="text-xl font-semibold mb-2">Plan Pro</h2>
        <p className="mb-4">Accès complet à l’application</p>
        <p className="text-2xl font-bold mb-4">9€ / mois</p>

        <Button>S’abonner</Button>
      </Card>
    </main>
  );
}
