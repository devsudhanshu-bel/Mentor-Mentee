import { PrismaClient } from "../generated/prisma-hod/index.js";

const globalForPrisma = globalThis;

const hodPrisma =
  globalForPrisma.hodPrisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.NEW_DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.hodPrisma = hodPrisma;
}

export default hodPrisma;
