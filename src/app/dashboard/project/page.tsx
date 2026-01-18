import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, TrendingUp, Zap } from "lucide-react";

export default async function DashboardPage() {
  // Protection de la route
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Bienvenue, {session.user?.name?.split(' ')[0] || session.user?.email} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Voici un aperçu de vos projets et activités
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/api/auth/signout">Se déconnecter</a>
          </Button>
        </div>

        {/* Statistiques en cartes */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Projets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">3</p>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                <TrendingUp className="inline h-3 w-3" /> +2 ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Tâches Complétées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">18</p>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Sur 25 tâches totales</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                En Cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">7</p>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <p className="text-xs text-orange-600 mt-2">3 à terminer aujourd'hui</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Abonnement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">Free</span>
                <Button size="sm" asChild>
                  <a href="/pricing">Upgrader</a>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Passez au plan Pro
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Section projets et activité */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Projets récents */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projets Récents</CardTitle>
              <Button size="sm">+ Nouveau Projet</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <p className="font-semibold">Refonte site web</p>
                    <p className="text-xs text-gray-500">5 tâches • 80% complété</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Voir</Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Application mobile</p>
                    <p className="text-xs text-gray-500">12 tâches • 45% complété</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Voir</Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-semibold">Marketing Q1 2026</p>
                    <p className="text-xs text-gray-500">8 tâches • 25% complété</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Voir</Button>
              </div>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Tâche complétée</p>
                  <p className="text-xs text-gray-500">Design homepage - Il y a 2h</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Nouveau projet</p>
                  <p className="text-xs text-gray-500">Application mobile - Il y a 5h</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Commentaire ajouté</p>
                  <p className="text-xs text-gray-500">Refonte site - Hier</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Tâche assignée</p>
                  <p className="text-xs text-gray-500">Marketing - Il y a 2j</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to action Pro */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  Besoin de plus de fonctionnalités ?
                </h3>
                <p className="text-sm text-gray-600">
                  Passez au plan Pro pour projets illimités et collaboration d'équipe
                </p>
              </div>
              <Button asChild size="lg">
                <a href="/pricing">Découvrir Pro →</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}