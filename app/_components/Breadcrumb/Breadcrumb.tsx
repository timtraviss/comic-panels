import Link from 'next/link'
import styles from './Breadcrumb.module.css'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span key={i} className={styles.item}>
          {i > 0 && <span className={styles.sep} aria-hidden>→</span>}
          {c.href ? <Link href={c.href} className={styles.link}>{c.label}</Link> : <span className={styles.current}>{c.label}</span>}
        </span>
      ))}
    </nav>
  )
}
