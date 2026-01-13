import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm p-6">
        <h1 className="text-xl font-bold mb-4">Inscription</h1>

        <div className="space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Mot de passe" />

          <Button className="w-full">Créer un compte</Button>
        </div>

        <p className="text-sm text-center mt-4">
          Déjà un compte ?{" "}
          <Link href="/login" className="underline">
            Se connecter
          </Link>
        </p>
      </Card>
    </main>
  );
}
