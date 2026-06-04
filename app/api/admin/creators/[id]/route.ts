import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { name, bio } = await request.json()
  if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 })

  const creator = await prisma.creator.update({
    where: { id: params.id },
    data: { name, bio: bio || null },
  })
  return NextResponse.json({ creator })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const creator = await prisma.creator.findUnique({ where: { id: params.id }, select: { id: true } })
  if (!creator) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.creator.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
