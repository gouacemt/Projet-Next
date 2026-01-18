"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
        <div className="text-center max-w-4xl">

          <h1 className="text-6xl font-bold mb-6">
            <span className="text-blue-600">Organisez vos projets</span>
            <br />
            en toute simplicité
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            TaskFlow vous aide à gérer vos projets, suivre vos tâches et collaborer avec votre équipe efficacement.
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <Button asChild size="lg">
              <Link href="/register">
                Commencer gratuitement
                <ArrowRight className="ml-2" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">Voir les tarifs</Link>
            </Button>
          </div>

          <div className="flex gap-6 justify-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              <span>Gratuit pour démarrer</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              <span>Sans engagement</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600">
              Des fonctionnalités puissantes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border rounded-2xl hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gestion Simplifiée</h3>
              <p className="text-gray-600">
                Créez et organisez vos projets en quelques clics. Interface intuitive et rapide.
              </p>
            </div>

            <div className="p-8 border rounded-2xl hover:shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Données Sécurisées</h3>
              <p className="text-gray-600">
                Vos projets sont protégés avec un chiffrement de niveau bancaire.
              </p>
            </div>

            <div className="p-8 border rounded-2xl hover:shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-gray-600">
                Travaillez en équipe et suivez l'avancement de vos projets en temps réel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid md:grid-cols-3 gap-12 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg">Utilisateurs actifs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-lg">Projets créés</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-lg">Uptime garanti</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto p-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à démarrer ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers d'utilisateurs.
          </p>
          <Button asChild size="lg">
            <Link href="/register">
              Créer un compte gratuitement
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Aucune carte bancaire requise
          </p>
        </div>
      </section>
    </main>
  );
}