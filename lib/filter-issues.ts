export interface IssueFilters {
  publisher: string
  series: string
  issueNum: string
  title: string
}

interface FilterableIssue {
  number: number | null
  title: string | null
  series: {
    name: string
    publisher: { name: string }
  }
}

export function filterIssues<T extends FilterableIssue>(issues: T[], filters: IssueFilters): T[] {
  const { publisher, series, issueNum, title } = filters
  return issues.filter(i => {
    if (publisher && i.series.publisher.name !== publisher) return false
    if (series && i.series.name !== series) return false
    if (issueNum !== '' && i.number !== Number(issueNum)) return false
    if (title && !i.title?.toLowerCase().includes(title.toLowerCase())) return false
    return true
  })
}
