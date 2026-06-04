import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makeCreatorId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { name, bio } = body

  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }

  let id = makeCreatorId(name)
  const existing = await prisma.creator.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.creator.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const creator = await prisma.creator.create({
    data: { id, name, bio: bio || null },
  })

  return NextResponse.json({ creator }, { status: 201 })
}
