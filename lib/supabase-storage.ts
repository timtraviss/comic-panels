import { createClient, SupabaseClient } from '@supabase/supabase-js'

if (process.env.NODE_ENV !== 'test' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)) {
  throw new Error('Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
}

const globalForSupabase = globalThis as unknown as { supabaseAdmin: SupabaseClient }

function getAdminClient(): SupabaseClient {
  if (globalForSupabase.supabaseAdmin) return globalForSupabase.supabaseAdmin
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  if (process.env.NODE_ENV !== 'production') globalForSupabase.supabaseAdmin = client
  return client
}

export async function uploadCover(issueId: string, buffer: Buffer, contentType: string): Promise<string> {
  const supabase = getAdminClient()
  const filename = `${issueId}.jpg`

  const { error } = await supabase.storage
    .from('covers')
    .upload(filename, buffer, { upsert: true, contentType })

  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  const { data } = supabase.storage.from('covers').getPublicUrl(filename)
  return data.publicUrl
}

export async function deleteCover(issueId: string): Promise<void> {
  const supabase = getAdminClient()
  const { error } = await supabase.storage
    .from('covers')
    .remove([`${issueId}.jpg`])

  if (error) throw new Error(`Storage delete failed: ${error.message}`)
}
