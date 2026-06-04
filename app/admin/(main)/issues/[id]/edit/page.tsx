import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import IssueForm from '../../IssueForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditIssuePage({ params }: { params: { id: string } }) {
  const [issue, seriesList, creators] = await Promise.all([
    prisma.issue.findUnique({
      where: { id: params.id },
      include: { credits: { select: { creatorId: true, role: true } } },
    }),
    prisma.series.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.creator.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!issue) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit issue</h1>
        <Link href="/admin/issues" className={styles.editLink}>← Back</Link>
      </div>
      <IssueForm
        seriesList={seriesList}
        creators={creators}
        issue={{
          id: issue.id,
          seriesId: issue.seriesId,
          number: issue.number,
          title: issue.title,
          coverDate: issue.coverDate ? issue.coverDate.toISOString().slice(0, 7) : null,
          pages: issue.pages,
          price: issue.price ? String(issue.price) : null,
          synopsis: issue.synopsis,
          upc: issue.upc,
          credits: issue.credits.map(c => ({ creatorId: c.creatorId, role: c.role })),
        }}
      />
    </div>
  )
}
