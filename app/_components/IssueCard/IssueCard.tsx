import Link from 'next/link'
import Cover from '@/app/_components/Cover/Cover'
import styles from './IssueCard.module.css'

interface IssueCardProps {
  id: string
  number: number | null
  title: string | null
  seriesName: string
  coverImage: string | null
  paletteBg?: string | null
  paletteAccent?: string | null
}

export default function IssueCard({ id, number, title, seriesName, coverImage, paletteBg, paletteAccent }: IssueCardProps) {
  return (
    <Link href={`/issue/${id}`} className={styles.card}>
      <Cover coverImage={coverImage} alt={`${seriesName} #${number}`} paletteBg={paletteBg} paletteAccent={paletteAccent} size="md" />
      <div className={styles.meta}>
        <span className={styles.series}>{seriesName}</span>
        <span className={styles.number}>{number ? `#${number}` : title ?? '—'}</span>
      </div>
    </Link>
  )
}
