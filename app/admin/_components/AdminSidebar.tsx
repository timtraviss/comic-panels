'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './AdminSidebar.module.css'

const MEDIA_LINKS = [
  { href: '/admin/covers', label: 'Covers' },
]

const CATALOGUE_LINKS = [
  { href: '/admin/issues', label: 'Issues' },
  { href: '/admin/series', label: 'Series' },
  { href: '/admin/publishers', label: 'Publishers' },
  { href: '/admin/creators', label: 'Creators' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.brand}>PANELS ADMIN</div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Media</div>
        {MEDIA_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${isActive(href) ? styles.active : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Catalogue</div>
        {CATALOGUE_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${isActive(href) ? styles.active : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/api/admin/logout" className={styles.logout}>Logout →</Link>
      </div>
    </nav>
  )
}
