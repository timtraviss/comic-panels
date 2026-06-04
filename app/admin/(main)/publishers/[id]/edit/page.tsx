import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import PublisherForm from '../../PublisherForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditPublisherPage({ params }: { params: { id: string } }) {
  const publisher = await prisma.publisher.findUnique({ where: { id: params.id } })
  if (!publisher) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit publisher</h1>
        <Link href="/admin/publishers" className={styles.editLink}>← Back</Link>
      </div>
      <PublisherForm publisher={{
        id: publisher.id,
        name: publisher.name,
        color: publisher.color,
        founded: publisher.founded,
        hq: publisher.hq,
        bio: publisher.bio,
      }} />
    </div>
  )
}
