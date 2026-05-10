'use client'
import { useState } from 'react'
import styles from './SortToggle.module.css'

export default function SortToggle({ onSort }: { onSort: (desc: boolean) => void }) {
  const [desc, setDesc] = useState(false)
  function toggle() { const next = !desc; setDesc(next); onSort(next) }
  return <button onClick={toggle} className={styles.btn}>Sort: {desc ? 'Newest first' : 'Oldest first'} ↕</button>
}
