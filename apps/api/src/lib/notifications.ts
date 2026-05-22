import { prisma, type NotificationKind } from '@appi/database'

export async function createNotification(opts: {
  userId: string
  kind: NotificationKind
  title: string
  body: string
  href?: string
}) {
  return prisma.notification.create({
    data: {
      userId: opts.userId,
      kind: opts.kind,
      title: opts.title,
      body: opts.body,
      href: opts.href,
    },
  })
}
