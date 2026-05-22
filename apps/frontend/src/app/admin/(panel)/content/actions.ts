'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateCmsLocale(locale: string) {
  revalidateTag(`cms-${locale}`)
}

export async function revalidateAllCms() {
  for (const locale of ['en', 'fr', 'ar']) {
    revalidateTag(`cms-${locale}`)
  }
}
