import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid logging secrets; just indicate presence
  // eslint-disable-next-line no-console
  console.error('[Supabase] Missing env vars. Ensure .env.local has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and restart the dev server.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export async function uploadImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file, { upsert: false, cacheControl: '3600', contentType: file.type });

  if (uploadError) {
    // eslint-disable-next-line no-console
    console.error('[Supabase] Upload error:', uploadError.message);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(filePath);
  return publicUrlData.publicUrl ?? null;
}
