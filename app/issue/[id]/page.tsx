import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import Cover from '@/app/_components/Cover/Cover'
import Breadcrumb from '@/app/_components/Breadcrumb/Breadcrumb'
import IssueStrip from '@/app/_components/IssueStrip/IssueStrip'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function IssuePage({ params }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
    include: {
      series: { include: { publisher: true } },
      credits: { include: { creator: true } },
    },
  })
  if (!issue) notFound()

  const allIssues = await prisma.issue.findMany({
    where: { seriesId: issue.seriesId },
    orderBy: { number: 'asc' },
    select: { id: true, number: true, coverImage: true, series: { select: { paletteBg: true, paletteAccent: true } } },
  })

  const idx = allIssues.findIndex((i: { id: string }) => i.id === params.id)
  const prev = idx > 0 ? allIssues[idx - 1] : null
  const next = idx < allIssues.length - 1 ? allIssues[idx + 1] : null

  const { series } = issue
  const publisher = series.publisher

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Publishers', href: '/publishers' },
          { label: publisher.name, href: `/publisher/${publisher.id}` },
          { label: series.name, href: `/series/${series.id}` },
          { label: `#${issue.number}` },
        ]} />

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <Cover
              coverImage={issue.coverImage}
              alt={`${series.name} #${issue.number}`}
              paletteBg={series.paletteBg}
              paletteAccent={series.paletteAccent}
              size="lg"
              priority
            />
            <div className={styles.prevNext}>
              <Link href={prev ? `/issue/${prev.id}` : '#'} className={`${styles.navBtn} ${!prev ? styles.disabled : ''}`} aria-disabled={!prev}>
                <span className={styles.navArrow}>←</span>
                <span className={styles.navLabel}>Previous</span>
                {prev && <span className={styles.navRef}>#{prev.number}</span>}
              </Link>
              <Link href={next ? `/issue/${next.id}` : '#'} className={`${styles.navBtn} ${!next ? styles.disabled : ''}`} aria-disabled={!next}>
                <span className={styles.navLabel}>Next</span>
                <span className={styles.navArrow}>→</span>
                {next && <span className={styles.navRef}>#{next.number}</span>}
              </Link>
            </div>
          </aside>

          <article className={styles.detail}>
            <div className={styles.pubPill} style={{ background: `${publisher.color}22`, color: publisher.color, border: `1px solid ${publisher.color}44` }}>
              {publisher.name}
            </div>
            <Link href={`/series/${series.id}`} className={styles.seriesLink}>{series.name}</Link>

            <h1 className={styles.title}>
              <span className={styles.issueNum}>#{issue.number}</span>
              {issue.title && <span> {issue.title}</span>}
            </h1>

            {issue.synopsis && (
              <p className={styles.synopsis}>{issue.synopsis}</p>
            )}

            <div className={styles.meta}>
              {issue.coverDate && <div className={styles.metaItem}><span className={styles.metaLabel}>Cover date</span><span>{new Date(issue.coverDate).toLocaleDateString('en-NZ', { month: 'long', year: 'numeric' })}</span></div>}
              {issue.pages && <div className={styles.metaItem}><span className={styles.metaLabel}>Pages</span><span>{issue.pages}</span></div>}
              {issue.price && <div className={styles.metaItem}><span className={styles.metaLabel}>Cover price</span><span>${Number(issue.price).toFixed(2)}</span></div>}
            </div>

            {issue.credits.length > 0 && (
              <div className={styles.credits}>
                <h2 className={styles.creditsHead}>Credits</h2>
                <div className={styles.creditsGrid}>
                  {issue.credits.map(c => (
                    <div key={c.id} className={styles.credit}>
                      <div className={styles.avatar} style={{ background: `${series.paletteAccent ?? '#E8743C'}22`, border: `1px solid ${series.paletteAccent ?? '#E8743C'}44`, color: series.paletteAccent ?? '#E8743C' }}>
                        {c.creator.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className={styles.creditRole}>{c.role}</div>
                        <div className={styles.creditName}>{c.creator.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.stripSection}>
              <div className={styles.stripHead}>The run · {series.name}</div>
              <IssueStrip
                issues={allIssues.map(i => ({ id: i.id, number: i.number, coverImage: i.coverImage, paletteBg: i.series.paletteBg, paletteAccent: i.series.paletteAccent }))}
                currentId={params.id}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
