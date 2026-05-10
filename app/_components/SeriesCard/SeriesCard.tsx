import Link from 'next/link'
import Cover from '@/app/_components/Cover/Cover'
import StatusBadge from '@/app/_components/StatusBadge/StatusBadge'
import styles from './SeriesCard.module.css'

interface SeriesCardProps {
  id: string
  name: string
  publisherName: string
  publisherColor: string
  status: 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'HIATUS'
  issueCount: number
  firstIssueCover: string | null
  paletteBg?: string | null
  paletteAccent?: string | null
  startYear?: number | null
}

export default function SeriesCard({ id, name, publisherName, publisherColor, status, issueCount, firstIssueCover, paletteBg, paletteAccent, startYear }: SeriesCardProps) {
  return (
    <Link href={`/series/${id}`} className={styles.card}>
      <Cover coverImage={firstIssueCover} alt={name} paletteBg={paletteBg} paletteAccent={paletteAccent} size="md" />
      <div className={styles.meta}>
        <span className={styles.publisher} style={{ color: publisherColor }}>{publisherName}</span>
        <span className={styles.name}>{name}</span>
        <div className={styles.row}>
          <StatusBadge status={status} />
          <span className={styles.count}>{issueCount} issues</span>
        </div>
      </div>
    </Link>
  )
}
