'use client'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Cover from '@/app/_components/Cover/Cover'
import styles from './CoverLightbox.module.css'

interface CoverLightboxProps {
  coverImage: string | null
  alt: string
  paletteBg?: string | null
  paletteAccent?: string | null
}

export default function CoverLightbox({ coverImage, alt, paletteBg, paletteAccent }: CoverLightboxProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!coverImage) {
    return (
      <Cover
        coverImage={null}
        alt={alt}
        paletteBg={paletteBg}
        paletteAccent={paletteAccent}
        size="lg"
        priority
      />
    )
  }

  const src = coverImage.startsWith('https://') ? coverImage : `/covers/${coverImage}`

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label={`View cover: ${alt}`}
      >
        <Cover
          coverImage={coverImage}
          alt={alt}
          paletteBg={paletteBg}
          paletteAccent={paletteAccent}
          size="lg"
          priority
        />
      </button>

      {mounted && open && createPortal(
        <div
          className={styles.overlay}
          onClick={close}
          role="dialog"
          aria-label="Cover image"
          aria-modal="true"
        >
          <div className={styles.imageWrap}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
