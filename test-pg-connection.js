import "dotenv/config";
import pg from "pg";
import fs from "node:fs";

const { Client } = pg;
const url = new URL(process.env.NEW_DATABASE_URL);

// Keep SSL configuration explicit rather than overriding it via URL parameters.
url.searchParams.delete("sslmode");
url.searchParams.delete("sslrootcert");
console.log("Password length:", decodeURIComponent(url.password).length);
console.log("Password URL-encoding check:", (() => {
  try {
    return encodeURIComponent(decodeURIComponent(url.password)) === url.password;
  } catch {
    return false;
  }
})());
const client = new Client({
  connectionString: url.toString(),
  ssl: {
    ca: fs.readFileSync("./prod-ca-2021.crt", "utf8"),
    rejectUnauthorized: true,
  },
  connectionTimeoutMillis: 15000,
});

try {
  await client.connect();
  console.log("POSTGRES CONNECTION SUCCESS");

  const result = await client.query(
    "SELECT current_database() AS database, current_user AS username",
  );

  console.log(result.rows[0]);
} catch (error) {
  console.error("POSTGRES CONNECTION FAILED");
  console.error("Code:", error.code ?? "Not provided");
  console.error("Message:", error.message);
} finally {
  await client.end().catch(() => {});
}
console.log("Host:", url.hostname);
console.log("Username:", decodeURIComponent(url.username));
console.log("Database:", url.pathname);
