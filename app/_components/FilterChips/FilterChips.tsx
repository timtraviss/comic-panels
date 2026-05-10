'use client'
import { useState } from 'react'
import styles from './FilterChips.module.css'

interface FilterChipsProps {
  options: string[]
  onChange: (active: string | null) => void
}

export default function FilterChips({ options, onChange }: FilterChipsProps) {
  const [active, setActive] = useState<string | null>(null)
  function select(opt: string) {
    const next = active === opt ? null : opt
    setActive(next)
    onChange(next)
  }
  return (
    <div className={styles.chips}>
      {options.map(opt => (
        <button key={opt} onClick={() => select(opt)} className={`${styles.chip} ${active === opt ? styles.active : ''}`}>{opt}</button>
      ))}
    </div>
  )
}
