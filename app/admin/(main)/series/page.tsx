import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function SeriesPage() {
  const series = await prisma.series.findMany({
    orderBy: [{ publisher: { name: 'asc' } }, { name: 'asc' }],
    include: {
      publisher: { select: { name: true } },
      _count: { select: { issues: true } },
    },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Series</h1>
        <Link href="/admin/series/new" className={styles.addBtn}>+ Add series</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Publisher</th>
            <th>Status</th>
            <th>Issues</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {series.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.publisher.name}</td>
              <td><span className={styles.status}>{s.status}</span></td>
              <td>{s._count.issues}</td>
              <td><Link href={`/admin/series/${s.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {series.length === 0 && <p className={styles.empty}>No series yet.</p>}
    </div>
  )
}
