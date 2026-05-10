import { prisma } from '@/lib/db'
import IssueCard from '@/app/_components/IssueCard/IssueCard'
import Breadcrumb from '@/app/_components/Breadcrumb/Breadcrumb'
import PublisherChip from '@/app/_components/PublisherChip/PublisherChip'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function IssuesListPage() {
  const [issues, publishers] = await Promise.all([
    prisma.issue.findMany({
      include: { series: { include: { publisher: true } } },
      orderBy: [{ series: { name: 'asc' } }, { number: 'asc' }],
    }),
    prisma.publisher.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Issues' }]} />
        <p className={styles.eyebrow}>Browse all issues</p>
        <h1 className={styles.heading}>Issues</h1>
        <div className={styles.chips}>
          {publishers.map(p => <PublisherChip key={p.id} id={p.id} name={p.name} color={p.color} />)}
        </div>
        <div className={styles.grid}>
          {issues.map(issue => (
            <IssueCard
              key={issue.id} id={issue.id} number={issue.number} title={issue.title}
              seriesName={issue.series.name} coverImage={issue.coverImage}
              paletteBg={issue.series.paletteBg} paletteAccent={issue.series.paletteAccent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
