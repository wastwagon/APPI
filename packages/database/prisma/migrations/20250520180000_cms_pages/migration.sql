-- CreateTable
CREATE TABLE "CmsPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmsPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CmsPage_slug_locale_key" ON "CmsPage"("slug", "locale");

-- CreateIndex
CREATE INDEX "CmsPage_locale_idx" ON "CmsPage"("locale");

-- CreateIndex
CREATE INDEX "CmsPage_published_idx" ON "CmsPage"("published");
