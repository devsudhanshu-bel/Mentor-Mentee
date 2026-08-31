import { defineConfig } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "../../prisma/schema.hod.prisma",
  migrations: {
    path: "../../prisma/migrations-hod",
  },
  datasource: {
    url: process.env.NEW_DATABASE_URL!,
  },
});