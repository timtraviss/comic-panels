import Link from 'next/link'
import { prisma } from '@/lib/db'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export default async function CreatorsPage() {
  const creators = await prisma.creator.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { credits: true } } },
  })

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Creators</h1>
        <Link href="/admin/creators/new" className={styles.addBtn}>+ Add creator</Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Credits</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {creators.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c._count.credits}</td>
              <td><Link href={`/admin/creators/${c.id}/edit`} className={styles.editLink}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {creators.length === 0 && <p className={styles.empty}>No creators yet.</p>}
    </div>
  )
}
