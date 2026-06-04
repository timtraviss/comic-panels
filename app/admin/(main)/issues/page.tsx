import Link from 'next/link'
import { prisma } from '@/lib/db'
import IssuesTable from './IssuesTable'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany({
    orderBy: [{ series: { name: 'asc' } }, { number: 'asc' }],
    select: {
      id: true,
      number: true,
      title: true,
      coverImage: true,
      series: {
        select: {
          name: true,
          publisher: { select: { name: true } },
        },
      },
    },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Issues</h1>
        <Link href="/admin/issues/new" className={styles.addBtn}>+ Add issue</Link>
      </div>
      <IssuesTable issues={issues} />
    </div>
  )
}
