<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
=======
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Ici, on "injecte" l'URL pour remplacer celle qu'on a supprimée du schéma
export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL, 
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
>>>>>>> origin/feat/stripe-payments
