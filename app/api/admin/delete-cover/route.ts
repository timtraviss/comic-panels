import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteCover } from '@/lib/supabase-storage'
import { prisma } from '@/lib/db'
import { isValidAdminSession } from '@/lib/admin-auth'

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()
  if (!isValidAdminSession(cookieStore.get('admin_session')?.value)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let issueId: string | undefined
  try {
    const body = await request.json()
    issueId = body?.issueId
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!issueId) {
    return NextResponse.json({ error: 'issueId is required' }, { status: 400 })
  }

  try {
    await deleteCover(issueId)
  } catch (storageErr) {
    console.error('Storage delete failed (continuing to clear DB):', storageErr)
  }

  try {
    await prisma.issue.update({ where: { id: issueId }, data: { coverImage: null } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Delete cover DB update failed:', err)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
