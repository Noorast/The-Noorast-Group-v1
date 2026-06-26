import { useEffect, useRef } from 'react';
import { getSupabase } from './supabase';
import { useAuth } from './auth';

export async function savePassportToCloud(userId: string, sectionData: any, checklistData: any) {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase.from('passports').upsert(
      { user_id: userId, section_data: sectionData, checklist_data: checklistData, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
    return error;
  } catch (err) {
    console.error('savePassport:', err);
    return err;
  }
}

export async function loadPassportFromCloud(userId: string) {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('passports')
      .select('section_data, checklist_data, updated_at')
      .eq('user_id', userId)
      .single();
    if (error && error.code !== 'PGRST116') return null;
    return data;
  } catch { return null; }
}

export async function saveConversation(userId: string, messages: any[]) {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase.from('conversations').upsert(
      { user_id: userId, messages, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
    return error;
  } catch (err) { return err; }
}

export async function loadConversation(userId: string) {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('conversations')
      .select('messages, updated_at')
      .eq('user_id', userId)
      .single();
    if (error) return null;
    return data;
  } catch { return null; }
}

export function usePassportSync(data: any, checks: any, debounceMs = 5000) {
  const { user } = useAuth();
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      savePassportToCloud(user.id, data, checks);
    }, debounceMs);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [data, checks, user]);
}

export async function saveProfile(userId: string, profile: any) {
  try {
    const supabase = await getSupabase();
    const { error } = await supabase.from('profiles').upsert(
      { user_id: userId, ...profile, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
    return error;
  } catch (err) { return err; }
}

export async function loadProfile(userId: string) {
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error && error.code !== 'PGRST116') return null;
    return data;
  } catch { return null; }
}

// ─────────────────────────────────────────────────────────────────────────────
// AI MEMORY — Cross-session conversation context
// ─────────────────────────────────────────────────────────────────────────────

export interface AIMemory {
  summary: string;
  date: string;
  property_context?: string;
}

export async function saveAIMemory(
  userId: string,
  messages: { role: string; content: any }[],
  propertyContext?: string
): Promise<void> {
  try {
    await fetch('/.netlify/functions/ai-memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save', userId, messages, propertyContext }),
    });
  } catch (err) {
    console.error('saveAIMemory:', err);
  }
}

export async function loadAIMemories(userId: string): Promise<AIMemory[]> {
  try {
    const res = await fetch('/.netlify/functions/ai-memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'load', userId }),
    });
    const data = await res.json();
    return data.memories || [];
  } catch {
    return [];
  }
}

export function buildMemoryContext(memories: AIMemory[]): string {
  if (!memories.length) return '';
  return `\n\nPREVIOUS SESSIONS — Context from this user's past conversations:\n${
    memories.map(m => `[${m.date}] ${m.summary}`).join('\n')
  }\n\nUse this context to give continuity — reference past discussions where relevant.`;
}
