-- CreateEnum
CREATE TYPE "AcademicBacklogStatus" AS ENUM ('ACTIVE', 'CLEARED');

-- CreateTable
CREATE TABLE "academic_backlogs" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "status" "AcademicBacklogStatus" NOT NULL DEFAULT 'ACTIVE',
    "clearedSemesterNumber" INTEGER,
    "clearedGrade" TEXT,
    "clearedMarks" DOUBLE PRECISION,
    "clearedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_backlogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "academic_backlogs_studentProfileId_idx"
ON "academic_backlogs"("studentProfileId");

-- CreateIndex
CREATE INDEX "academic_backlogs_studentProfileId_status_idx"
ON "academic_backlogs"("studentProfileId", "status");

-- AddForeignKey
ALTER TABLE "academic_backlogs"
ADD CONSTRAINT "academic_backlogs_studentProfileId_fkey"
FOREIGN KEY ("studentProfileId")
REFERENCES "student_profiles"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;