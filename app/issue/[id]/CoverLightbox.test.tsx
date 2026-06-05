import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CoverLightbox from './CoverLightbox'

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string; [key: string]: unknown }) => <img alt={alt} />,
}))

vi.mock('@/app/_components/Cover/Cover', () => ({
  default: ({ alt }: { alt: string }) => <div data-testid="cover">{alt}</div>,
}))

const withCover = { coverImage: 'https://example.com/cover.jpg', alt: 'Saga #1' }

describe('CoverLightbox', () => {
  it('renders a button with accessible label when coverImage is provided', () => {
    render(<CoverLightbox {...withCover} />)
    expect(screen.getByRole('button', { name: 'View cover: Saga #1' })).toBeInTheDocument()
  })

  it('opens the overlay on click', () => {
    render(<CoverLightbox {...withCover} />)
    fireEvent.click(screen.getByRole('button', { name: 'View cover: Saga #1' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes the overlay when Escape is pressed', () => {
    render(<CoverLightbox {...withCover} />)
    fireEvent.click(screen.getByRole('button', { name: 'View cover: Saga #1' }))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the overlay when the overlay is clicked', () => {
    render(<CoverLightbox {...withCover} />)
    fireEvent.click(screen.getByRole('button', { name: 'View cover: Saga #1' }))
    fireEvent.click(screen.getByRole('dialog'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders Cover directly (no button) when coverImage is null', () => {
    render(<CoverLightbox coverImage={null} alt="Placeholder" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByTestId('cover')).toBeInTheDocument()
  })
})
