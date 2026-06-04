import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import SeriesForm from '../../SeriesForm'
import styles from '../../page.module.css'

export const dynamic = 'force-dynamic'

export default async function EditSeriesPage({ params }: { params: { id: string } }) {
  const [series, publishers] = await Promise.all([
    prisma.series.findUnique({ where: { id: params.id } }),
    prisma.publisher.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!series) notFound()

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Edit series</h1>
        <Link href="/admin/series" className={styles.editLink}>← Back</Link>
      </div>
      <SeriesForm publishers={publishers} series={{
        id: series.id,
        name: series.name,
        publisherId: series.publisherId,
        startYear: series.startYear,
        endYear: series.endYear,
        status: series.status,
        genre: series.genre,
        description: series.description,
        paletteBg: series.paletteBg,
        paletteAccent: series.paletteAccent,
        paletteInk: series.paletteInk,
      }} />
    </div>
  )
}
