-- DropForeignKey
ALTER TABLE "SummitSpeaker" DROP CONSTRAINT IF EXISTS "SummitSpeaker_userId_fkey";
ALTER TABLE "ExhibitorProfile" DROP CONSTRAINT IF EXISTS "ExhibitorProfile_userId_fkey";
ALTER TABLE "InnovationSubmission" DROP CONSTRAINT IF EXISTS "InnovationSubmission_userId_fkey";

-- DropTable
DROP TABLE IF EXISTS "SummitSpeaker";
DROP TABLE IF EXISTS "ExhibitorProfile";
DROP TABLE IF EXISTS "InnovationSubmission";

-- AlterEnum: remove speaker/exhibitor/innovation notification kinds
CREATE TYPE "NotificationKind_new" AS ENUM ('SYSTEM', 'VERIFICATION', 'SUMMIT', 'ANNOUNCEMENT');
ALTER TABLE "Notification" ALTER COLUMN "kind" DROP DEFAULT;
ALTER TABLE "Notification" ALTER COLUMN "kind" TYPE "NotificationKind_new" USING (
  CASE "kind"::text
    WHEN 'SPEAKER' THEN 'ANNOUNCEMENT'::"NotificationKind_new"
    WHEN 'EXHIBITOR' THEN 'ANNOUNCEMENT'::"NotificationKind_new"
    WHEN 'INNOVATION' THEN 'ANNOUNCEMENT'::"NotificationKind_new"
    ELSE "kind"::text::"NotificationKind_new"
  END
);
ALTER TABLE "Notification" ALTER COLUMN "kind" SET DEFAULT 'SYSTEM';
DROP TYPE "NotificationKind";
ALTER TYPE "NotificationKind_new" RENAME TO "NotificationKind";
DROP TYPE IF EXISTS "PortalProgramStatus";
