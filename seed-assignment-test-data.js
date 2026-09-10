import "dotenv/config";

import hodPrisma from "./src/config/prisma.hod.js";
import { hashPassword } from "./src/utils/hash.js";

// ============================================================
// SEED CONFIGURATION
// ============================================================

const PASSWORD = "Password@123";

const IDS = {
  department: "test-assignment-dept-aids",

  academicYear: "test-assignment-ay-2026",

  academicTerm: "test-assignment-term-2026",

  mentors: [
    "test-assignment-mentor-001",
    "test-assignment-mentor-002",
    "test-assignment-mentor-003",
    "test-assignment-mentor-004",
  ],

  mentorUsers: [
    "test-assignment-mentor-user-001",
    "test-assignment-mentor-user-002",
    "test-assignment-mentor-user-003",
    "test-assignment-mentor-user-004",
  ],

  students: [
    "test-assignment-student-001",
    "test-assignment-student-002",
    "test-assignment-student-003",
    "test-assignment-student-004",
    "test-assignment-student-005",
    "test-assignment-student-006",
    "test-assignment-student-007",
    "test-assignment-student-008",
    "test-assignment-student-009",
    "test-assignment-student-010",
  ],

  studentUsers: [
    "test-assignment-student-user-001",
    "test-assignment-student-user-002",
    "test-assignment-student-user-003",
    "test-assignment-student-user-004",
    "test-assignment-student-user-005",
    "test-assignment-student-user-006",
    "test-assignment-student-user-007",
    "test-assignment-student-user-008",
    "test-assignment-student-user-009",
    "test-assignment-student-user-010",
  ],
};

// ============================================================
// MAIN
// ============================================================

