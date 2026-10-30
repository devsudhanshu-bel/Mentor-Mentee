import "dotenv/config";
import { randomUUID } from "node:crypto";

import hodPrisma from "../src/config/prisma.hod.js";
import { hashPassword } from "../src/utils/hash.js";

// ============================================================
// INITIAL ADMIN + MENTOR SETUP
// Uses the existing HOD Prisma client and bcrypt password hash.
// ============================================================

const ADMIN_USERNAME = "admin";
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Password@123";

const MENTOR_USERNAME = "mentor1";
const MENTOR_EMAIL = "mentor1@gmail.com";
const MENTOR_PASSWORD = "Password@123";

async function main() {
  
  if (!process.env.NEW_DATABASE_URL) {
    throw new Error(
      "NEW_DATABASE_URL is missing. Configure your Supabase connection in .env.",
    );
  }
  console.log("Connecting Prisma client...");
  await hodPrisma.$connect();
  console.log("Prisma connection established.");

  console.log("Testing department lookup...");

  const now = new Date();

  // ----------------------------------------------------------
  // 1. Create or reuse a department for the mentor.
  // ----------------------------------------------------------

  let department = await hodPrisma.departments.findUnique({
    where: { code: "DEMO" },
  });

  if (!department) {
    department = await hodPrisma.departments.create({
      data: {
        id: randomUUID(),
        name: "Demo Department",
        code: "DEMO",
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  // ----------------------------------------------------------
  // 2. Create the administrator account.
  // ----------------------------------------------------------

  let admin = await hodPrisma.user_accounts.findUnique({
    where: { username: ADMIN_USERNAME },
  });

  if (!admin) {
    const passwordHash = await hashPassword(ADMIN_PASSWORD);

    admin = await hodPrisma.user_accounts.create({
      data: {
        id: randomUUID(),
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: passwordHash,
        role: "SYSTEM_ADMIN",
        isActive: true,
        mustChangePassword: true,
        createdAt: now,
        updatedAt: now,
      },
    });

    await hodPrisma.admin_profiles.create({
      data: {
        id: randomUUID(),
        userAccountId: admin.id,
        fullName: "System Administrator",
        designation: "Administrator",
        department: department.name,
        createdAt: now,
        updatedAt: now,
      },
    });

    console.log("Created administrator account.");
  } else {
    console.log("Administrator username already exists; left unchanged.");
  }

  // ----------------------------------------------------------
  // 3. Create the mentor login account.
  // ----------------------------------------------------------

  let mentorAccount = await hodPrisma.user_accounts.findUnique({
    where: { username: MENTOR_USERNAME },
  });

  if (!mentorAccount) {
    const passwordHash = await hashPassword(MENTOR_PASSWORD);

    mentorAccount = await hodPrisma.user_accounts.create({
      data: {
        id: randomUUID(),
        username: MENTOR_USERNAME,
        email: MENTOR_EMAIL,
        password: passwordHash,
        role: "MENTOR",
        isActive: true,
        mustChangePassword: true,
        createdAt: now,
        updatedAt: now,
      },
    });

    console.log("Created mentor login account.");
  } else {
    console.log("Mentor username already exists; left unchanged.");
  }

  // ----------------------------------------------------------
  // 4. Create the linked teacher/mentor record.
  // ----------------------------------------------------------

  let teacher = await hodPrisma.teachers.findUnique({
    where: { userAccountId: mentorAccount.id },
  });

  if (!teacher) {
    const existingEmployee = await hodPrisma.teachers.findUnique({
      where: { employeeCode: "MENTOR001" },
    });

    if (existingEmployee) {
      throw new Error(
        "Employee code MENTOR001 is already used by another teacher. " +
          "Change the employee code in this script and rerun it.",
      );
    }

    teacher = await hodPrisma.teachers.create({
      data: {
        id: randomUUID(),
        employeeCode: "MENTOR001",
        fullName: "Demo Mentor",
        email: MENTOR_EMAIL,
        designation: "Mentor",
        departmentId: department.id,
        userAccountId: mentorAccount.id,
        isActive: true,
        maxMentees: 30,
        createdAt: now,
        updatedAt: now,
      },
    });

    console.log("Created linked teacher record.");
  } else {
    console.log("Mentor teacher record already exists; left unchanged.");
  }

  console.log("\nInitial account setup completed.");
  console.log("Admin username:", admin.username);
  console.log("Mentor username:", mentorAccount.username);
  console.log("Mentor employee code:", teacher.employeeCode);
  console.log("Department:", department.name);
  console.log(
    "\nChange both temporary passwords before using these accounts beyond local testing.",
  );
}

main()
  .catch((error) => {
    console.error("Account setup failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await hodPrisma.$disconnect();
  });
