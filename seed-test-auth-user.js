import "dotenv/config";
import { randomUUID } from "crypto";
import hodPrisma from "./src/config/prisma.hod.js";
import { hashPassword } from "./src/utils/hash.js";

async function seedTestUser() {
  try {
    const password = "Password@123";
    const hashedPassword = await hashPassword(password);

    const user = await hodPrisma.user_accounts.create({
      data: {
        id: randomUUID(),
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    console.log("\n✅ Test auth user created:");
    console.table([user]);

    console.log("\nLogin credentials:");
    console.log("Email    : admin@gmail.com");
    console.log("Password : Password@123");
    console.log("Role     : ADMIN (HOD)");
  } catch (error) {
    console.error("\n❌ Failed to create test auth user:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await hodPrisma.$disconnect();
  }
}

seedTestUser();
