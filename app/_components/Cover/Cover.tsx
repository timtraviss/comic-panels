import Image from 'next/image'
import styles from './Cover.module.css'

interface CoverProps {
  coverImage: string | null
  alt: string
  paletteBg?: string | null
  paletteAccent?: string | null
  size?: 'sm' | 'md' | 'lg'
  priority?: boolean
}

export default function Cover({ coverImage, alt, paletteBg, paletteAccent, size = 'md', priority = false }: CoverProps) {
  if (coverImage) {
    const src = coverImage.startsWith('https://') ? coverImage : `/covers/${coverImage}`
    return (
      <div className={`${styles.cover} ${styles[size]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={size === 'lg' ? '240px' : size === 'sm' ? '110px' : '160px'}
          className={styles.image}
          priority={priority}
        />
      </div>
    )
  }

  return (
    <div
      className={`${styles.cover} ${styles.placeholder} ${styles[size]}`}
      style={{ '--pb': paletteBg ?? '#1E2A44', '--pa': paletteAccent ?? '#E8743C' } as React.CSSProperties}
      aria-label={alt}
    >
      <div className={styles.halftone} />
      <div className={styles.accent} />
    </div>
  )
}
