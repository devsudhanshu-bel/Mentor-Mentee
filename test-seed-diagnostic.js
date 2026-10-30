import "dotenv/config";
import hodPrisma from "./src/config/prisma.hod.js";
import { hashPassword } from "./src/utils/hash.js";

async function main() {
  console.log("Connecting...");
  await hodPrisma.$connect();

  console.log("Testing department query...");
  const department = await hodPrisma.departments.findUnique({
    where: { code: "DEMO" },
  });
  console.log("Department query succeeded:", department ? "Found" : "Not found");

  console.log("Testing password utility...");
  const hash = await hashPassword("Temporary-Diagnostic-Password-123!");
  console.log("Password hashing succeeded:", Boolean(hash));
}

main()
  .catch((error) => {
    console.error("Diagnostic failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await hodPrisma.$disconnect();
  });
