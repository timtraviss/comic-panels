import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function isValidSession(session: string | undefined): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD
  if (!password || !session) return false

  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode('panels-admin'))
  const expected = Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  if (session.length !== expected.length) return false
  let diff = 0
  for (let i = 0; i < session.length; i++) {
    diff |= session.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return diff === 0
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin_session')?.value
  if (!(await isValidSession(session))) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
