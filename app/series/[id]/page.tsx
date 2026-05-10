import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import Cover from '@/app/_components/Cover/Cover'
import IssueCard from '@/app/_components/IssueCard/IssueCard'
import Breadcrumb from '@/app/_components/Breadcrumb/Breadcrumb'
import StatusBadge from '@/app/_components/StatusBadge/StatusBadge'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function SeriesPage({ params }: { params: { id: string } }) {
  const series = await prisma.series.findUnique({
    where: { id: params.id },
    include: {
      publisher: true,
      issues: { orderBy: { number: 'asc' } },
    },
  })
  if (!series) notFound()

  const { publisher, issues } = series
  const first = issues[0]

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Publishers', href: '/publishers' },
          { label: publisher.name, href: `/publisher/${publisher.id}` },
          { label: series.name },
        ]} />

        <div className={styles.header}>
          <div className={styles.coverCol}>
            {first && <Cover coverImage={first.coverImage} alt={series.name} paletteBg={series.paletteBg} paletteAccent={series.paletteAccent} size="lg" priority />}
          </div>
          <div className={styles.info}>
            <div className={styles.eyebrow} style={{ color: publisher.color }}>
              {publisher.name}{series.genre ? ` · ${series.genre}` : ''}
            </div>
            <h1 className={styles.title}>{series.name}</h1>
            <div className={styles.metaRow}>
              {series.startYear && <span>{series.startYear}{series.endYear ? `–${series.endYear}` : '–'}</span>}
              <span>{issues.length} issues</span>
              <StatusBadge status={series.status} />
            </div>
            {series.description && <p className={styles.desc}>{series.description}</p>}
            {first && (
              <Link href={`/issue/${first.id}`} className={styles.cta}>Start with #1 →</Link>
            )}
          </div>
        </div>

        <section className={styles.issuesSection}>
          <h2 className={styles.sectionHead}>All issues</h2>
          <div className={styles.grid}>
            {issues.map(issue => (
              <IssueCard
                key={issue.id}
                id={issue.id}
                number={issue.number}
                title={issue.title}
                seriesName={series.name}
                coverImage={issue.coverImage}
                paletteBg={series.paletteBg}
                paletteAccent={series.paletteAccent}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
