import Link from 'next/link'
import { prisma } from '@/lib/db'
import IssueCard from '@/app/_components/IssueCard/IssueCard'
import SeriesCard from '@/app/_components/SeriesCard/SeriesCard'
import PublisherChip from '@/app/_components/PublisherChip/PublisherChip'
import Cover from '@/app/_components/Cover/Cover'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [publishers, recentIssues, featuredSeries, totalIssues, totalSeries] = await Promise.all([
    prisma.publisher.findMany({ orderBy: { name: 'asc' } }),
    prisma.issue.findMany({
      take: 14,
      orderBy: { id: 'desc' },
      include: { series: { include: { publisher: true } } },
    }),
    prisma.series.findMany({
      take: 10,
      orderBy: { name: 'asc' },
      include: {
        publisher: true,
        issues: { orderBy: { number: 'asc' }, take: 1, select: { coverImage: true } },
        _count: { select: { issues: true } },
      },
    }),
    prisma.issue.count(),
    prisma.series.count(),
  ])

  const heroIssues = recentIssues.slice(0, 3)

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <p className={styles.eyebrow}>A reading-first comic database</p>
            <h1 className={styles.heroTitle}>Every issue.<br/>Every cover.<br/>Every run.</h1>
            <p className={styles.heroLede}>A personal catalogue of {totalIssues} issues across {totalSeries} series — browse by publisher, series, or issue.</p>
            <div className={styles.heroCtas}>
              <Link href="/publishers" className={styles.ctaPrimary}>Browse publishers →</Link>
              <Link href="/series" className={styles.ctaGhost}>All series</Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}><span className={styles.statNum}>{totalIssues}</span><span className={styles.statLabel}>Issues</span></div>
              <div className={styles.stat}><span className={styles.statNum}>{totalSeries}</span><span className={styles.statLabel}>Series</span></div>
              <div className={styles.stat}><span className={styles.statNum}>{publishers.length}</span><span className={styles.statLabel}>Publishers</span></div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroStack}>
              {heroIssues.map((issue, i) => (
                <div key={issue.id} className={styles.heroCard} style={{ transform: `rotate(${[-6, 2, -2][i]}deg)` }}>
                  <Cover coverImage={issue.coverImage} alt={`${issue.series.name} #${issue.number}`} paletteBg={issue.series.paletteBg} paletteAccent={issue.series.paletteAccent} size="lg" priority={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publisher chips */}
        <section className={styles.section}>
          <div className={styles.pubChips}>
            {publishers.map(p => <PublisherChip key={p.id} id={p.id} name={p.name} color={p.color} />)}
          </div>
        </section>

        {/* Recently added */}
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>Recently added</h2>
          <div className={styles.issueGrid}>
            {recentIssues.map(issue => (
              <IssueCard key={issue.id} id={issue.id} number={issue.number} title={issue.title}
                seriesName={issue.series.name} coverImage={issue.coverImage}
                paletteBg={issue.series.paletteBg} paletteAccent={issue.series.paletteAccent} />
            ))}
          </div>
        </section>

        {/* Featured series */}
        <section className={styles.section}>
          <h2 className={styles.sectionHead}>Series</h2>
          <div className={styles.seriesScroll}>
            {featuredSeries.map(s => (
              <SeriesCard key={s.id} id={s.id} name={s.name}
                publisherName={s.publisher.name} publisherColor={s.publisher.color}
                status={s.status} issueCount={s._count.issues}
                firstIssueCover={s.issues[0]?.coverImage ?? null}
                paletteBg={s.paletteBg} paletteAccent={s.paletteAccent} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
