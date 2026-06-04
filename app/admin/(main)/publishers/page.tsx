import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function PublishersPage() {
  const publishers = await prisma.publisher.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { series: true } } },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Publishers</h1>
        <Link href="/admin/publishers/new" className={styles.addBtn}>+ Add publisher</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Colour</th>
            <th>Series</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {publishers.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td><span className={styles.swatch} style={{ background: p.color }} />{p.color}</td>
              <td>{p._count.series}</td>
              <td><Link href={`/admin/publishers/${p.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {publishers.length === 0 && <p className={styles.empty}>No publishers yet.</p>}
    </div>
  )
}
