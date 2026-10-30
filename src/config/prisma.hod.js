
import "dotenv/config";
import fs from "node:fs";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma-hod/index.js";

const { Pool } = pg;
const globalForPrisma = globalThis;

const databaseUrl = process.env.NEW_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("NEW_DATABASE_URL is missing from .env");
}

const url = new URL(databaseUrl);

// Configure TLS explicitly instead of allowing URL options to override it.
url.searchParams.delete("sslmode");
url.searchParams.delete("sslrootcert");
url.searchParams.delete("ssl");
url.searchParams.delete("uselibpqcompat");

const caPath = new URL("../../prod-ca-2021.crt", import.meta.url);
const ca = fs.readFileSync(caPath, "utf8");

const hodPrisma =
  globalForPrisma.hodPrisma ??
  (() => {
    const pool = new Pool({
      connectionString: url.toString(),
      ssl: {
        ca,
        rejectUnauthorized: true,
      },
      max: 3,
      connectionTimeoutMillis: 20000,
    });

    pool.on("error", (error) => {
      console.error("PostgreSQL pool error:", error.message);
    });

    return new PrismaClient({
      adapter: new PrismaPg(pool),
      log: ["error", "warn"],
    });
  })();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.hodPrisma = hodPrisma;
}

export default hodPrisma;
