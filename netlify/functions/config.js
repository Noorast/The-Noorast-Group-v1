exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };

  // Try all possible variable name formats
  const url = process.env.VITE_SUPABASE_URL
    || process.env.SUPABASE_URL
    || '';

  const key = process.env.VITE_SUPABASE_ANON_KEY
    || process.env.SUPABASE_ANON_KEY
    || '';

  if (!url || !key) {
    console.error('Missing Supabase config. Available env keys:',
      Object.keys(process.env).filter(k => k.includes('SUPA') || k.includes('VITE')));
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Supabase not configured on server' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
    body: JSON.stringify({ url, key }),
  };
};
