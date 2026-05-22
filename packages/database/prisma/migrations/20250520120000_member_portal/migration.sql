-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('NONE', 'PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "SummitRegistrationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'CONFIRMED', 'CANCELLED');

-- AlterTable Profile
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "position" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "organization" TEXT;
ALTER TABLE "Profile" ADD COLUMN IF NOT EXISTS "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'NONE';

-- CreateTable MemberVerification
CREATE TABLE "MemberVerification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "documentPath" TEXT,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    CONSTRAINT "MemberVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable SummitRegistration
CREATE TABLE "SummitRegistration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summitYear" TEXT NOT NULL DEFAULT '2025',
    "organisation" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "delegationRole" TEXT,
    "dietaryNotes" TEXT,
    "status" "SummitRegistrationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SummitRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MemberVerification_userId_idx" ON "MemberVerification"("userId");
CREATE INDEX "MemberVerification_status_idx" ON "MemberVerification"("status");
CREATE INDEX "SummitRegistration_status_idx" ON "SummitRegistration"("status");
CREATE UNIQUE INDEX "SummitRegistration_userId_summitYear_key" ON "SummitRegistration"("userId", "summitYear");

-- AddForeignKey
ALTER TABLE "MemberVerification" ADD CONSTRAINT "MemberVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SummitRegistration" ADD CONSTRAINT "SummitRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
