import Link from 'next/link'
import SearchInput from '@/app/_components/SearchInput/SearchInput'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>P!</span>
          <span className={styles.wordmark}>PANELS</span>
        </Link>
        <nav className={styles.links}>
          <Link href="/publishers" className={styles.link}>Publishers</Link>
          <Link href="/series" className={styles.link}>Series</Link>
          <Link href="/issues" className={styles.link}>Issues</Link>
        </nav>
        <SearchInput />
      </div>
    </header>
  )
}
