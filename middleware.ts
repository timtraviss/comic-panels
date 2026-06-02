import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

function expectedToken(): string {
  if (!process.env.ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD env var is not set')
  return createHmac('sha256', process.env.ADMIN_PASSWORD).update('panels-admin').digest('hex')
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin_session')?.value
  const expected = expectedToken()
  const sessionBuf = Buffer.from(session ?? '')
  const expectedBuf = Buffer.from(expected)
  if (sessionBuf.length !== expectedBuf.length || !timingSafeEqual(sessionBuf, expectedBuf)) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
