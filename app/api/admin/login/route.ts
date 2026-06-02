import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = createHmac('sha256', process.env.ADMIN_PASSWORD!).update('panels-admin').digest('hex')
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'strict',
  })

  return NextResponse.json({ ok: true })
}
