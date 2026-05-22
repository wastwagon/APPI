import { NextResponse } from 'next/server'

/** Frontend container health for Coolify */
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'frontend' })
}
