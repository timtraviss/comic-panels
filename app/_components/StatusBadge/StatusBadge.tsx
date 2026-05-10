import styles from './StatusBadge.module.css'

type Status = 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'HIATUS'
const LABELS: Record<Status, string> = { ONGOING: 'Ongoing', COMPLETED: 'Completed', CANCELLED: 'Cancelled', HIATUS: 'Hiatus' }

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={`${styles.badge} ${styles[status.toLowerCase()]}`}>{LABELS[status]}</span>
}
