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
  const { publisherId, name, startYear, endYear, status, genre, description, paletteBg, paletteAccent, paletteInk } = body

  if (!publisherId || !name) {
    return NextResponse.json({ error: 'publisherId and name are required' }, { status: 400 })
  }

  const series = await prisma.series.update({
    where: { id: params.id },
    data: {
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
  return NextResponse.json({ series })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const series = await prisma.series.findUnique({ where: { id: params.id }, select: { id: true } })
  if (!series) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.series.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
