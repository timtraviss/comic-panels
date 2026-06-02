import { NextRequest, NextResponse } from 'next/server'
import { uploadCover } from '@/lib/supabase-storage'
import { prisma } from '@/lib/db'

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const issueId = formData.get('issueId') as string | null
  const file = formData.get('file') as File | null

  if (!issueId || !file) {
    return NextResponse.json({ error: 'issueId and file are required' }, { status: 400 })
  }

  if (!VALID_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'File must be JPEG, PNG, or WebP' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File must be under 5MB' }, { status: 400 })
  }

  const existing = await prisma.issue.findUnique({ where: { id: issueId }, select: { id: true } })
  if (!existing) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const url = await uploadCover(issueId, buffer, file.type)
    await prisma.issue.update({ where: { id: issueId }, data: { coverImage: url } })
    return NextResponse.json({ url })
  } catch (err) {
    console.error('Upload failed:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
