import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { name, color, founded, hq, bio } = body

  if (!name || !color) {
    return NextResponse.json({ error: 'name and color are required' }, { status: 400 })
  }

  const publisher = await prisma.publisher.update({
    where: { id: params.id },
    data: {
      name,
      color,
      founded: founded ? Number(founded) : null,
      hq: hq || null,
      bio: bio || null,
    },
  })

  return NextResponse.json({ publisher })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const publisher = await prisma.publisher.findUnique({
    where: { id: params.id },
    include: { _count: { select: { series: true } } },
  })
  if (!publisher) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.publisher.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
