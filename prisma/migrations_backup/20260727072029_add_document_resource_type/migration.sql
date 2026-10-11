/*
  Warnings:

  - Added the required column `resourceType` to the `student_documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_documents" ADD COLUMN     "resourceType" TEXT NOT NULL;
