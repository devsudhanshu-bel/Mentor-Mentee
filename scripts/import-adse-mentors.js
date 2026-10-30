import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import prisma from "../src/config/prisma.hod.js";
import { hashPassword } from "../src/utils/hash.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mentors = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "adse-mentors.json"), "utf8")
);

const EXECUTE = process.argv.includes("--execute");
const DEPARTMENT_CODE = "ADSE";
const EMPLOYEE_CODE_PREFIX = "ADSE";
const INITIAL_PASSWORD = "Password@123";
const CREDENTIALS_FILE = path.resolve(
  process.cwd(),
  "ADSE-47-mentor-initial-credentials.csv"
);
const TEMP_CREDENTIALS_FILE = `${CREDENTIALS_FILE}.tmp`;

const fail = (message) => {
  throw new Error(message);
};

const csvCell = (value) => {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
};

const validateSource = () => {
  if (mentors.length !== 47) {
    fail(`Expected exactly 47 faculty records; found ${mentors.length}.`);
  }

  const seenEmails = new Set();
  const seenUsernames = new Set();

  mentors.forEach((mentor, index) => {
    if (!mentor.fullName || !mentor.email) {
      fail(`Source row ${mentor.sourceRow}: name and email are required.`);
    }

    const email = mentor.email.trim().toLowerCase();
    const username = email.split("@")[0].replace(/[^a-z0-9._-]/g, "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fail(`Invalid email at source row ${mentor.sourceRow}: ${email}`);
    }
    if (!username) {
      fail(`Could not generate a username for ${email}`);
    }
    if (seenEmails.has(email)) {
      fail(`Duplicate email in Excel: ${email}`);
    }
    if (seenUsernames.has(username)) {
      fail(`Duplicate generated username in Excel: ${username}`);
    }

    seenEmails.add(email);
    seenUsernames.add(username);
    mentor.email = email;
    mentor.username = username;
    mentor.employeeCode =
      `${EMPLOYEE_CODE_PREFIX}${String(index + 1).padStart(4, "0")}`;
    mentor.phone = mentor.phone || null;
  });
};

const main = async () => {
  try {
    validateSource();

    console.log(`Mode: ${EXECUTE ? "LIVE IMPORT" : "DRY RUN"}`);
    console.log(`Faculty records loaded: ${mentors.length}`);
    console.log("Employee codes: ADSE0001 – ADSE0047");
    console.log(`Missing phone numbers: ${mentors.filter((m) => !m.phone).length}`);

    const department = await prisma.departments.findUnique({
      where: { code: DEPARTMENT_CODE },
      select: { id: true, name: true, code: true },
    });

    if (!department) {
      const departments = await prisma.departments.findMany({
        select: { name: true, code: true },
        orderBy: { name: "asc" },
      });
      console.log("Available departments:", departments);
      fail(`Department code "${DEPARTMENT_CODE}" was not found. No records were created.`);
    }

    const emails = mentors.map((m) => m.email);
    const usernames = mentors.map((m) => m.username);
    const employeeCodes = mentors.map((m) => m.employeeCode);

    const [existingTeachers, existingAccounts] = await Promise.all([
      prisma.teachers.findMany({
        where: {
          OR: [
            { email: { in: emails } },
            { employeeCode: { in: employeeCodes } },
          ],
        },
        select: { id: true, fullName: true, email: true, employeeCode: true },
      }),
      prisma.user_accounts.findMany({
        where: {
          OR: [
            { email: { in: emails } },
            { username: { in: usernames } },
          ],
        },
        select: { id: true, email: true, username: true, role: true },
      }),
    ]);

    if (existingTeachers.length || existingAccounts.length) {
      console.error("Existing teacher conflicts:", existingTeachers);
      console.error("Existing account conflicts:", existingAccounts);
      fail("Existing records conflict with this 47-member import. Nothing was inserted. Review the conflicts; do not delete or overwrite them.");
    }

    const prepared = await Promise.all(
      mentors.map(async (mentor) => ({
        ...mentor,
        userId: crypto.randomUUID(),
        teacherId: crypto.randomUUID(),
        passwordHash: await hashPassword(INITIAL_PASSWORD),
        temporaryPassword: INITIAL_PASSWORD,
      }))
    );

    const credentialCsv = [
      ["Employee Code", "Full Name", "Email", "Username", "Temporary Password"],
      ...prepared.map((m) => [
        m.employeeCode,
        m.fullName,
        m.email,
        m.username,
        m.temporaryPassword,
      ]),
    ]
      .map((row) => row.map(csvCell).join(","))
      .join("\n");

    console.log(`Department: ${department.name} (${department.code})`);
    console.log(`Unique emails: ${new Set(emails).size}`);
    console.log(`Existing teacher conflicts: ${existingTeachers.length}`);
    console.log(`Existing account conflicts: ${existingAccounts.length}`);

    if (!EXECUTE) {
      console.log("\nDRY RUN PASSED. No database records were created.");
      console.log("To create all 47 mentors, run:");
      console.log("node scripts/import-adse-mentors.js --execute");
      return;
    }

    if (fs.existsSync(CREDENTIALS_FILE) || fs.existsSync(TEMP_CREDENTIALS_FILE)) {
      fail(`${path.basename(CREDENTIALS_FILE)} already exists. Move it securely or rename it before importing.`);
    }

    fs.writeFileSync(TEMP_CREDENTIALS_FILE, credentialCsv, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });

    try {
      await prisma.$transaction(
        async (tx) => {
          for (const mentor of prepared) {
            const account = await tx.user_accounts.create({
              data: {
                id: mentor.userId,
                username: mentor.username,
                email: mentor.email,
                password: mentor.passwordHash,
                role: "MENTOR",
                isActive: true,
                mustChangePassword: true,
                updatedAt: new Date(),
              },
              select: { id: true },
            });

            await tx.teachers.create({
              data: {
                id: mentor.teacherId,
                employeeCode: mentor.employeeCode,
                fullName: mentor.fullName,
                email: mentor.email,
                phone: mentor.phone,
                designation: mentor.designation || null,
                maxMentees: 30,
                isActive: true,
                departmentId: department.id,
                userAccountId: account.id,
              },
              select: { id: true, employeeCode: true },
            });
          }
        },
        { maxWait: 20000, timeout: 120000 }
      );

      fs.renameSync(TEMP_CREDENTIALS_FILE, CREDENTIALS_FILE);
      console.log("\nSUCCESS: 47 mentor accounts and 47 teacher profiles created.");
      console.log(`Credentials saved to: ${CREDENTIALS_FILE}`);
      console.log("Keep the CSV private and distribute credentials securely.");
      console.log("All accounts require a password change on first login.");
      console.log("Initial password for all imported mentors: Password@123");
    } catch (error) {
      if (fs.existsSync(TEMP_CREDENTIALS_FILE)) {
        fs.unlinkSync(TEMP_CREDENTIALS_FILE);
      }
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((error) => {
  console.error("\nIMPORT FAILED:", error.message);
  process.exitCode = 1;
});
