import hodPrisma from "./src/config/prisma.hod.js";

async function checkUsers() {
  try {
    const users = await hodPrisma.user_accounts.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    console.table(users);
    console.log(`\nTotal users: ${users.length}`);
  } catch (error) {
    console.error("❌ Failed to fetch auth users:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await hodPrisma.$disconnect();
  }
}

checkUsers();
