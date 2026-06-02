import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Cover from './Cover'

// Mock next/image — the real component requires Next.js internals not available in jsdom
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

describe('Cover', () => {
  it('renders an img when given a full Supabase CDN URL', () => {
    render(
      <Cover
        coverImage="https://zfgetlvfpalyviowvvmh.supabase.co/storage/v1/object/public/covers/saga-1.jpg"
        alt="Saga #1"
      />
    )
    const img = screen.getByRole('img', { name: 'Saga #1' })
    expect(img).toBeTruthy()
    // Verify full URL is passed through unchanged (not prepended with /covers/)
    expect(img.getAttribute('src')).toBe(
      'https://zfgetlvfpalyviowvvmh.supabase.co/storage/v1/object/public/covers/saga-1.jpg'
    )
  })

  it('prepends /covers/ for a legacy relative path', () => {
    render(<Cover coverImage="saga-1.jpg" alt="Saga #1 legacy" />)
    const img = screen.getByRole('img', { name: 'Saga #1 legacy' })
    expect(img.getAttribute('src')).toBe('/covers/saga-1.jpg')
  })

  it('renders a placeholder (no img) when coverImage is null', () => {
    const { container } = render(<Cover coverImage={null} alt="No cover" />)
    expect(container.querySelector('img')).toBeNull()
  })
})
