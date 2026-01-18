import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,

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
        // Validation des entrées
        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Email ou mot de passe manquant");
          return null;
        }

        // Récupération de l'utilisateur avec le password
        const user = await prisma.user.findUnique({
          where: { 
            email: credentials.email as string 
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            emailVerified: true,
            image: true,
          },
        });

        // Vérification de l'existence
        if (!user) {
          console.error("❌ Utilisateur introuvable");
          return null;
        }

        // Vérification du password (pour éviter les comptes OAuth)
        if (!user.password) {
          console.error("❌ Compte sans mot de passe");
          return null;
        }

        // Comparaison du mot de passe
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          console.error("❌ Mot de passe incorrect");
          return null;
        }

        console.log("✅ Connexion réussie:", user.email);

        // Retour sans le password
        return {
          id: user.id,
          email: user.email!,
          name: user.name || null,
          emailVerified: user.emailVerified || null,
          image: user.image || null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
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