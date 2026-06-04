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
  const { seriesId, number, title, coverDate, pages, price, synopsis, upc, credits } = body

  if (!seriesId || number === undefined || number === null) {
    return NextResponse.json({ error: 'seriesId and number are required' }, { status: 400 })
  }

  await prisma.$transaction([
    prisma.issueCredit.deleteMany({ where: { issueId: params.id } }),
    prisma.issue.update({
      where: { id: params.id },
      data: {
        seriesId,
        number: Number(number),
        title: title || null,
        coverDate: coverDate ? new Date(coverDate) : null,
        pages: pages ? Number(pages) : null,
        price: price ? String(price) : null,
        synopsis: synopsis || null,
        upc: upc || null,
        credits: credits?.length
          ? { create: (credits as { creatorId: string; role: string }[]).map(c => ({ creatorId: c.creatorId, role: c.role as any })) }
          : undefined,
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const issue = await prisma.issue.findUnique({ where: { id: params.id }, select: { id: true } })
  if (!issue) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.issue.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
