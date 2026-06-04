import styles from './FormField.module.css'

interface Props {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export default function FormField({ label, required, error, children }: Props) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}{required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
