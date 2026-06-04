import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'
import { makeIssueId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const body = await request.json()
  const { seriesId, number, title, coverDate, pages, price, synopsis, upc, credits } = body

  if (!seriesId || number === undefined || number === null) {
    return NextResponse.json({ error: 'seriesId and number are required' }, { status: 400 })
  }

  const series = await prisma.series.findUnique({ where: { id: seriesId }, select: { id: true } })
  if (!series) return NextResponse.json({ error: 'Series not found' }, { status: 400 })

  const issueNumber = Number(number)
  let id = makeIssueId(seriesId, issueNumber)
  const existing = await prisma.issue.findUnique({ where: { id }, select: { id: true } })
  if (existing) {
    let suffix = 2
    while (await prisma.issue.findUnique({ where: { id: `${id}-${suffix}` }, select: { id: true } })) {
      suffix++
    }
    id = `${id}-${suffix}`
  }

  const issue = await prisma.issue.create({
    data: {
      id,
      seriesId,
      number: issueNumber,
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
  })

  return NextResponse.json({ issue }, { status: 201 })
}
