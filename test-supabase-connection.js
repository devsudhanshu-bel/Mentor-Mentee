import "dotenv/config";

const url = process.env.NEW_DATABASE_URL;

if (!url) {
  console.error("NEW_DATABASE_URL is missing.");
  process.exit(1);
}

try {
  const parsed = new URL(url);

  console.log("Environment URL loaded:", true);
  console.log("Host:", parsed.hostname);
  console.log("Port:", parsed.port || "5432");
  console.log("Username:", decodeURIComponent(parsed.username));
  console.log("Password present:", Boolean(parsed.password));
} catch {
  console.error("NEW_DATABASE_URL is not a valid URL.");
  process.exit(1);
}

const { default: prisma } = await import("./src/config/prisma.hod.js");

try {
  await prisma.$connect();
  console.log("DATABASE CONNECTION SUCCESS");
  console.log("Department count:", await prisma.departments.count());
} catch (error) {
  console.error("Connection failed:", error.message);
} finally {
  await prisma.$disconnect();
}
