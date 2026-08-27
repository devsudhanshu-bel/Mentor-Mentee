import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Database Seed...");

  // ==========================================
  // Clean Database
  // ==========================================

  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("Password@123", 10);

  // ==========================================
  // USERS
  // ==========================================

  const users = [
    // ---------------- ADMIN ----------------
    {
      fullName: "System Administrator",
      username: "admin",
      email: "admin@mentor.com",
      role: Role.ADMIN,
    },

    // ---------------- MENTORS ----------------
    ...Array.from({ length: 5 }, (_, i) => ({
      fullName: `Dr. Mentor ${i + 1}`,
      username: `mentor${i + 1}`,
      email: `mentor${i + 1}@mentor.com`,
      role: Role.MENTOR,
    })),

    // ---------------- STUDENTS ----------------
    ...Array.from({ length: 10 }, (_, i) => ({
      fullName: `Student ${i + 1}`,
      username: `student${i + 1}`,
      email: `student${i + 1}@mentor.com`,
      role: Role.STUDENT,
    })),
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  console.log("✅ 1 Admin Created");
  console.log("✅ 5 Mentors Created");
  console.log("✅ 10 Students Created");
  console.log("🎉 Database Seeded Successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });