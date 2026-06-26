// capture-passport-email.js
// Called when a user enters their email at section 5 of the Property Passport.
// Adds them to ConvertKit with the tag 'passport-signup' to trigger the welcome sequence.
//
// Required Netlify env vars:
//   CONVERTKIT_API_KEY              — from ConvertKit → Account → API
//   CONVERTKIT_PASSPORT_FORM_ID     — the form ID that triggers the welcome sequence

export const handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { email, firstName } = body;
  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: 'Invalid email' };
  }

  const CK_API_KEY = process.env.CONVERTKIT_API_KEY;
  const CK_FORM_ID = process.env.CONVERTKIT_PASSPORT_FORM_ID;

  if (!CK_API_KEY || !CK_FORM_ID) {
    // Not configured yet — return success silently so UX isn't broken
    console.warn('ConvertKit env vars not set — skipping email capture');
    return { statusCode: 200, body: JSON.stringify({ ok: true, configured: false }) };
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${CK_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: CK_API_KEY,
        email,
        first_name: firstName || '',
        tags: ['passport-signup'],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('ConvertKit error:', err);
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('capture-passport-email error:', err);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }
};
