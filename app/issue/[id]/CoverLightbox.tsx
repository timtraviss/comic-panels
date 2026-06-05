'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
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
  const triggerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (open) overlayRef.current?.focus()
  }, [open])

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
        ref={triggerRef}
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
          ref={overlayRef}
          tabIndex={-1}
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
              sizes="(max-aspect-ratio: 2/3) calc(90vh * 2 / 3), 90vw"
              style={{ objectFit: 'contain' }}
              priority={false}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
