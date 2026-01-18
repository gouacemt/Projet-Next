// Fichier : lib/auth.ts

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ========================================
        // ÉTAPE 1 : VALIDATION DES ENTRÉES
        // ========================================
        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Tentative de connexion sans email ou mot de passe");
          return null;
        }

        // ========================================
        // ÉTAPE 2 : RÉCUPÉRATION DE L'UTILISATEUR
        // ========================================
        // ✅ CORRECTION : Sélection explicite du champ password
        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email as string 
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,        // ✅ Plus d'erreur TypeScript
            emailVerified: true,
            image: true,
            createdAt: true,
          },
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
          console.error("❌ Aucun utilisateur trouvé avec cet email");
          return null;
        }

        // Vérification de la présence du mot de passe hashé
        if (!user.password) {
          console.error("❌ Utilisateur sans mot de passe (compte OAuth?)");
          return null;
        }

        // ========================================
        // ÉTAPE 3 : COMPARAISON DU MOT DE PASSE
        // ========================================
        // ✅ user.password est maintenant reconnu par TypeScript
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          console.error("❌ Mot de passe incorrect");
          return null;
        }

        // ========================================
        // ÉTAPE 4 : CONNEXION RÉUSSIE
        // ========================================
        console.log("✅ Connexion réussie pour :", user.email);
        
        // Retour de l'utilisateur SANS le password
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});