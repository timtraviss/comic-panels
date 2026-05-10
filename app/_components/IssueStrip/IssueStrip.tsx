'use client'
import Link from 'next/link'
import Cover from '@/app/_components/Cover/Cover'
import styles from './IssueStrip.module.css'

interface StripIssue {
  id: string
  number: number | null
  coverImage: string | null
  paletteBg?: string | null
  paletteAccent?: string | null
}

export default function IssueStrip({ issues, currentId }: { issues: StripIssue[]; currentId: string }) {
  return (
    <div className={styles.strip}>
      {issues.map(issue => (
        <Link key={issue.id} href={`/issue/${issue.id}`} className={`${styles.item} ${issue.id === currentId ? styles.active : ''}`}>
          <Cover coverImage={issue.coverImage} alt={`#${issue.number}`} paletteBg={issue.paletteBg} paletteAccent={issue.paletteAccent} size="sm" />
        </Link>
      ))}
    </div>
  )
}
