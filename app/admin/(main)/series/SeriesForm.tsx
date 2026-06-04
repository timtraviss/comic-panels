'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormField from '@/app/admin/_components/FormField'
import DeleteButton from '@/app/admin/_components/DeleteButton'
import styles from './SeriesForm.module.css'

const STATUS_OPTIONS = ['ONGOING', 'COMPLETED', 'CANCELLED', 'HIATUS']

interface Publisher { id: string; name: string }

interface Series {
  id: string
  name: string
  publisherId: string
  startYear: number | null
  endYear: number | null
  status: string
  genre: string | null
  description: string | null
  paletteBg: string | null
  paletteAccent: string | null
  paletteInk: string | null
}

interface Props {
  publishers: Publisher[]
  series?: Series
}

export default function SeriesForm({ publishers, series }: Props) {
  const router = useRouter()
  const isEdit = !!series

  const [publisherId, setPublisherId] = useState(series?.publisherId ?? publishers[0]?.id ?? '')
  const [name, setName] = useState(series?.name ?? '')
  const [startYear, setStartYear] = useState(series?.startYear?.toString() ?? '')
  const [endYear, setEndYear] = useState(series?.endYear?.toString() ?? '')
  const [status, setStatus] = useState(series?.status ?? 'ONGOING')
  const [genre, setGenre] = useState(series?.genre ?? '')
  const [description, setDescription] = useState(series?.description ?? '')
  const [paletteBg, setPaletteBg] = useState(series?.paletteBg ?? '#1E2A44')
  const [paletteAccent, setPaletteAccent] = useState(series?.paletteAccent ?? '#E8743C')
  const [paletteInk, setPaletteInk] = useState(series?.paletteInk ?? '#F5E8D0')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url = isEdit ? `/api/admin/series/${series.id}` : '/api/admin/series'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publisherId,
          name,
          startYear: startYear || null,
          endYear: endYear || null,
          status,
          genre: genre || null,
          description: description || null,
          paletteBg: paletteBg || null,
          paletteAccent: paletteAccent || null,
          paletteInk: paletteInk || null,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Save failed')
        return
      }
      router.push('/admin/series?saved=1')
      router.refresh()
    } catch {
      setError('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <FormField label="Publisher" required>
          <select className="adminInput" value={publisherId} onChange={e => setPublisherId(e.target.value)} required>
            {publishers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </FormField>

        <FormField label="Name" required>
          <input className="adminInput" value={name} onChange={e => setName(e.target.value)} required />
        </FormField>

        <FormField label="Start year">
          <input className="adminInput" type="number" value={startYear} onChange={e => setStartYear(e.target.value)} placeholder="1963" />
        </FormField>

        <FormField label="End year">
          <input className="adminInput" type="number" value={endYear} onChange={e => setEndYear(e.target.value)} placeholder="leave blank if ongoing" />
        </FormField>

        <FormField label="Status" required>
          <select className="adminInput" value={status} onChange={e => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FormField>

        <FormField label="Genre">
          <input className="adminInput" value={genre} onChange={e => setGenre(e.target.value)} placeholder="Superhero, Horror, Sci-Fi…" />
        </FormField>
      </div>

      <FormField label="Description">
        <textarea className="adminInput" value={description} onChange={e => setDescription(e.target.value)} rows={4} />
      </FormField>

      <div className={styles.paletteRow}>
        <FormField label="Palette — background">
          <div className={styles.colorRow}>
            <input type="color" value={paletteBg} onChange={e => setPaletteBg(e.target.value)} className={styles.colorPicker} />
            <input className="adminInput" value={paletteBg} onChange={e => setPaletteBg(e.target.value)} />
          </div>
        </FormField>
        <FormField label="Palette — accent">
          <div className={styles.colorRow}>
            <input type="color" value={paletteAccent} onChange={e => setPaletteAccent(e.target.value)} className={styles.colorPicker} />
            <input className="adminInput" value={paletteAccent} onChange={e => setPaletteAccent(e.target.value)} />
          </div>
        </FormField>
        <FormField label="Palette — ink">
          <div className={styles.colorRow}>
            <input type="color" value={paletteInk} onChange={e => setPaletteInk(e.target.value)} className={styles.colorPicker} />
            <input className="adminInput" value={paletteInk} onChange={e => setPaletteInk(e.target.value)} />
          </div>
        </FormField>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="submit" disabled={saving} className={styles.saveBtn}>
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create series'}
        </button>
        {isEdit && (
          <DeleteButton
            id={series.id}
            entityName={series.name}
            apiPath="/api/admin/series"
            redirectTo="/admin/series"
            confirmMessage={`Delete ${series.name}? This will also delete all its issues and credits. This cannot be undone.`}
          />
        )}
      </div>
    </form>
  )
}
