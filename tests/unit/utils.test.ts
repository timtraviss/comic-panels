import { describe, it, expect } from 'vitest'
import { normalise, titleToSlug, parseCoverPrice, makeSeriesId, makeIssueId, makePublisherId, makeCreatorId } from '@/lib/utils'

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
  it('strips apostrophes without leaving extra dashes', () => {
    expect(titleToSlug("It's a Bird")).toBe('its-a-bird')
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
  it('handles null issue number with randomUUID fallback marker', () => {
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

describe('makePublisherId', () => {
  it('slugifies publisher name', () => {
    expect(makePublisherId('Marvel Comics')).toBe('marvel-comics')
  })
  it('handles special characters', () => {
    expect(makePublisherId('Dark Horse')).toBe('dark-horse')
  })
})

describe('makeCreatorId', () => {
  it('slugifies creator name', () => {
    expect(makeCreatorId('Stan Lee')).toBe('stan-lee')
  })
  it('handles apostrophes', () => {
    expect(makeCreatorId("Neil Gaiman")).toBe('neil-gaiman')
  })
})
