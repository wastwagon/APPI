-- CreateEnum
CREATE TYPE "FormSubmissionStatus" AS ENUM ('NEW', 'READ', 'ARCHIVED');

-- AlterTable
ALTER TABLE "FormSubmission" ADD COLUMN "status" "FormSubmissionStatus" NOT NULL DEFAULT 'NEW';
ALTER TABLE "FormSubmission" ADD COLUMN "readAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "FormSubmission_status_idx" ON "FormSubmission"("status");
