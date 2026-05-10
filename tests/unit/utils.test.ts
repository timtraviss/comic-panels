import { describe, it, expect } from 'vitest'
import { normalise, titleToSlug, parseCoverPrice, makeSeriesId, makeIssueId } from '@/lib/utils'

describe('normalise', () => {
  it('strips punctuation and lowercases', () => {
    expect(normalise('G.I.JOE')).toBe('gijoe')
  })
  it('handles spaces', () => {
    expect(normalise('G.I. Joe A Real American Hero')).toBe('gijoearealamericanhero')
  })
  it('handles apostrophes', () => {
    expect(normalise("The 'Nam")).toBe('thenam')
  })
})

describe('titleToSlug', () => {
  it('converts to kebab-case', () => {
    expect(titleToSlug('The Amazing Spider-Man')).toBe('the-amazing-spider-man')
  })
  it('collapses punctuation to single dash', () => {
    expect(titleToSlug('G.I.JOE')).toBe('gi-joe')
  })
})

describe('makeSeriesId', () => {
  it('prefixes publisher slug', () => {
    expect(makeSeriesId('marvel', 'G.I.JOE')).toBe('marvel-gi-joe')
  })
  it('avoids collisions across publishers', () => {
    expect(makeSeriesId('idw', 'G.I.JOE')).toBe('idw-gi-joe')
  })
})

describe('makeIssueId', () => {
  it('appends issue number', () => {
    expect(makeIssueId('marvel-gi-joe', 127)).toBe('marvel-gi-joe-127')
  })
  it('handles null issue number with cuid fallback marker', () => {
    expect(makeIssueId('marvel-gi-joe', null)).toMatch(/^marvel-gi-joe-unknown-/)
  })
})

describe('parseCoverPrice', () => {
  it('strips US$ prefix', () => {
    expect(parseCoverPrice('US$3.99')).toBe(3.99)
  })
  it('returns null for missing', () => {
    expect(parseCoverPrice(null)).toBeNull()
  })
  it('returns null for non-numeric', () => {
    expect(parseCoverPrice('N/A')).toBeNull()
  })
})
