'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SearchInput.module.css'

export default function SearchInput() {
  const [value, setValue] = useState('')
  const router = useRouter()
  const timer = useRef<ReturnType<typeof setTimeout>>()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setValue(q)
    clearTimeout(timer.current)
    if (q.trim().length > 1) {
      timer.current = setTimeout(() => router.push(`/search?q=${encodeURIComponent(q.trim())}`), 220)
    }
  }

  return (
    <input
      type="search"
      placeholder="Search comics..."
      value={value}
      onChange={handleChange}
      className={styles.input}
      aria-label="Search comics"
    />
  )
}
