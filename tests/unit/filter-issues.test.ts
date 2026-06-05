import { describe, it, expect } from 'vitest'
import { filterIssues, IssueFilters } from '@/lib/filter-issues'

const issues = [
  { id: '1', number: 1, title: 'The Beginning', series: { name: 'Saga', publisher: { name: 'Image' } } },
  { id: '2', number: 2, title: 'On the Road', series: { name: 'Saga', publisher: { name: 'Image' } } },
  { id: '3', number: 1, title: null, series: { name: 'Batman', publisher: { name: 'DC' } } },
]

const empty: IssueFilters = { publisher: '', series: '', issueNum: '', title: '' }

describe('filterIssues', () => {
  it('returns all issues when all filters are empty', () => {
    expect(filterIssues(issues, empty)).toHaveLength(3)
  })

  it('filters by publisher', () => {
    const result = filterIssues(issues, { ...empty, publisher: 'DC' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })

  it('filters by series', () => {
    const result = filterIssues(issues, { ...empty, series: 'Saga' })
    expect(result).toHaveLength(2)
  })

  it('filters by issue number (exact match)', () => {
    const result = filterIssues(issues, { ...empty, issueNum: '1' })
    expect(result).toHaveLength(2)
    expect(result.map(i => i.id)).toEqual(['1', '3'])
  })

  it('filters by title — case-insensitive substring', () => {
    const result = filterIssues(issues, { ...empty, title: 'BEGINNING' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('excludes null-title issues when title filter is active', () => {
    const result = filterIssues(issues, { ...empty, title: 'anything' })
    expect(result.every(i => i.title !== null)).toBe(true)
  })

  it('applies all four filters simultaneously', () => {
    const result = filterIssues(issues, { publisher: 'Image', series: 'Saga', issueNum: '1', title: 'beginning' })
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})
