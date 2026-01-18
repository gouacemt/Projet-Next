import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Barre de navigation du dashboard */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Tableau de Bord</h1>
            <p className="text-gray-500">Connecté en tant que : <span className="font-semibold">{session.user?.email}</span></p>
          </div>
          
          <LogoutButton />
        </div>

        {/* Grille de contenu (Exemple) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Profil Utilisateur</h2>
            <p className="text-gray-600">Nom : {session.user?.name || "Non renseigné"}</p>
            <p className="text-gray-600">Email : {session.user?.email}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Statut de la session</h2>
            <p className="text-green-600 font-medium italic">Active - Sécurisée par Auth.js v5</p>
          </div>
        </div>
      </div>
    </div>
  );
}