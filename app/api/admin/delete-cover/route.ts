import { NextRequest, NextResponse } from 'next/server'
import { deleteCover } from '@/lib/supabase-storage'
import { prisma } from '@/lib/db'

export async function DELETE(request: NextRequest) {
  const { issueId } = await request.json()

  if (!issueId) {
    return NextResponse.json({ error: 'issueId is required' }, { status: 400 })
  }

  try {
    await deleteCover(issueId)
    await prisma.issue.update({ where: { id: issueId }, data: { coverImage: null } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Delete failed:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
