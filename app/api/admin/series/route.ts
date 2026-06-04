import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makeSeriesId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { publisherId, name, startYear, endYear, status, genre, description, paletteBg, paletteAccent, paletteInk } = body

  if (!publisherId || !name) {
    return NextResponse.json({ error: 'publisherId and name are required' }, { status: 400 })
  }

  const publisher = await prisma.publisher.findUnique({ where: { id: publisherId }, select: { id: true } })
  if (!publisher) return NextResponse.json({ error: 'Publisher not found' }, { status: 400 })

  let id = makeSeriesId(publisherId, name)
  const existing = await prisma.series.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.series.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const series = await prisma.series.create({
    data: {
      id,
      publisherId,
      name,
      startYear: startYear ? Number(startYear) : null,
      endYear: endYear ? Number(endYear) : null,
      status: status || 'ONGOING',
      genre: genre || null,
      description: description || null,
      paletteBg: paletteBg || null,
      paletteAccent: paletteAccent || null,
      paletteInk: paletteInk || null,
    },
  })

  return NextResponse.json({ series }, { status: 201 })
}
