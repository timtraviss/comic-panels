import { prisma } from '@/lib/db'
import SeriesCard from '@/app/_components/SeriesCard/SeriesCard'
import Breadcrumb from '@/app/_components/Breadcrumb/Breadcrumb'
import PublisherChip from '@/app/_components/PublisherChip/PublisherChip'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function SeriesListPage() {
  const [allSeries, publishers] = await Promise.all([
    prisma.series.findMany({
      include: {
        publisher: true,
        issues: { orderBy: { number: 'asc' }, take: 1, select: { coverImage: true } },
        _count: { select: { issues: true } },
      },
      orderBy: { name: 'asc' },
    }),
    prisma.publisher.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Series' }]} />
        <p className={styles.eyebrow}>Browse all series</p>
        <h1 className={styles.heading}>Series</h1>
        <div className={styles.chips}>
          {publishers.map(p => <PublisherChip key={p.id} id={p.id} name={p.name} color={p.color} />)}
        </div>
        <div className={styles.grid}>
          {allSeries.map(s => (
            <SeriesCard
              key={s.id} id={s.id} name={s.name}
              publisherName={s.publisher.name} publisherColor={s.publisher.color}
              status={s.status} issueCount={s._count.issues}
              firstIssueCover={s.issues[0]?.coverImage ?? null}
              paletteBg={s.paletteBg} paletteAccent={s.paletteAccent}
              startYear={s.startYear}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
