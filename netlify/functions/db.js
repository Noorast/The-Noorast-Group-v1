const { createClient } = require('@supabase/supabase-js');

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY)
    return { statusCode: 500, body: JSON.stringify({ error: 'Supabase not configured' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const { action, userId, data } = body;
    if (!userId || !action)
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing action or userId' }) };

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    if (action === 'get-passport') {
      const { data: passport, error } = await supabase.from('passports').select('section_data, checklist_data, updated_at').eq('user_id', userId).single();
      if (error && error.code !== 'PGRST116') throw error;
      return { statusCode: 200, body: JSON.stringify({ passport: passport || null }) };
    }

    if (action === 'save-passport') {
      const { error } = await supabase.from('passports').upsert(
        { user_id: userId, section_data: data.sectionData, checklist_data: data.checklistData, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
      if (error) throw error;
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    if (action === 'get-profile') {
      const { data: profile, error } = await supabase.from('profiles').select('*').eq('user_id', userId).single();
      if (error && error.code !== 'PGRST116') throw error;
      return { statusCode: 200, body: JSON.stringify({ profile: profile || null }) };
    }

    if (action === 'save-profile') {
      const { error } = await supabase.from('profiles').upsert(
        { user_id: userId, ...data, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
      if (error) throw error;
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Unknown action' }) };
  } catch (err) {
    console.error('DB function error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};
