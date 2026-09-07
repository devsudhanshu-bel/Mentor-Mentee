import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "../../prisma/schema.hod.prisma",

  migrations: {
    path: "../../prisma/migrations-hod",
  },

  engine: "classic",

  datasource: {
    url: env("NEW_DATABASE_URL"),
  },
});