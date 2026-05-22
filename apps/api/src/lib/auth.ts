import { createHash, randomBytes } from 'crypto'
import bcrypt from 'bcryptjs'
import * as jose from 'jose'
import { getRedis } from './redis.js'

const ACCESS_TTL = '15m'
const REFRESH_TTL_SEC = 60 * 60 * 24 * 7 // 7 days

function getSecrets() {
  const access = process.env.JWT_SECRET
  const refresh = process.env.JWT_REFRESH_SECRET
  if (!access || !refresh) throw new Error('JWT secrets not configured')
  return {
    access: new TextEncoder().encode(access),
    refresh: new TextEncoder().encode(refresh),
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function signAccessToken(payload: { sub: string; role: string; email: string }) {
  const { access } = getSecrets()
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .sign(access)
}

export async function verifyAccessToken(token: string) {
  const { access } = getSecrets()
  const { payload } = await jose.jwtVerify(token, access)
  return payload as jose.JWTPayload & { sub: string; role: string; email: string }
}

export function createRefreshToken(): string {
  return randomBytes(32).toString('base64url')
}

export async function storeRefreshToken(token: string, userId: string) {
  const redis = getRedis()
  if (!redis) return
  try {
    if (redis.status !== 'ready') await redis.connect()
    await redis.setex(`refresh:${token}`, REFRESH_TTL_SEC, userId)
  } catch {
    /* login still succeeds; refresh tokens unavailable until Redis is up */
  }
}

export async function resolveRefreshToken(token: string): Promise<string | null> {
  const redis = getRedis()
  if (!redis) return null
  try {
    if (redis.status !== 'ready') await redis.connect()
    return redis.get(`refresh:${token}`)
  } catch {
    return null
  }
}

export async function revokeRefreshToken(token: string) {
  const redis = getRedis()
  if (!redis) return
  try {
    if (redis.status !== 'ready') await redis.connect()
    await redis.del(`refresh:${token}`)
  } catch {
    /* ignore */
  }
}

export function tokenFingerprint(token: string): string {
  return createHash('sha256').update(token).digest('hex').slice(0, 16)
}
