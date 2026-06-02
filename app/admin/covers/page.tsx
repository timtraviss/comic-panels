import { prisma } from '@/lib/db'
import CoverGrid from './CoverGrid'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function AdminCoversPage() {
  const issues = await prisma.issue.findMany({
    orderBy: [{ series: { name: 'asc' } }, { number: 'asc' }],
    select: {
      id: true,
      title: true,
      number: true,
      coverImage: true,
      series: { select: { name: true } },
    },
  })

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Cover images</h1>
          <span className={styles.count}>{issues.length} issues total</span>
        </div>
        <CoverGrid issues={issues} />
      </div>
    </div>
  )
}
