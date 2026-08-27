-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('ACADEMICS', 'CERTIFICATES', 'INTERNSHIPS', 'PROJECTS', 'RESEARCH', 'CO_CURRICULAR', 'EXTRA_CURRICULAR', 'AWARDS', 'PERSONAL', 'OTHER');

-- CreateTable
CREATE TABLE "student_documents" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "description" TEXT,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "cloudinaryPublicId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "student_documents_studentProfileId_idx" ON "student_documents"("studentProfileId");

-- AddForeignKey
ALTER TABLE "student_documents" ADD CONSTRAINT "student_documents_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "student_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
