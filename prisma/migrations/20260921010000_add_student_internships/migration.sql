-- CreateEnum
CREATE TYPE "InternshipStatus" AS ENUM ('ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InternshipVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InternshipMode" AS ENUM ('ONSITE', 'REMOTE', 'HYBRID');

-- CreateTable
CREATE TABLE "student_internships" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "internshipTitle" TEXT NOT NULL,
    "role" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "mode" "InternshipMode",
    "projectName" TEXT,
    "description" TEXT,
    "status" "InternshipStatus" NOT NULL DEFAULT 'ONGOING',
    "verificationStatus" "InternshipVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "mentorRemark" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,
    "completionRequested" BOOLEAN NOT NULL DEFAULT false,
    "completionRequestedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_internships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "student_internships_studentId_idx" ON "student_internships"("studentId");

-- CreateIndex
CREATE INDEX "student_internships_status_idx" ON "student_internships"("status");

-- CreateIndex
CREATE INDEX "student_internships_verificationStatus_idx" ON "student_internships"("verificationStatus");

-- AddForeignKey
ALTER TABLE "student_internships" ADD CONSTRAINT "student_internships_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
