import { randomUUID } from 'crypto'

export function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    // Dots between single letters → remove (G.I. → gi)
    .replace(/(?<![a-z0-9]{2})(?<=[a-z])\.(?=[a-z](?![a-z]))/g, '')
    // Remaining dots/punctuation → space (separator before multi-char words)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function makeSeriesId(publisherSlug: string, seriesName: string): string {
  return `${publisherSlug}-${titleToSlug(String(seriesName))}`
}

export function makeIssueId(seriesId: string, issueNumber: number | null): string {
  if (issueNumber === null) return `${seriesId}-unknown-${randomUUID().slice(0, 8)}`
  return `${seriesId}-${issueNumber}`
}

export function parseCoverPrice(price: string | null | undefined): number | null {
  if (!price) return null
  const cleaned = String(price).replace(/[^0-9.]/g, '')
  const val = parseFloat(cleaned)
  return isNaN(val) ? null : val
}
