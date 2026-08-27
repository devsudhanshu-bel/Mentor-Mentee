-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MENTOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE');

-- CreateEnum
CREATE TYPE "StudentType" AS ENUM ('DAY_SCHOLAR', 'HOSTELLER');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('HOME', 'HOSTEL', 'RENTED', 'OTHER');

-- CreateEnum
CREATE TYPE "PreferredContactMethod" AS ENUM ('MOBILE', 'EMAIL', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "CommunicationEmailPreference" AS ENUM ('UNIVERSITY_EMAIL', 'PERSONAL_EMAIL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registerNumber" TEXT,
    "admissionNumber" TEXT,
    "profileImage" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "bloodGroup" "BloodGroup",
    "nationality" TEXT,
    "religion" TEXT,
    "department" TEXT,
    "programme" TEXT,
    "semester" TEXT,
    "section" TEXT,
    "studentType" "StudentType",
    "address" TEXT,
    "permanentAddress" TEXT,
    "yearsAtUniversity" TEXT,
    "totalCredits" INTEGER,
    "currentCGPA" DOUBLE PRECISION,
    "overallAttendance" DOUBLE PRECISION,
    "academicStanding" TEXT,
    "currentMentor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_parent_details" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "fatherName" TEXT,
    "fatherOccupation" TEXT,
    "fatherCompany" TEXT,
    "fatherAnnualIncome" TEXT,
    "fatherQualification" TEXT,
    "fatherEmail" TEXT,
    "fatherPhone" TEXT,
    "fatherAddress" TEXT,
    "motherName" TEXT,
    "motherOccupation" TEXT,
    "motherQualification" TEXT,
    "motherAnnualIncome" TEXT,
    "motherEmail" TEXT,
    "motherPhone" TEXT,
    "motherAddress" TEXT,
    "guardianName" TEXT,
    "guardianRelationship" TEXT,
    "guardianPhone" TEXT,
    "guardianAlternatePhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_parent_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_contact_details" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "permanentAddress" TEXT,
    "currentAddress" TEXT,
    "addressType" "AddressType",
    "durationAtCurrentAddress" TEXT,
    "personalMobile" TEXT,
    "alternateMobile" TEXT,
    "personalEmail" TEXT,
    "alternateEmail" TEXT,
    "whatsappNumber" TEXT,
    "telegramUsername" TEXT,
    "linkedInProfile" TEXT,
    "githubProfile" TEXT,
    "preferredContactMethod" "PreferredContactMethod",
    "preferredContactTime" TEXT,
    "communicationEmailPreference" "CommunicationEmailPreference",
    "allowWhatsappCommunication" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_contact_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_userId_key" ON "student_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_registerNumber_key" ON "student_profiles"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_admissionNumber_key" ON "student_profiles"("admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "student_parent_details_studentProfileId_key" ON "student_parent_details"("studentProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "student_contact_details_studentProfileId_key" ON "student_contact_details"("studentProfileId");

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_parent_details" ADD CONSTRAINT "student_parent_details_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_contact_details" ADD CONSTRAINT "student_contact_details_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
