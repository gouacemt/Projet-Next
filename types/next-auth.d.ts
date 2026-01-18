import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    password?: string | null; // ← AJOUT DU CHAMP PASSWORD
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    id: string;
    email: string;
    emailVerified: Date | null;
    password?: string | null; // ← AJOUT DU CHAMP PASSWORD
  }
}