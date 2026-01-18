import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenue sur SaaS Mini App
      </h1>

      <p className="mb-6 text-muted-foreground">
        Une mini application SaaS pour gérer vos projets simplement.
      </p>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/pricing">Voir les prix</Link>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
      </div>
    </main>
  );
}
