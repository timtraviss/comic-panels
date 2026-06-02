import { createClient } from '@supabase/supabase-js'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function uploadCover(issueId: string, buffer: Buffer, contentType: string): Promise<string> {
  const supabase = getClient()
  const filename = `${issueId}.jpg`

  const { error } = await supabase.storage
    .from('covers')
    .upload(filename, buffer, { upsert: true, contentType })

  if (error) throw new Error(`Storage upload failed: ${error.message}`)

  const { data } = supabase.storage.from('covers').getPublicUrl(filename)
  return data.publicUrl
}

export async function deleteCover(issueId: string): Promise<void> {
  const supabase = getClient()
  const { error } = await supabase.storage
    .from('covers')
    .remove([`${issueId}.jpg`])

  if (error) throw new Error(`Storage delete failed: ${error.message}`)
}
