import Link from 'next/link'
import { prisma } from '@/lib/db'
import IssueForm from '../IssueForm'
import styles from '../page.module.css'

export const dynamic = 'force-dynamic'

export default async function NewIssuePage() {
  const [seriesList, creators, publishers] = await Promise.all([
    prisma.series.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, publisherId: true } }),
    prisma.creator.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.publisher.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add issue</h1>
        <Link href="/admin/issues" className={styles.editLink}>← Back</Link>
      </div>
      <IssueForm seriesList={seriesList} creators={creators} publishers={publishers} />
    </div>
  )
}
