import { createHmac, timingSafeEqual } from 'crypto'

export function isValidAdminSession(session: string | undefined): boolean {
  if (!process.env.ADMIN_PASSWORD) return false
  const expected = createHmac('sha256', process.env.ADMIN_PASSWORD).update('panels-admin').digest('hex')
  const sessionBuf = Buffer.from(session ?? '')
  const expectedBuf = Buffer.from(expected)
  return sessionBuf.length === expectedBuf.length && timingSafeEqual(sessionBuf, expectedBuf)
}
