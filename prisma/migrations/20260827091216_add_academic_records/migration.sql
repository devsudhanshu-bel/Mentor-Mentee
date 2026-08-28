-- CreateEnum
CREATE TYPE "AcademicSemesterStatus" AS ENUM ('LOCKED', 'CURRENT', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "AcademicEntryStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'VERIFIED');

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "academicSetupCompleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "academic_semesters" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "academicYear" TEXT,
    "term" TEXT,
    "status" "AcademicSemesterStatus" NOT NULL DEFAULT 'LOCKED',
    "entryStatus" "AcademicEntryStatus" NOT NULL DEFAULT 'DRAFT',
    "sgpa" DOUBLE PRECISION,
    "totalCredits" INTEGER NOT NULL DEFAULT 0,
    "creditsEarned" INTEGER NOT NULL DEFAULT 0,
    "backlogs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_semesters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_subjects" (
    "id" TEXT NOT NULL,
    "academicSemesterId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "cia1" DOUBLE PRECISION,
    "cia2" DOUBLE PRECISION,
    "cia3" DOUBLE PRECISION,
    "mse" DOUBLE PRECISION,
    "ese" DOUBLE PRECISION,
    "maximumMarks" DOUBLE PRECISION,
    "totalMarksObtained" DOUBLE PRECISION,
    "grade" TEXT,
    "gradePoint" DOUBLE PRECISION,
    "attendance" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "academic_semesters_studentProfileId_idx" ON "academic_semesters"("studentProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "academic_semesters_studentProfileId_semesterNumber_key" ON "academic_semesters"("studentProfileId", "semesterNumber");

-- CreateIndex
CREATE INDEX "academic_subjects_academicSemesterId_idx" ON "academic_subjects"("academicSemesterId");

-- AddForeignKey
ALTER TABLE "academic_semesters" ADD CONSTRAINT "academic_semesters_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_subjects" ADD CONSTRAINT "academic_subjects_academicSemesterId_fkey" FOREIGN KEY ("academicSemesterId") REFERENCES "academic_semesters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
