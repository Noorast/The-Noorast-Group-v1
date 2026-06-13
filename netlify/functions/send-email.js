// Email function using Resend (free tier: 3,000 emails/month)
// Set RESEND_API_KEY in Netlify environment variables

const EMAILS = {
  'passport-incomplete': (data) => ({
    subject: 'Your Property Passport — pick up where you left off',
    html: `
      <div style="font-family:'Helvetica Neue',sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="border-bottom:2px solid #1a1a1a;padding-bottom:24px;margin-bottom:32px">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6b6560;margin-bottom:8px">Noorast</p>
          <h1 style="font-size:24px;font-weight:300;margin:0">Your Property Passport is ${data.pct}% complete</h1>
        </div>
        <p style="font-size:15px;font-weight:300;line-height:1.7;color:#1a1a1a">You started your Property Passport for <strong>${data.address || 'your property'}</strong> and completed ${data.sections} of 12 sections.</p>
        <p style="font-size:14px;color:#6b6560;line-height:1.7;margin-top:16px">The remaining sections cover ${data.remainingSections}. Completing them gives you a document you can hand directly to any architect — saving you weeks at the start of your project.</p>
        <div style="margin:32px 0">
          <a href="https://noorast.co.uk/toolkit/property-passport" style="display:inline-block;padding:14px 28px;background:#1a1a1a;color:#fff;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none">Continue Passport →</a>
        </div>
        <p style="font-size:12px;color:#9e9994;line-height:1.7">You're also welcome to ask Noorast AI anything about your project — no charge, no appointment needed.</p>
        <div style="margin-top:48px;padding-top:20px;border-top:1px solid #e5e4e1;font-size:11px;color:#9e9994;display:flex;justify-content:space-between">
          <span>Noorast · noorast.co.uk</span>
          <a href="https://noorast.co.uk/account" style="color:#9e9994">Manage emails</a>
        </div>
      </div>`,
  }),

  'passport-complete': (data) => ({
    subject: 'Passport complete — here\'s what to do next',
    html: `
      <div style="font-family:'Helvetica Neue',sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="border-bottom:2px solid #1a1a1a;padding-bottom:24px;margin-bottom:32px">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6b6560;margin-bottom:8px">Noorast</p>
          <h1 style="font-size:24px;font-weight:300;margin:0">Your Property Passport is complete</h1>
        </div>
        <p style="font-size:15px;font-weight:300;line-height:1.7">Your Passport for <strong>${data.address || 'your property'}</strong> is 100% complete. You now have everything an architect needs to give you an accurate fee proposal and start work immediately.</p>
        <div style="background:#f9f8f6;border-left:3px solid #1a1a1a;padding:20px;margin:24px 0">
          <p style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#6b6560;margin-bottom:8px">Three next steps</p>
          <p style="font-size:13px;color:#1a1a1a;line-height:1.7;margin:0">1. Export your Passport as a PDF to share with professionals<br>2. If your project involves conservation areas or listed buildings, consider a planning consultant first<br>3. Brief your architect — you'll arrive better prepared than 95% of their clients</p>
        </div>
        <p style="font-size:14px;color:#6b6560;line-height:1.7">Noorast provides full architectural services for residential extensions and loft conversions. If you'd like to discuss your project, we respond within 48 hours.</p>
        <div style="margin:32px 0;display:flex;gap:12px">
          <a href="https://noorast.co.uk/contact" style="display:inline-block;padding:14px 28px;background:#1a1a1a;color:#fff;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none">Start a project</a>
          <a href="https://noorast.co.uk/toolkit/property-passport" style="display:inline-block;padding:14px 28px;border:1px solid #1a1a1a;color:#1a1a1a;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none">View Passport</a>
        </div>
        <div style="margin-top:48px;padding-top:20px;border-top:1px solid #e5e4e1;font-size:11px;color:#9e9994">
          <span>Noorast · noorast.co.uk</span>
        </div>
      </div>`,
  }),

  'welcome': (data) => ({
    subject: 'Welcome to Noorast',
    html: `
      <div style="font-family:'Helvetica Neue',sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="border-bottom:2px solid #1a1a1a;padding-bottom:24px;margin-bottom:32px">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#6b6560;margin-bottom:8px">Noorast</p>
          <h1 style="font-size:24px;font-weight:300;margin:0">Welcome to Noorast</h1>
        </div>
        <p style="font-size:15px;font-weight:300;line-height:1.7">Your account is ready. Here's what you have access to:</p>
        <div style="margin:24px 0;space-y:16px">
          ${[
            ['Property Passport', 'A 12-section tool covering everything your architect needs to know. Your data saves to the cloud and is accessible on any device.', 'https://noorast.co.uk/toolkit/property-passport', 'Start your Passport'],
            ['Noorast AI', 'Expert UK planning and architecture advice. Ask anything about permitted development, building regulations, or your title register.', 'https://noorast.co.uk/ai', 'Try Noorast AI'],
            ['Fee Calculator', 'Indicative construction and professional fee estimates for your project type and location.', 'https://noorast.co.uk/fees', 'Calculate fees'],
          ].map(([title, desc, url, cta]) => `
            <div style="border-left:2px solid #e5e4e1;padding-left:16px;margin-bottom:20px">
              <p style="font-size:13px;font-weight:500;margin-bottom:6px">${title}</p>
              <p style="font-size:13px;color:#6b6560;line-height:1.6;margin-bottom:8px">${desc}</p>
              <a href="${url}" style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#1a1a1a;text-decoration:underline">${cta}</a>
            </div>`).join('')}
        </div>
        <div style="margin-top:48px;padding-top:20px;border-top:1px solid #e5e4e1;font-size:11px;color:#9e9994">
          <span>Noorast · noorast.co.uk · design@noorast.com</span>
        </div>
      </div>`,
  }),
};

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    console.log('RESEND_API_KEY not set — email not sent');
    return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: true }) };
  }

  try {
    const { type, to, data = {} } = JSON.parse(event.body || '{}');
    if (!type || !to) return { statusCode: 400, body: JSON.stringify({ error: 'Missing type or to' }) };

    const template = EMAILS[type];
    if (!template) return { statusCode: 400, body: JSON.stringify({ error: 'Unknown email type' }) };

    const { subject, html } = template(data);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
      body: JSON.stringify({
        from: 'Noorast <hello@noorast.co.uk>',
        to: [to],
        subject,
        html,
      }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Send failed');

    return { statusCode: 200, body: JSON.stringify({ ok: true, id: result.id }) };
  } catch (err) {
    console.error('Email error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Email failed' }) };
  }
};
