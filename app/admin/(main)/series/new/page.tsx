import Link from 'next/link'
import { prisma } from '@/lib/db'
import SeriesForm from '../SeriesForm'
import styles from '../page.module.css'

export const dynamic = 'force-dynamic'

export default async function NewSeriesPage() {
  const publishers = await prisma.publisher.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add series</h1>
        <Link href="/admin/series" className={styles.editLink}>← Back</Link>
      </div>
      <SeriesForm publishers={publishers} />
    </div>
  )
}
