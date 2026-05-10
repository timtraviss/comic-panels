import { prisma } from '@/lib/db'
import PublisherCard from '@/app/_components/PublisherCard/PublisherCard'
import Breadcrumb from '@/app/_components/Breadcrumb/Breadcrumb'
import { PUBLISHER_META } from '@/lib/publishers'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function PublishersPage() {
  const publishers = await prisma.publisher.findMany({
    include: { _count: { select: { series: true } } },
    orderBy: { name: 'asc' },
  })

  const withIssueCounts = await Promise.all(
    publishers.map(async p => {
      const issueCount = await prisma.issue.count({ where: { series: { publisherId: p.id } } })
      return { ...p, issueCount }
    })
  )

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Publishers' }]} />
        <p className={styles.eyebrow}>Browse by publisher</p>
        <h1 className={styles.heading}>Publishers</h1>
        <p className={styles.lede}>Every publisher in the collection, from Marvel to Fleetway Quality.</p>
        <div className={styles.grid}>
          {withIssueCounts.map(p => {
            const meta = PUBLISHER_META[p.id]
            return (
              <PublisherCard
                key={p.id}
                id={p.id}
                name={p.name}
                color={p.color}
                bio={meta?.bio ?? p.bio}
                hq={meta?.hq ?? p.hq}
                seriesCount={p._count.series}
                issueCount={p.issueCount}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
