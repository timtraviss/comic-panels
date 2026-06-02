import { describe, it, expect, vi } from 'vitest'

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn().mockResolvedValue({ error: null }),
        remove: vi.fn().mockResolvedValue({ error: null }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: 'https://example.com/storage/v1/object/public/covers/saga-1.jpg' },
        }),
      })),
    },
  })),
}))

process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key'

const { uploadCover, deleteCover } = await import('./supabase-storage')

describe('uploadCover', () => {
  it('returns a public CDN URL on success', async () => {
    const fakeBuffer = Buffer.from('fake-image')
    const url = await uploadCover('saga-1', fakeBuffer, 'image/jpeg')
    expect(url).toBe('https://example.com/storage/v1/object/public/covers/saga-1.jpg')
  })
})

describe('deleteCover', () => {
  it('resolves without error', async () => {
    await expect(deleteCover('saga-1')).resolves.toBeUndefined()
  })
})
