/*
  Warnings:

  - You are about to drop the column `studentProfileId` on the `academic_backlogs` table. All the data in the column will be lost.
  - You are about to drop the column `academicYear` on the `academic_semesters` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfileId` on the `academic_semesters` table. All the data in the column will be lost.
  - You are about to drop the column `term` on the `academic_semesters` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfileId` on the `student_contact_details` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfileId` on the `student_documents` table. All the data in the column will be lost.
  - You are about to drop the column `studentProfileId` on the `student_parent_details` table. All the data in the column will be lost.
  - You are about to drop the `student_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId,semesterNumber]` on the table `academic_semesters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[academicSemesterId,courseCode]` on the table `academic_subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `student_contact_details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `student_parent_details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `academic_backlogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `academic_semesters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `student_contact_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `student_documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `student_parent_details` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AcademicTermRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AcademicTermStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'COMPLETED', 'LOCKED');

-- CreateEnum
CREATE TYPE "AcademicYearStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DetentionStatus" AS ENUM ('ACTIVE', 'RESUMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'FAILED', 'DETAINED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "ImportBatchStatus" AS ENUM ('PROCESSING', 'COMPLETED', 'COMPLETED_WITH_ERRORS', 'FAILED');

-- CreateEnum
CREATE TYPE "MentorAssignmentStatus" AS ENUM ('ACTIVE', 'ENDED', 'TRANSFERRED', 'REMOVED');

-- CreateEnum
CREATE TYPE "MentorTransferRequestSource" AS ENUM ('TEACHER', 'IN_PERSON');

-- CreateEnum
CREATE TYPE "MentorTransferStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OtpPurpose" AS ENUM ('ACCOUNT_ACTIVATION', 'LOGIN', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('INVITED', 'ACTIVE', 'DETAINED', 'GRADUATED', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SYSTEM_ADMIN', 'ADMIN', 'MENTOR', 'STUDENT');

-- DropForeignKey
ALTER TABLE "academic_backlogs" DROP CONSTRAINT "academic_backlogs_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "academic_semesters" DROP CONSTRAINT "academic_semesters_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "student_contact_details" DROP CONSTRAINT "student_contact_details_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "student_documents" DROP CONSTRAINT "student_documents_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "student_parent_details" DROP CONSTRAINT "student_parent_details_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "student_profiles" DROP CONSTRAINT "student_profiles_userId_fkey";

-- DropIndex
DROP INDEX "academic_backlogs_studentProfileId_idx";

-- DropIndex
DROP INDEX "academic_backlogs_studentProfileId_status_idx";

-- DropIndex
DROP INDEX "academic_semesters_studentProfileId_idx";

-- DropIndex
DROP INDEX "academic_semesters_studentProfileId_semesterNumber_key";

-- DropIndex
DROP INDEX "student_contact_details_studentProfileId_key";

-- DropIndex
DROP INDEX "student_documents_studentProfileId_idx";

-- DropIndex
DROP INDEX "student_parent_details_studentProfileId_key";

-- AlterTable
ALTER TABLE "academic_backlogs" DROP COLUMN "studentProfileId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "academic_semesters" DROP COLUMN "academicYear",
DROP COLUMN "studentProfileId",
DROP COLUMN "term",
ADD COLUMN     "academicYearId" TEXT,
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_contact_details" DROP COLUMN "studentProfileId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_documents" DROP COLUMN "studentProfileId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_parent_details" DROP COLUMN "studentProfileId",
ADD COLUMN     "motherCompany" TEXT,
ADD COLUMN     "studentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "student_profiles";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "academic_term_requests" (
    "id" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "name" TEXT,
    "proposedStartDate" TIMESTAMP(3) NOT NULL,
    "proposedEndDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "requestedBy" TEXT NOT NULL,
    "status" "AcademicTermRequestStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_term_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_terms" (
    "id" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "name" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "AcademicTermStatus" NOT NULL DEFAULT 'UPCOMING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_years" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "AcademicYearStatus" NOT NULL DEFAULT 'UPCOMING',
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hodTeacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detentions" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "reason" TEXT,
    "status" "DetentionStatus" NOT NULL DEFAULT 'ACTIVE',
    "detainedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resumedAt" TIMESTAMP(3),
    "resumedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detentions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_batches" (
    "id" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "fileName" TEXT,
    "totalRecords" INTEGER NOT NULL DEFAULT 0,
    "successfulCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "status" "ImportBatchStatus" NOT NULL DEFAULT 'PROCESSING',
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "import_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_errors" (
    "id" TEXT NOT NULL,
    "importBatchId" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "field" TEXT,
    "value" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "import_errors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentor_assignments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "status" "MentorAssignmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "assignedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentor_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentor_transfer_requests" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "currentMentorId" TEXT,
    "requestedMentorId" TEXT,
    "termId" TEXT NOT NULL,
    "requestSource" "MentorTransferRequestSource" NOT NULL,
    "initiatedByTeacherId" TEXT,
    "initiatedByUserId" TEXT NOT NULL,
    "reason" TEXT,
    "status" "MentorTransferStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentor_transfer_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_verifications" (
    "id" TEXT NOT NULL,
    "userAccountId" TEXT NOT NULL,
    "otpHash" TEXT NOT NULL,
    "purpose" "OtpPurpose" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_enrollments" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "registerNumber" TEXT NOT NULL,
    "admissionNumber" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "profileImage" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "bloodGroup" "BloodGroup",
    "nationality" TEXT,
    "religion" TEXT,
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
    "academicSetupCompleted" BOOLEAN NOT NULL DEFAULT false,
    "status" "StudentStatus" NOT NULL DEFAULT 'INVITED',
    "departmentId" TEXT NOT NULL,
    "userAccountId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "id" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "designation" TEXT,
    "maxMentees" INTEGER NOT NULL DEFAULT 30,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "departmentId" TEXT NOT NULL,
    "userAccountId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_accounts" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "term_change_requests" (
    "id" TEXT NOT NULL,
    "currentTermId" TEXT NOT NULL,
    "requestedTermName" TEXT NOT NULL,
    "requestedSemesterNumber" INTEGER NOT NULL,
    "requestedStartDate" TIMESTAMP(3) NOT NULL,
    "requestedEndDate" TIMESTAMP(3) NOT NULL,
    "requestedBy" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "term_change_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_profiles" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "profileImage" TEXT,
    "qualification" TEXT,
    "specialization" TEXT,
    "office" TEXT,
    "officeHours" TEXT,
    "about" TEXT,
    "highlightOne" TEXT,
    "highlightTwo" TEXT,
    "highlightThree" TEXT,
    "linkedIn" TEXT,
    "googleScholar" TEXT,
    "researchGate" TEXT,
    "orcid" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "academic_term_requests_academicYearId_idx" ON "academic_term_requests"("academicYearId");

-- CreateIndex
CREATE INDEX "academic_term_requests_requestedBy_idx" ON "academic_term_requests"("requestedBy");

-- CreateIndex
CREATE INDEX "academic_term_requests_status_idx" ON "academic_term_requests"("status");

-- CreateIndex
CREATE INDEX "academic_terms_academicYearId_idx" ON "academic_terms"("academicYearId");

-- CreateIndex
CREATE INDEX "academic_terms_status_idx" ON "academic_terms"("status");

-- CreateIndex
CREATE UNIQUE INDEX "academic_terms_academicYearId_semesterNumber_key" ON "academic_terms"("academicYearId", "semesterNumber");

-- CreateIndex
CREATE INDEX "academic_years_departmentId_idx" ON "academic_years"("departmentId");

-- CreateIndex
CREATE INDEX "academic_years_status_idx" ON "academic_years"("status");

-- CreateIndex
CREATE UNIQUE INDEX "academic_years_departmentId_name_key" ON "academic_years"("departmentId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_hodTeacherId_key" ON "departments"("hodTeacherId");

-- CreateIndex
CREATE INDEX "detentions_status_idx" ON "detentions"("status");

-- CreateIndex
CREATE INDEX "detentions_studentId_idx" ON "detentions"("studentId");

-- CreateIndex
CREATE INDEX "detentions_termId_idx" ON "detentions"("termId");

-- CreateIndex
CREATE INDEX "import_batches_academicYearId_idx" ON "import_batches"("academicYearId");

-- CreateIndex
CREATE INDEX "import_batches_status_idx" ON "import_batches"("status");

-- CreateIndex
CREATE INDEX "import_batches_uploadedBy_idx" ON "import_batches"("uploadedBy");

-- CreateIndex
CREATE INDEX "import_errors_importBatchId_idx" ON "import_errors"("importBatchId");

-- CreateIndex
CREATE INDEX "mentor_assignments_status_idx" ON "mentor_assignments"("status");

-- CreateIndex
CREATE INDEX "mentor_assignments_studentId_termId_idx" ON "mentor_assignments"("studentId", "termId");

-- CreateIndex
CREATE INDEX "mentor_assignments_teacherId_termId_idx" ON "mentor_assignments"("teacherId", "termId");

-- CreateIndex
CREATE INDEX "mentor_assignments_termId_idx" ON "mentor_assignments"("termId");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_currentMentorId_idx" ON "mentor_transfer_requests"("currentMentorId");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_initiatedByTeacherId_idx" ON "mentor_transfer_requests"("initiatedByTeacherId");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_initiatedByUserId_idx" ON "mentor_transfer_requests"("initiatedByUserId");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_requestSource_idx" ON "mentor_transfer_requests"("requestSource");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_requestedMentorId_idx" ON "mentor_transfer_requests"("requestedMentorId");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_status_idx" ON "mentor_transfer_requests"("status");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_studentId_idx" ON "mentor_transfer_requests"("studentId");

-- CreateIndex
CREATE INDEX "mentor_transfer_requests_termId_idx" ON "mentor_transfer_requests"("termId");

-- CreateIndex
CREATE INDEX "otp_verifications_expiresAt_idx" ON "otp_verifications"("expiresAt");

-- CreateIndex
CREATE INDEX "otp_verifications_userAccountId_idx" ON "otp_verifications"("userAccountId");

-- CreateIndex
CREATE INDEX "student_enrollments_status_idx" ON "student_enrollments"("status");

-- CreateIndex
CREATE INDEX "student_enrollments_studentId_idx" ON "student_enrollments"("studentId");

-- CreateIndex
CREATE INDEX "student_enrollments_termId_idx" ON "student_enrollments"("termId");

-- CreateIndex
CREATE UNIQUE INDEX "student_enrollments_studentId_termId_key" ON "student_enrollments"("studentId", "termId");

-- CreateIndex
CREATE UNIQUE INDEX "students_registerNumber_key" ON "students"("registerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "students_admissionNumber_key" ON "students"("admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "students_userAccountId_key" ON "students"("userAccountId");

-- CreateIndex
CREATE INDEX "students_departmentId_idx" ON "students"("departmentId");

-- CreateIndex
CREATE INDEX "students_status_idx" ON "students"("status");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_employeeCode_key" ON "teachers"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_userAccountId_key" ON "teachers"("userAccountId");

-- CreateIndex
CREATE INDEX "teachers_departmentId_idx" ON "teachers"("departmentId");

-- CreateIndex
CREATE INDEX "teachers_isActive_idx" ON "teachers"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "user_accounts_username_key" ON "user_accounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_accounts_email_key" ON "user_accounts"("email");

-- CreateIndex
CREATE INDEX "term_change_requests_status_idx" ON "term_change_requests"("status");

-- CreateIndex
CREATE INDEX "term_change_requests_requestedBy_idx" ON "term_change_requests"("requestedBy");

-- CreateIndex
CREATE INDEX "term_change_requests_currentTermId_idx" ON "term_change_requests"("currentTermId");

-- CreateIndex
CREATE INDEX "term_change_requests_createdAt_idx" ON "term_change_requests"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_profiles_teacherId_key" ON "teacher_profiles"("teacherId");

-- CreateIndex
CREATE INDEX "academic_backlogs_studentId_idx" ON "academic_backlogs"("studentId");

-- CreateIndex
CREATE INDEX "academic_backlogs_studentId_status_idx" ON "academic_backlogs"("studentId", "status");

-- CreateIndex
CREATE INDEX "academic_semesters_studentId_idx" ON "academic_semesters"("studentId");

-- CreateIndex
CREATE INDEX "academic_semesters_academicYearId_idx" ON "academic_semesters"("academicYearId");

-- CreateIndex
CREATE UNIQUE INDEX "academic_semesters_studentId_semesterNumber_key" ON "academic_semesters"("studentId", "semesterNumber");

-- CreateIndex
CREATE INDEX "academic_subjects_courseCode_idx" ON "academic_subjects"("courseCode");

-- CreateIndex
CREATE UNIQUE INDEX "academic_subjects_academicSemesterId_courseCode_key" ON "academic_subjects"("academicSemesterId", "courseCode");

-- CreateIndex
CREATE UNIQUE INDEX "student_contact_details_studentId_key" ON "student_contact_details"("studentId");

-- CreateIndex
CREATE INDEX "student_documents_studentId_idx" ON "student_documents"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_parent_details_studentId_key" ON "student_parent_details"("studentId");

-- AddForeignKey
ALTER TABLE "academic_term_requests" ADD CONSTRAINT "academic_term_requests_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_terms" ADD CONSTRAINT "academic_terms_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_years" ADD CONSTRAINT "academic_years_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_hodTeacherId_fkey" FOREIGN KEY ("hodTeacherId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detentions" ADD CONSTRAINT "detentions_resumedBy_fkey" FOREIGN KEY ("resumedBy") REFERENCES "user_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detentions" ADD CONSTRAINT "detentions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detentions" ADD CONSTRAINT "detentions_termId_fkey" FOREIGN KEY ("termId") REFERENCES "academic_terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_batches" ADD CONSTRAINT "import_batches_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_batches" ADD CONSTRAINT "import_batches_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_errors" ADD CONSTRAINT "import_errors_importBatchId_fkey" FOREIGN KEY ("importBatchId") REFERENCES "import_batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_assignments" ADD CONSTRAINT "mentor_assignments_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_assignments" ADD CONSTRAINT "mentor_assignments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_assignments" ADD CONSTRAINT "mentor_assignments_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_assignments" ADD CONSTRAINT "mentor_assignments_termId_fkey" FOREIGN KEY ("termId") REFERENCES "academic_terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_transfer_requests" ADD CONSTRAINT "mentor_transfer_requests_currentMentorId_fkey" FOREIGN KEY ("currentMentorId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_transfer_requests" ADD CONSTRAINT "mentor_transfer_requests_initiatedByTeacherId_fkey" FOREIGN KEY ("initiatedByTeacherId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_transfer_requests" ADD CONSTRAINT "mentor_transfer_requests_initiatedByUserId_fkey" FOREIGN KEY ("initiatedByUserId") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_transfer_requests" ADD CONSTRAINT "mentor_transfer_requests_requestedMentorId_fkey" FOREIGN KEY ("requestedMentorId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_transfer_requests" ADD CONSTRAINT "mentor_transfer_requests_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "user_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_transfer_requests" ADD CONSTRAINT "mentor_transfer_requests_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_transfer_requests" ADD CONSTRAINT "mentor_transfer_requests_termId_fkey" FOREIGN KEY ("termId") REFERENCES "academic_terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "otp_verifications" ADD CONSTRAINT "otp_verifications_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "user_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrollments" ADD CONSTRAINT "student_enrollments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_enrollments" ADD CONSTRAINT "student_enrollments_termId_fkey" FOREIGN KEY ("termId") REFERENCES "academic_terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "user_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_contact_details" ADD CONSTRAINT "student_contact_details_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_parent_details" ADD CONSTRAINT "student_parent_details_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_documents" ADD CONSTRAINT "student_documents_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_semesters" ADD CONSTRAINT "academic_semesters_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_semesters" ADD CONSTRAINT "academic_semesters_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_backlogs" ADD CONSTRAINT "academic_backlogs_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "user_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_profiles" ADD CONSTRAINT "teacher_profiles_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
