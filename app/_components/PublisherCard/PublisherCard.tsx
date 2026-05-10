import Link from 'next/link'
import styles from './PublisherCard.module.css'

interface PublisherCardProps {
  id: string
  name: string
  color: string
  bio?: string | null
  hq?: string | null
  seriesCount: number
  issueCount: number
}

export default function PublisherCard({ id, name, color, bio, hq, seriesCount, issueCount }: PublisherCardProps) {
  return (
    <Link href={`/publisher/${id}`} className={styles.card} style={{ '--accent': color } as React.CSSProperties}>
      <div className={styles.overlay} />
      <div className={styles.header}>
        <h2 className={styles.name}>{name}</h2>
        {hq && <span className={styles.hq}>{hq}</span>}
      </div>
      {bio && <p className={styles.bio}>{bio}</p>}
      <div className={styles.divider} />
      <div className={styles.stats}>
        <div className={styles.stat}><span className={styles.statNum}>{seriesCount}</span><span className={styles.statLabel}>Series</span></div>
        <div className={styles.stat}><span className={styles.statNum}>{issueCount}</span><span className={styles.statLabel}>Issues</span></div>
      </div>
    </Link>
  )
}
