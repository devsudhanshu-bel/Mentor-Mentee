import "dotenv/config";
import hodPrisma from "./src/config/prisma.hod.js";

async function main() {
  console.log("NEW_DATABASE_URL loaded:", Boolean(process.env.NEW_DATABASE_URL));

  await hodPrisma.$connect();
  console.log("Prisma connected successfully.");

  const count = await hodPrisma.departments.count();
  console.log("Department count:", count);

  const department = await hodPrisma.departments.findUnique({
    where: { code: "DEMO" },
  });
  console.log("DEMO department:", department ? "Found" : "Not found");
}

main()
  .catch((error) => {
    console.error("Prisma diagnostic failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await hodPrisma.$disconnect();
  });
