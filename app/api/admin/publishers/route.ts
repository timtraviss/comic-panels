import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makePublisherId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { name, color, founded, hq, bio } = body

  if (!name || !color) {
    return NextResponse.json({ error: 'name and color are required' }, { status: 400 })
  }

  let id = makePublisherId(name)
  const existing = await prisma.publisher.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.publisher.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const publisher = await prisma.publisher.create({
    data: {
      id,
      name,
      color,
      founded: founded ? Number(founded) : null,
      hq: hq || null,
      bio: bio || null,
    },
  })

  return NextResponse.json({ publisher }, { status: 201 })
}
