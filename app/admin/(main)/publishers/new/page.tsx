import Link from 'next/link'
import PublisherForm from '../PublisherForm'
import styles from '../page.module.css'

export default function NewPublisherPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add publisher</h1>
        <Link href="/admin/publishers" className={styles.editLink}>← Back</Link>
      </div>
      <PublisherForm />
    </div>
  )
}
