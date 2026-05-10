import { prisma } from '@/lib/db'
import IssueCard from '@/app/_components/IssueCard/IssueCard'
import SeriesCard from '@/app/_components/SeriesCard/SeriesCard'
import PublisherChip from '@/app/_components/PublisherChip/PublisherChip'
import Breadcrumb from '@/app/_components/Breadcrumb/Breadcrumb'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: rawQ } = await searchParams
  const q = rawQ?.trim() ?? ''

  if (!q) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
          <p className={styles.empty}>Type something in the search bar above.</p>
        </div>
      </div>
    )
  }

  const [publishers, series, issues] = await Promise.all([
    prisma.publisher.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
    }),
    prisma.series.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
      include: {
        publisher: true,
        issues: { orderBy: { number: 'asc' }, take: 1, select: { coverImage: true } },
        _count: { select: { issues: true } },
      },
      take: 20,
    }),
    prisma.issue.findMany({
      where: {
        OR: [
          { series: { name: { contains: q, mode: 'insensitive' } } },
          { title: { contains: q, mode: 'insensitive' } },
          { credits: { some: { creator: { name: { contains: q, mode: 'insensitive' } } } } },
        ],
      },
      include: { series: { include: { publisher: true } } },
      take: 28,
    }),
  ])

  const total = publishers.length + series.length + issues.length

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: `Search: ${q}` }]} />
        <h1 className={styles.heading}>Results for &ldquo;{q}&rdquo;</h1>
        <p className={styles.count}>{total} result{total !== 1 ? 's' : ''}</p>

        {publishers.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Publishers</h2>
            <div className={styles.pubChips}>
              {publishers.map(p => <PublisherChip key={p.id} id={p.id} name={p.name} color={p.color} />)}
            </div>
          </section>
        )}

        {series.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Series</h2>
            <div className={styles.seriesGrid}>
              {series.map(s => (
                <SeriesCard key={s.id} id={s.id} name={s.name}
                  publisherName={s.publisher.name} publisherColor={s.publisher.color}
                  status={s.status} issueCount={s._count.issues}
                  firstIssueCover={s.issues[0]?.coverImage ?? null}
                  paletteBg={s.paletteBg} paletteAccent={s.paletteAccent} />
              ))}
            </div>
          </section>
        )}

        {issues.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionHead}>Issues</h2>
            <div className={styles.issueGrid}>
              {issues.map(issue => (
                <IssueCard key={issue.id} id={issue.id} number={issue.number} title={issue.title}
                  seriesName={issue.series.name} coverImage={issue.coverImage}
                  paletteBg={issue.series.paletteBg} paletteAccent={issue.series.paletteAccent} />
              ))}
            </div>
          </section>
        )}

        {total === 0 && (
          <p className={styles.empty}>No matches for &ldquo;{q}&rdquo; — try a different term.</p>
        )}
      </div>
    </div>
  )
}
