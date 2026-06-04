import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany({
    orderBy: [{ series: { name: 'asc' } }, { number: 'asc' }],
    select: {
      id: true,
      number: true,
      title: true,
      coverImage: true,
      series: { select: { name: true } },
    },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Issues</h1>
        <Link href="/admin/issues/new" className={styles.addBtn}>+ Add issue</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Series</th>
            <th>#</th>
            <th>Title</th>
            <th>Cover</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {issues.map(i => (
            <tr key={i.id}>
              <td>{i.series.name}</td>
              <td>{i.number}</td>
              <td>{i.title ?? '—'}</td>
              <td>{i.coverImage ? <span className={styles.hasCover}>✓</span> : <span className={styles.noCover}>—</span>}</td>
              <td><Link href={`/admin/issues/${i.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {issues.length === 0 && <p className={styles.empty}>No issues yet.</p>}
    </div>
  )
}
