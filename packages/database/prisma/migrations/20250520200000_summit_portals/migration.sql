-- CreateEnum
CREATE TYPE "PortalProgramStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'SHORTLISTED', 'FINALIST', 'REJECTED');

-- CreateEnum
CREATE TYPE "NotificationKind" AS ENUM ('SYSTEM', 'VERIFICATION', 'SUMMIT', 'SPEAKER', 'EXHIBITOR', 'INNOVATION', 'ANNOUNCEMENT');

-- CreateTable
CREATE TABLE "SummitSpeaker" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "summitYear" TEXT NOT NULL DEFAULT '2025',
    "name" TEXT NOT NULL,
    "title" TEXT,
    "organization" TEXT,
    "country" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "sessionTitle" TEXT,
    "sessionTime" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SummitSpeaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summitYear" TEXT NOT NULL DEFAULT '2025',
    "companyName" TEXT NOT NULL,
    "boothNumber" TEXT,
    "sector" TEXT,
    "description" TEXT,
    "logoUrl" TEXT,
    "websiteUrl" TEXT,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "status" "PortalProgramStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExhibitorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InnovationSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summitYear" TEXT NOT NULL DEFAULT '2025',
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" TEXT,
    "country" TEXT,
    "teamSize" INTEGER,
    "impactNotes" TEXT,
    "status" "PortalProgramStatus" NOT NULL DEFAULT 'DRAFT',
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InnovationSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "NotificationKind" NOT NULL DEFAULT 'SYSTEM',
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "href" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SummitSpeaker_userId_key" ON "SummitSpeaker"("userId");

-- CreateIndex
CREATE INDEX "SummitSpeaker_summitYear_published_idx" ON "SummitSpeaker"("summitYear", "published");

-- CreateIndex
CREATE INDEX "SummitSpeaker_featured_idx" ON "SummitSpeaker"("featured");

-- CreateIndex
CREATE UNIQUE INDEX "ExhibitorProfile_userId_key" ON "ExhibitorProfile"("userId");

-- CreateIndex
CREATE INDEX "ExhibitorProfile_status_idx" ON "ExhibitorProfile"("status");

-- CreateIndex
CREATE UNIQUE INDEX "InnovationSubmission_userId_key" ON "InnovationSubmission"("userId");

-- CreateIndex
CREATE INDEX "InnovationSubmission_status_idx" ON "InnovationSubmission"("status");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_idx" ON "Notification"("userId", "readAt");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "SummitSpeaker" ADD CONSTRAINT "SummitSpeaker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorProfile" ADD CONSTRAINT "ExhibitorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InnovationSubmission" ADD CONSTRAINT "InnovationSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
