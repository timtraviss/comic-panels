import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import SeriesCard from '@/app/_components/SeriesCard/SeriesCard'
import Breadcrumb from '@/app/_components/Breadcrumb/Breadcrumb'
import { PUBLISHER_META } from '@/lib/publishers'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function PublisherPage({ params }: { params: { id: string } }) {
  const publisher = await prisma.publisher.findUnique({
    where: { id: params.id },
    include: {
      series: {
        include: {
          issues: { orderBy: { number: 'asc' }, take: 1, select: { coverImage: true, id: true } },
          _count: { select: { issues: true } },
        },
        orderBy: { name: 'asc' },
      },
    },
  })
  if (!publisher) notFound()

  const meta = PUBLISHER_META[publisher.id]
  const issueCount = publisher.series.reduce((sum, s) => sum + s._count.issues, 0)

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Publishers', href: '/publishers' },
          { label: publisher.name },
        ]} />

        <div className={styles.banner} style={{ '--accent': publisher.color } as React.CSSProperties}>
          <div className={styles.bannerInner}>
            <div>
              <p className={styles.eyebrow}>Publisher</p>
              <h1 className={styles.name} style={{ color: publisher.color }}>{publisher.name}</h1>
              <p className={styles.bio}>{meta?.bio ?? publisher.bio ?? ''}</p>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum} style={{ color: publisher.color }}>{publisher.series.length}</span>
                <span className={styles.statLabel}>Series</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum} style={{ color: publisher.color }}>{issueCount}</span>
                <span className={styles.statLabel}>Issues</span>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.catalogue}>
          <h2 className={styles.sectionHead}>Series</h2>
          <div className={styles.grid}>
            {publisher.series.map(s => (
              <SeriesCard
                key={s.id}
                id={s.id}
                name={s.name}
                publisherName={publisher.name}
                publisherColor={publisher.color}
                status={s.status}
                issueCount={s._count.issues}
                firstIssueCover={s.issues[0]?.coverImage ?? null}
                paletteBg={s.paletteBg}
                paletteAccent={s.paletteAccent}
                startYear={s.startYear}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
