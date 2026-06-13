import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;
let _initialising: Promise<SupabaseClient> | null = null;

async function fetchConfig(): Promise<{ url: string; key: string }> {
  // Try build-time env vars first (works in local dev)
  const buildUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const buildKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

  if (buildUrl && buildKey && !buildUrl.includes('placeholder')) {
    return { url: buildUrl, key: buildKey };
  }

  // Fall back to runtime fetch from Netlify function
  const res = await fetch('/.netlify/functions/config');
  if (!res.ok) throw new Error('Could not load config');
  return await res.json();
}

export async function getSupabase(): Promise<SupabaseClient> {
  if (_client) return _client;
  if (_initialising) return _initialising;

  _initialising = fetchConfig().then(({ url, key }) => {
    _client = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return _client;
  });

  return _initialising;
}

// Sync accessor — returns null until initialised
export function getSupabaseSync(): SupabaseClient | null {
  return _client;
}

export type UserSession = {
  user: { id: string; email?: string; created_at: string } | null;
  session: any;
};
