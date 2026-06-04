import Link from 'next/link'
import CreatorForm from '../CreatorForm'
import styles from '../page.module.css'

export default function NewCreatorPage() {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.heading}>Add creator</h1>
        <Link href="/admin/creators" className={styles.editLink}>← Back</Link>
      </div>
      <CreatorForm />
    </div>
  )
}
