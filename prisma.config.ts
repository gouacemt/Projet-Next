import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config(); // ← charge les variables du .env

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