async function seedAssignmentTestData() {
  try {
    console.log("");
    console.log("==============================================");
    console.log("🌱 NORMAL TEST DATA SEED");
    console.log("==============================================");
    console.log("");

    // ========================================================
    // PASSWORD
    // ========================================================

    console.log("🔐 Hashing default password...");

    const hashedPassword = await hashPassword(PASSWORD);

    console.log("✅ Password hashed successfully");

    // ========================================================
    // 1. DEPARTMENT
    // ========================================================

    console.log("");
    console.log("🏫 Creating test department...");

    const department = await hodPrisma.departments.upsert({
      where: {
        id: IDS.department,
      },

      update: {
        name: "Artificial Intelligence and Data Science",
        code: "AIDS-TEST",
        updatedAt: new Date(),
      },

      create: {
        id: IDS.department,
        name: "Artificial Intelligence and Data Science",
        code: "AIDS-TEST",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Department: ${department.name}`);

    // ========================================================
    // 2. ACADEMIC YEAR
    // ========================================================

    console.log("");
    console.log("📅 Creating test academic year...");

    const academicYear = await hodPrisma.academic_years.upsert({
      where: {
        id: IDS.academicYear,
      },

      update: {
        name: "2026-27",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2027-05-31"),
        status: "ACTIVE",
        departmentId: department.id,
        updatedAt: new Date(),
      },

      create: {
        id: IDS.academicYear,
        name: "2026-27",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2027-05-31"),
        status: "ACTIVE",
        departmentId: department.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Academic Year: ${academicYear.name}`);

    // ========================================================
    // 3. ACTIVE ACADEMIC TERM
    // ========================================================

    console.log("");
    console.log("📚 Creating active academic term...");

    const academicTerm = await hodPrisma.academic_terms.upsert({
      where: {
        id: IDS.academicTerm,
      },

      update: {
        academicYearId: academicYear.id,
        semesterNumber: 6,
        name: "Odd Semester 2026",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-12-31"),
        status: "ACTIVE",
        updatedAt: new Date(),
      },

      create: {
        id: IDS.academicTerm,
        academicYearId: academicYear.id,
        semesterNumber: 6,
        name: "Odd Semester 2026",
        startDate: new Date("2026-06-01"),
        endDate: new Date("2026-12-31"),
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Active Term: ${academicTerm.name}`);

    // ========================================================
    // 4. MENTORS
    // ========================================================

    console.log("");
    console.log("👨‍🏫 Creating 4 mentor accounts...");

    const mentorData = [
      {
        index: 1,
        mentorId: IDS.mentors[0],
        userId: IDS.mentorUsers[0],
        username: "mentor1",
        employeeCode: "AIDS-M001",
        fullName: "Test Mentor 1",
        email: "mentor1@gmail.com",
        phone: "9000000001",
        designation: "Assistant Professor",
      },

      {
        index: 2,
        mentorId: IDS.mentors[1],
        userId: IDS.mentorUsers[1],
        username: "mentor2",
        employeeCode: "AIDS-M002",
        fullName: "Test Mentor 2",
        email: "mentor2@gmail.com",
        phone: "9000000002",
        designation: "Assistant Professor",
      },

      {
        index: 3,
        mentorId: IDS.mentors[2],
        userId: IDS.mentorUsers[2],
        username: "mentor3",
        employeeCode: "AIDS-M003",
        fullName: "Test Mentor 3",
        email: "mentor3@gmail.com",
        phone: "9000000003",
        designation: "Associate Professor",
      },

      {
        index: 4,
        mentorId: IDS.mentors[3],
        userId: IDS.mentorUsers[3],
        username: "mentor4",
        employeeCode: "AIDS-M004",
        fullName: "Test Mentor 4",
        email: "mentor4@gmail.com",
        phone: "9000000004",
        designation: "Assistant Professor",
      },
    ];

    for (const mentor of mentorData) {
      // ------------------------------------------------------
      // USER ACCOUNT
      // ------------------------------------------------------

      const userAccount = await hodPrisma.user_accounts.upsert({
        where: {
          id: mentor.userId,
        },

        update: {
          username: mentor.username,
          email: mentor.email,
          password: hashedPassword,
          role: "MENTOR",
          isActive: true,
          mustChangePassword: false,
          updatedAt: new Date(),
        },

        create: {
          id: mentor.userId,
          username: mentor.username,
          email: mentor.email,
          password: hashedPassword,
          role: "MENTOR",
          isActive: true,
          mustChangePassword: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // ------------------------------------------------------
      // TEACHER
      // ------------------------------------------------------

      const teacher = await hodPrisma.teachers.upsert({
        where: {
          id: mentor.mentorId,
        },

        update: {
          employeeCode: mentor.employeeCode,
          fullName: mentor.fullName,
          email: mentor.email,
          phone: mentor.phone,
          designation: mentor.designation,
          maxMentees: 5,
          isActive: true,
          departmentId: department.id,
          userAccountId: userAccount.id,
          updatedAt: new Date(),
        },

        create: {
          id: mentor.mentorId,
          employeeCode: mentor.employeeCode,
          fullName: mentor.fullName,
          email: mentor.email,
          phone: mentor.phone,
          designation: mentor.designation,
          maxMentees: 5,
          isActive: true,
          departmentId: department.id,
          userAccountId: userAccount.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // ------------------------------------------------------
      // TEACHER PROFILE
      // ------------------------------------------------------

      await hodPrisma.teacher_profiles.upsert({
        where: {
          teacherId: teacher.id,
        },

        update: {
          qualification: "M.Tech, Ph.D.",
          specialization:
            "Artificial Intelligence, Machine Learning and Data Science",
          office: `Block A - Room 20${mentor.index}`,
          officeHours: "10:00 AM - 4:00 PM",
          about: `Test mentor profile for ${mentor.fullName}.`,
          highlightOne: "Mentor and academic advisor",
          highlightTwo: "Student guidance and development",
          highlightThree: "Research and technical education",
          linkedIn: `https://linkedin.com/in/test-mentor-${mentor.index}`,
          googleScholar: "https://scholar.google.com/",
          researchGate: "https://www.researchgate.net/",
          orcid: null,
          website: null,
          updatedAt: new Date(),
        },

        create: {
          id: `test-assignment-teacher-profile-${String(
            mentor.index
          ).padStart(3, "0")}`,

          teacherId: teacher.id,

          qualification: "M.Tech, Ph.D.",

          specialization:
            "Artificial Intelligence, Machine Learning and Data Science",

          office: `Block A - Room 20${mentor.index}`,

          officeHours: "10:00 AM - 4:00 PM",

          about: `Test mentor profile for ${mentor.fullName}.`,

          highlightOne: "Mentor and academic advisor",

          highlightTwo: "Student guidance and development",

          highlightThree: "Research and technical education",

          linkedIn: `https://linkedin.com/in/test-mentor-${mentor.index}`,

          googleScholar: "https://scholar.google.com/",

          researchGate: "https://www.researchgate.net/",

          orcid: null,

          website: null,

          createdAt: new Date(),

          updatedAt: new Date(),
        },
      });

      console.log(
        `   ✅ ${teacher.employeeCode} → ${teacher.email}`
      );
    }

    // ========================================================
    // 5. STUDENTS + USER ACCOUNTS
    // ========================================================

    console.log("");
    console.log("👨‍🎓 Creating 10 student accounts...");

    for (let i = 0; i < 10; i++) {
      const studentId = IDS.students[i];

      const studentUserId = IDS.studentUsers[i];

      const studentNumber = String(i + 1).padStart(3, "0");

      const registerNumber = `AIDS26TEST${studentNumber}`;

      const username = `student${i + 1}`;

      const email = `student${i + 1}@gmail.com`;

      const fullName = `Test Student ${i + 1}`;

      const phone = `91000000${String(i + 1).padStart(2, "0")}`;

      // ------------------------------------------------------
      // STUDENT USER ACCOUNT
      // ------------------------------------------------------

      const userAccount = await hodPrisma.user_accounts.upsert({
        where: {
          id: studentUserId,
        },

        update: {
          username,
          email,
          password: hashedPassword,
          role: "STUDENT",
          isActive: true,
          mustChangePassword: false,
          updatedAt: new Date(),
        },

        create: {
          id: studentUserId,
          username,
          email,
          password: hashedPassword,
          role: "STUDENT",
          isActive: true,
          mustChangePassword: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // ------------------------------------------------------
      // STUDENT
      // ------------------------------------------------------

      const student = await hodPrisma.students.upsert({
        where: {
          id: studentId,
        },

        update: {
          registerNumber,
          fullName,
          email,
          phone,
          programme:
            "B.Tech Artificial Intelligence and Data Science",
          semester: "6",
          section: i < 5 ? "A" : "B",
          status: "ACTIVE",
          departmentId: department.id,
          userAccountId: userAccount.id,
          academicSetupCompleted: true,
          updatedAt: new Date(),
        },

        create: {
          id: studentId,
          registerNumber,
          fullName,
          email,
          phone,
          programme:
            "B.Tech Artificial Intelligence and Data Science",
          semester: "6",
          section: i < 5 ? "A" : "B",
          status: "ACTIVE",
          departmentId: department.id,
          userAccountId: userAccount.id,
          academicSetupCompleted: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // ------------------------------------------------------
      // ACTIVE ENROLLMENT
      // ------------------------------------------------------

      await hodPrisma.student_enrollments.upsert({
        where: {
          studentId_termId: {
            studentId: student.id,
            termId: academicTerm.id,
          },
        },

        update: {
          semesterNumber: 6,
          status: "ACTIVE",
          enrolledAt: new Date(),
          updatedAt: new Date(),
        },

        create: {
          id: `test-assignment-enrollment-${studentNumber}`,
          studentId: student.id,
          termId: academicTerm.id,
          semesterNumber: 6,
          status: "ACTIVE",
          enrolledAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log(
        `   ✅ ${registerNumber} → ${fullName} → ${email}`
      );
    }

    // ========================================================
    // SUMMARY
    // ========================================================

    console.log("");
    console.log("==============================================");
    console.log("🎉 TEST DATA CREATED SUCCESSFULLY");
    console.log("==============================================");
    console.log("");

    console.log("🏫 DEPARTMENT");
    console.log(`   Name : ${department.name}`);
    console.log(`   Code : ${department.code}`);
    console.log(`   ID   : ${department.id}`);

    console.log("");

    console.log("📅 ACADEMIC YEAR");
    console.log(`   Name : ${academicYear.name}`);
    console.log(`   ID   : ${academicYear.id}`);

    console.log("");

    console.log("📚 ACTIVE TERM");
    console.log(`   Name : ${academicTerm.name}`);
    console.log(`   ID   : ${academicTerm.id}`);
    console.log("   Semester : 6");

    console.log("");

    console.log("👨‍🏫 MENTORS");
    console.log("   Count    : 4");
    console.log("   Capacity : 5 each");
    console.log("   Password : Password@123");
    console.log("");
    console.log("   mentor1@gmail.com");
    console.log("   mentor2@gmail.com");
    console.log("   mentor3@gmail.com");
    console.log("   mentor4@gmail.com");

    console.log("");

    console.log("👨‍🎓 STUDENTS");
    console.log("   Count    : 10");
    console.log("   Password : Password@123");
    console.log("");
    console.log("   student1@gmail.com");
    console.log("   student2@gmail.com");
    console.log("   student3@gmail.com");
    console.log("   student4@gmail.com");
    console.log("   student5@gmail.com");
    console.log("   student6@gmail.com");
    console.log("   student7@gmail.com");
    console.log("   student8@gmail.com");
    console.log("   student9@gmail.com");
    console.log("   student10@gmail.com");

    console.log("");

    console.log("==============================================");
    console.log("🚀 READY FOR TESTING");
    console.log("==============================================");
    console.log("");
  } catch (error) {
    console.error("");
    console.error("❌ TEST DATA SEED FAILED");
    console.error("");
    console.error(error);
    console.error("");

    process.exitCode = 1;
  } finally {
    await hodPrisma.$disconnect();
  }
}

// ============================================================
// RUN
// ============================================================

seedAssignmentTestData();