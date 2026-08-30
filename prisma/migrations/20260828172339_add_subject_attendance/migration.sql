-- AlterTable
ALTER TABLE "academic_subjects" ADD COLUMN     "classesAttended" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "classesHeld" INTEGER NOT NULL DEFAULT 0;
