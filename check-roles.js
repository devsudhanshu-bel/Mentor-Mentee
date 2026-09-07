import "dotenv/config";
import { PrismaClient } from "./src/generated/prisma-hod/index.js";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NEW_DATABASE_URL,
    },
  },
});

try {
  const roles = await prisma.user_accounts.groupBy({
    by: ["role"],
    _count: {
      _all: true,
    },
  });

  console.table(roles);
} catch (error) {
  console.error("ERROR:", error);
} finally {
  await prisma.$disconnect();
}