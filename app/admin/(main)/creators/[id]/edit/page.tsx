import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import CreatorForm from '../../CreatorForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditCreatorPage({ params }: { params: { id: string } }) {
  const creator = await prisma.creator.findUnique({ where: { id: params.id } })
  if (!creator) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit creator</h1>
        <Link href="/admin/creators" className={styles.editLink}>← Back</Link>
      </div>
      <CreatorForm creator={{ id: creator.id, name: creator.name, bio: creator.bio }} />
    </div>
  )
}
