/**
 * Promote a user to admin by email.
 * Usage: DATABASE_URL=... pnpm --filter @appi/api exec tsx src/scripts/promote-admin.ts admin@example.com
 */
import { prisma, UserRole } from '@appi/database'

const email = process.argv[2]
if (!email) {
  console.error('Usage: tsx src/scripts/promote-admin.ts <email>')
  process.exit(1)
}

const user = await prisma.user.update({
  where: { email: email.toLowerCase() },
  data: { role: UserRole.ADMIN },
})

console.log(`Promoted ${user.email} to ADMIN`)
