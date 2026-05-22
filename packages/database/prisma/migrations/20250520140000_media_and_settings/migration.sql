-- CreateEnum
CREATE TYPE "SiteMode" AS ENUM ('LIVE', 'UNDER_CONSTRUCTION');
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'DOCUMENT', 'VIDEO');

-- CreateTable SiteSettings
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "siteMode" "SiteMode" NOT NULL DEFAULT 'LIVE',
    "constructionTitle" TEXT DEFAULT 'We''ll be right back',
    "constructionMessage" TEXT DEFAULT 'We''re preparing a new experience for Africa''s political parties.',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable MediaAsset
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "title" TEXT,
    "altText" TEXT,
    "caption" TEXT,
    "fileName" TEXT,
    "filePath" TEXT,
    "url" TEXT NOT NULL,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "folder" TEXT NOT NULL DEFAULT 'general',
    "youtubeId" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MediaAsset_type_idx" ON "MediaAsset"("type");
CREATE INDEX "MediaAsset_folder_idx" ON "MediaAsset"("folder");
CREATE INDEX "MediaAsset_createdAt_idx" ON "MediaAsset"("createdAt");

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed default site settings row
INSERT INTO "SiteSettings" ("id", "siteMode", "constructionTitle", "constructionMessage", "updatedAt")
VALUES ('default', 'LIVE', 'We''ll be right back', 'We''re preparing a new experience for Africa''s political parties.', CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
