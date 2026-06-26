// ─────────────────────────────────────────────────────────────────────────────
// NOORAST PASSPORT ANALYSER
// Generates a concise property intelligence summary when enough passport data
// is present. Called automatically when completion reaches ~40%.
//
// POST /.netlify/functions/analyse-passport
// Returns: { summary, risks, opportunities, nextAction, planningRoute }
// ─────────────────────────────────────────────────────────────────────────────

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const origin = event.headers.origin || event.headers.Origin || '';
  const allowed = ['https://www.noorast.co.uk', 'https://noorast.co.uk', 'https://noorast.netlify.app'];
  const isLocal = origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1');
  if (!isLocal && !allowed.some(o => origin.startsWith(o))) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return { statusCode: 500, body: JSON.stringify({ error: 'Service unavailable' }) };

  let body;
  try { body = JSON.parse(event.body); } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { passportData } = body;
  if (!passportData) return { statusCode: 400, body: JSON.stringify({ error: 'passportData required' }) };

  // Build a structured description of what we know
  const p = passportData;
  const address = p.property?.address || 'the property';
  const propertyType = p.property?.property_type || 'residential property';
  const tenure = p.property?.tenure || '';
  const yearBuilt = p.property?.year_built || '';

  const conservationArea = p.planning_policy?.conservation_area === 'yes';
  const article4 = p.planning_policy?.article_4 === 'yes';
  const listed = p.planning_policy?.listed_building === 'yes';
  const floodZone = p.environmental?.flood_zone || '';
  const tpoTrees = p.environmental?.tpo_trees === 'yes';
  const bats = p.environmental?.bat_survey_needed === 'yes';

  const covenants = p.legal?.restrictive_covenants || '';
  const partyWall = p.boundary?.party_wall_likely === 'yes';
  const leasehold = tenure === 'Leasehold';

  const projectType = p.brief?.project_type || '';
  const budget = p.brief?.budget || '';
  const brief = p.brief?.description || '';

  const isDetached = propertyType.toLowerCase().includes('detached') && !propertyType.toLowerCase().includes('semi');
  const isTerrace = propertyType.toLowerCase().includes('terrace');

  const dataDescription = `
PROPERTY: ${address}
Type: ${propertyType}${yearBuilt ? `, built ${yearBuilt}` : ''}${tenure ? `, ${tenure}` : ''}

PLANNING CONSTRAINTS:
- Conservation area: ${conservationArea ? 'YES' : 'No'}
- Article 4 direction: ${article4 ? 'YES' : 'No'}
- Listed building: ${listed ? 'YES' : 'No'}
- Flood zone: ${floodZone || 'Zone 1 (low risk)'}
- TPO trees: ${tpoTrees ? 'YES' : 'No'}
- Bat survey needed: ${bats ? 'YES' : 'No'}

LEGAL / SITE:
- Restrictive covenants: ${covenants || 'Not yet checked'}
- Party wall likely: ${partyWall ? 'YES' : 'Not flagged'}
- Leasehold complications: ${leasehold ? 'YES — freeholder consent needed' : 'No'}

PROJECT INTENT:
- Type: ${projectType || 'Not yet defined'}
- Budget: ${budget || 'Not stated'}
- Description: ${brief || 'Not yet written'}
`.trim();

  const prompt = `You are Noorast AI — a specialist UK pre-architecture intelligence system.

Based on the following Property Passport data, generate a concise property intelligence summary for the homeowner.

${dataDescription}

Produce a JSON response with exactly this structure:
{
  "headline": "One sentence that captures the most important thing about this property's development potential",
  "summary": "2-3 sentences. What does this property's specific combination of constraints and opportunities mean for a ${projectType || 'development'} project? Be specific — mention actual constraints and what they mean practically.",
  "risks": ["Array of 2-4 specific risks, each one sentence. Be concrete — 'Conservation area designation means any extension design will be assessed against the local design guide and the statutory preservation/enhancement test' not just 'conservation area'"],
  "opportunities": ["Array of 2-3 specific opportunities. What does this property have going for it? E.g. 'Detached dwelling means Class A PD rights allow up to 4m single-storey rear extension without planning permission'"],
  "planning_route": "PERMITTED DEVELOPMENT or FULL PLANNING or PRIOR APPROVAL — which route is most likely for this project and why, in one sentence",
  "next_action": "The single most important thing this homeowner should do next, stated as a specific action",
  "completion_note": "One sentence acknowledging what's still needed in the passport to give more precise advice"
}

Respond with JSON only. No preamble, no markdown code block.`;

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 30000);

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-7', // Top-tier reasoning for passport analysis
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: ctrl.signal,
    });

    clearTimeout(t);
    const data = await res.json();
    const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');

    // Parse JSON — strip any accidental markdown fences
    const clean = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch {
      return { statusCode: 200, body: JSON.stringify({ error: 'Could not parse analysis', raw: text }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed),
    };

  } catch (err) {
    if (err.name === 'AbortError') return { statusCode: 504, body: JSON.stringify({ error: 'Timed out' }) };
    console.error('analyse-passport error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Analysis failed' }) };
  }
};
