import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mon Compte</h1>
        <p className="text-gray-600 mt-1">
          Gérez vos informations personnelles
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle>Informations Personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Nom
              </label>
              <p className="text-lg">{session.user?.name || "Non renseigné"}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Email
              </label>
              <p className="text-lg">{session.user?.email}</p>
            </div>
            <div>
                <label className="text-sm font-semibold text-gray-600">Email vérifié</label>
                    <p className="text-lg">
                        {(session.user as any)?.emailVerified ? (
                        <span className="text-green-600">✓ Vérifié</span>
                        ) : (
                        <span className="text-orange-600">Non vérifié</span>
                        )}
                     </p>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Modifier mes informations
            </Button>
          </CardContent>
        </Card>

        {/* Sécurité */}
        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Mot de passe
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Dernière modification : Inconnue
              </p>
              <Button variant="outline" className="w-full">
                Changer le mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Abonnement */}
        <Card>
          <CardHeader>
            <CardTitle>Abonnement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Plan actuel
              </label>
              <p className="text-2xl font-bold mb-2">Free</p>
              <p className="text-sm text-gray-500 mb-4">
                Passez au plan Pro pour débloquer toutes les fonctionnalités
              </p>
              <Button asChild className="w-full">
                <a href="/pricing">Upgrader vers Pro</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zone de Danger</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Supprimer mon compte
              </label>
              <p className="text-sm text-gray-500 mb-3">
                Cette action est irréversible. Toutes vos données seront
                supprimées définitivement.
              </p>
              <form action="/api/account/delete" method="POST">
                <Button variant="destructive" className="w-full" type="submit">
                  Supprimer mon compte
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}