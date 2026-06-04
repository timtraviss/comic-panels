'use client'
import styles from './CreditsEditor.module.css'

export interface CreditRow {
  creatorId: string
  role: string
}

interface Creator {
  id: string
  name: string
}

const ROLES = ['WRITER', 'ARTIST', 'INKER', 'COLORIST', 'LETTERER', 'COVER']

interface Props {
  credits: CreditRow[]
  creators: Creator[]
  onChange: (credits: CreditRow[]) => void
}

export default function CreditsEditor({ credits, creators, onChange }: Props) {
  function addRow() {
    onChange([...credits, { creatorId: creators[0]?.id ?? '', role: 'WRITER' }])
  }

  function removeRow(index: number) {
    onChange(credits.filter((_, i) => i !== index))
  }

  function updateRow(index: number, field: keyof CreditRow, value: string) {
    const updated = credits.map((c, i) => i === index ? { ...c, [field]: value } : c)
    onChange(updated)
  }

  return (
    <div className={styles.editor}>
      {credits.map((credit, i) => (
        <div key={i} className={styles.row}>
          <select
            className="adminInput"
            value={credit.creatorId}
            onChange={e => updateRow(i, 'creatorId', e.target.value)}
          >
            {creators.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            className="adminInput"
            value={credit.role}
            onChange={e => updateRow(i, 'role', e.target.value)}
            style={{ maxWidth: '140px' }}
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="button" onClick={() => removeRow(i)} className={styles.remove} aria-label="Remove credit">✕</button>
        </div>
      ))}
      <button type="button" onClick={addRow} className={styles.addBtn}>+ Add credit</button>
    </div>
  )
}
