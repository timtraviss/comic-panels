import Link from 'next/link'
import styles from './PublisherChip.module.css'

interface PublisherChipProps {
  id: string
  name: string
  color: string
  issueCount?: number
}

export default function PublisherChip({ id, name, color, issueCount }: PublisherChipProps) {
  return (
    <Link href={`/publisher/${id}`} className={styles.chip} style={{ '--accent': color } as React.CSSProperties}>
      <span className={styles.name}>{name}</span>
      {issueCount !== undefined && <span className={styles.count}>{issueCount}</span>}
    </Link>
  )
}
