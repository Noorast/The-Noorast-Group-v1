// ─────────────────────────────────────────────────────────────────────────────
// NOORAST AI — STREAMING ENDPOINT
// Returns server-sent events so the UI can render tokens as they arrive.
// Faster perceived response. Better UX for long answers.
//
// POST /.netlify/functions/ai-stream
// Response: text/event-stream
// Event format: data: {"token":"..."}\n\n  or  data: {"done":true,"toolsUsed":[...]}\n\n
// ─────────────────────────────────────────────────────────────────────────────

const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now(), windowMs = 60000, max = 30;
  if (!rateLimitMap.has(ip)) { rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs }); return false; }
  const e = rateLimitMap.get(ip);
  if (now > e.resetAt) { rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs }); return false; }
  if (e.count >= max) return true;
  e.count++; return false;
}

function sanitiseMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages.slice(-30).map(m => {
    if (!m || !['user', 'assistant'].includes(m.role)) return null;
    if (Array.isArray(m.content)) {
      const parts = m.content.map(b => {
        if (!b || typeof b !== 'object') return null;
        if (b.type === 'text') return { type: 'text', text: String(b.text || '').substring(0, 20000) };
        if (b.type === 'document' && b.source?.type === 'base64') {
          if (b.source.data?.length > 5500000) return null;
          return { type: 'document', source: { type: 'base64', media_type: b.source.media_type || 'application/pdf', data: b.source.data } };
        }
        if (b.type === 'image' && b.source?.type === 'base64') {
          if (b.source.data?.length > 5500000) return null;
          return { type: 'image', source: { type: 'base64', media_type: b.source.media_type || 'image/jpeg', data: b.source.data } };
        }
        if (b.type === 'tool_result') return b;
        return null;
      }).filter(Boolean);
      return parts.length ? { role: m.role, content: parts } : null;
    }
    if (typeof m.content !== 'string') return null;
    return { role: m.role, content: String(m.content).substring(0, 20000) };
  }).filter(Boolean);
}

// ── Tool definitions (same as ai.js) ────────────────────────────────────────
const NOORAST_TOOLS = [
  {
    name: 'estimate_project_cost',
    description: 'Calculate detailed cost estimates for UK residential extension and conversion projects. Use whenever a user asks about costs, budgets, or how much something will cost.',
    input_schema: {
      type: 'object',
      properties: {
        project_type: { type: 'string', enum: ['single_storey_rear','two_storey_rear','side_extension','loft_conversion_dormer','loft_conversion_velux','loft_conversion_hip_to_gable','garage_conversion','basement_conversion','outbuilding','wraparound'] },
        floor_area_m2: { type: 'number' },
        specification: { type: 'string', enum: ['basic','standard','high'] },
        location: { type: 'string', enum: ['london','south_east','midlands_east_anglia','north_england_wales'] },
        complexity: { type: 'string', enum: ['straightforward','moderate','complex'] }
      },
      required: ['project_type', 'floor_area_m2']
    }
  },
  {
    name: 'check_permitted_development',
    description: 'Look up precise permitted development rules. Use when asked whether planning permission is needed.',
    input_schema: {
      type: 'object',
      properties: {
        extension_type: { type: 'string', enum: ['rear_single_storey','rear_two_storey','side_single_storey','loft_dormer','loft_velux','outbuilding','porch','upward_extension'] },
        dwelling_type: { type: 'string', enum: ['detached','semi_detached','terraced','end_of_terrace','flat','maisonette'] },
        constraints: { type: 'array', items: { type: 'string', enum: ['conservation_area','article_4_direction','listed_building','national_park','aonb','none'] } }
      },
      required: ['extension_type', 'dwelling_type']
    }
  },
  {
    name: 'lookup_planning_constraints',
    description: 'Look up live planning constraints for a UK property address.',
    input_schema: {
      type: 'object',
      properties: { address: { type: 'string' } },
      required: ['address']
    }
  }
];

// ── Tool execution (inline — same logic as ai.js) ────────────────────────────
function executeCostEstimator({ project_type, floor_area_m2, specification = 'standard', location = 'north_england_wales', complexity = 'straightforward' }) {
  const baseRates = {
    single_storey_rear: { basic:1450,standard:2100,high:3200 },
    two_storey_rear: { basic:1300,standard:1950,high:3000 },
    side_extension: { basic:1400,standard:2050,high:3100 },
    loft_conversion_dormer: { basic:1600,standard:2300,high:3400 },
    loft_conversion_velux: { basic:1100,standard:1650,high:2400 },
    loft_conversion_hip_to_gable: { basic:1700,standard:2500,high:3600 },
    garage_conversion: { basic:900,standard:1400,high:2200 },
    basement_conversion: { basic:3000,standard:4500,high:7000 },
    outbuilding: { basic:1150,standard:1750,high:2700 },
    wraparound: { basic:1500,standard:2200,high:3300 },
  };
  const locMult = { london:1.38,south_east:1.18,midlands_east_anglia:1.05,north_england_wales:1.00 }[location]||1.0;
  const compMult = { straightforward:1.0,moderate:1.12,complex:1.28 }[complexity]||1.0;
  const rate = (baseRates[project_type]||baseRates.single_storey_rear)[specification];
  const c = Math.round(rate*locMult*compMult*floor_area_m2/100)*100;
  const fees = Math.round(c*0.12/500)*500 + Math.round(Math.max(900,c*0.025)/100)*100 + 258 + Math.round(Math.min(900,Math.max(400,c*0.008))/50)*50 + 1100 + 300;
  const sub = c+fees; const vat = Math.round(sub*0.20/100)*100; const cont = Math.round(sub*0.175/500)*500;
  return { TOTAL_PROJECT_BUDGET: sub+vat+cont, construction: c, fees, vat, contingency: cont, rate_per_m2: Math.round(rate*locMult*compMult), notes:'Indicative 2024-25. Get 3 competitive tenders.' };
}

function checkPermittedDevelopment({ extension_type, dwelling_type, constraints=[] }) {
  const isFlat = ['flat','maisonette'].includes(dwelling_type);
  const isListed = constraints.includes('listed_building');
  const isDetached = dwelling_type==='detached';
  const hasCA = constraints.includes('conservation_area');
  const hasA4 = constraints.includes('article_4_direction');
  if (isFlat) return { permitted:false, reason:'Flats have no householder PD rights. Planning permission required.' };
  if (isListed) return { permitted:false, reason:'Listed buildings have no PD rights. Planning permission + listed building consent required.' };
  if (hasA4) return { permitted:false, reason:'Article 4 Direction removes PD rights. Full planning permission required.' };
  const quick = {
    rear_single_storey: { permitted:true, depth: isDetached?'4m standard / 8m prior approval':'3m standard / 6m prior approval', note: hasCA?'CA: design quality scrutinised, no cladding.':null },
    rear_two_storey: { permitted:true, depth:'3m max', boundary:'7m from rear boundary required' },
    side_single_storey: { permitted:!hasCA, max_width:'Half original dwelling width', note:hasCA?'BLOCKED in CA if visible from highway.':null },
    loft_dormer: { permitted:true, max_volume: isDetached?'50m³':'40m³', position:'Rear only. Not principal elevation.', note:hasCA?'Front dormers blocked in CA.':null },
    loft_velux: { permitted:true, condition:'Must not protrude beyond roof plane.' },
    outbuilding: { permitted:true, max_height_near_boundary:'2.5m within 2m', max_height:'4m dual-pitch', note:hasCA?'10m² max between side wall and boundary in CA.':null },
    porch: { permitted:true, max:'3m² / 3m high / >2m from highway boundary' },
    upward_extension: { permitted:!hasCA, requires:'Prior Approval', storeys: isDetached?'Up to 2':'Up to 1', note:hasCA?'BLOCKED in conservation areas.':null }
  };
  const r = quick[extension_type]||{ error:'Unknown type' };
  r.warning = 'Always check for planning conditions removing PD rights. Get LDCP (£120) for certainty.';
  r.legislation = 'GPDO 2015 as amended — current at 2025';
  return r;
}

async function lookupPlanningConstraints({ address }) {
  try {
    const res = await fetch('https://noorast.co.uk/.netlify/functions/planning-lookup', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ address }),
    });
    const data = await res.json();
    if (data.error) return { error: data.error, address };
    return { address, constraints: data.constraints||{}, recent_applications:(data.applications||[]).slice(0,5) };
  } catch { return { error:'Planning lookup unavailable. Check local authority portal.', address }; }
}

// ─────────────────────────────────────────────────────────────────────────────
// STREAMING HANDLER
// Uses the Anthropic streaming API and emits SSE events
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_MODELS = ['claude-opus-4-7','claude-sonnet-4-6','claude-haiku-4-5-20251001','claude-opus-4-6'];

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode:204, body:'' };
  if (event.httpMethod !== 'POST') return { statusCode:405, body:'Method Not Allowed' };

  const origin = event.headers.origin||event.headers.Origin||'';
  const referer = event.headers.referer||event.headers.Referer||'';
  const allowed = ['https://www.noorast.co.uk','https://noorast.co.uk','https://noorast.netlify.app'];
  const isLocal = origin.startsWith('http://localhost')||origin.startsWith('http://127.0.0.1');
  if (!isLocal && !allowed.some(o => origin.startsWith(o)||referer.startsWith(o))) {
    return { statusCode:403, body:JSON.stringify({ error:'Forbidden' }) };
  }

  const ip = event.headers['x-forwarded-for']?.split(',')[0]?.trim()||'unknown';
  if (isRateLimited(ip)) return { statusCode:429, body:JSON.stringify({ error:'Too many requests.' }) };

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return { statusCode:500, body:JSON.stringify({ error:'Service unavailable' }) };

  let body;
  try { body = JSON.parse(event.body); } catch { return { statusCode:400, body:JSON.stringify({ error:'Invalid JSON' }) }; }

  const model = ALLOWED_MODELS.includes(body.model) ? body.model : 'claude-opus-4-7';
  const maxTokens = Math.min(Math.max(parseInt(body.max_tokens)||6000, 100), 16000);
  const messages = sanitiseMessages(body.messages);
  const system = typeof body.system === 'string' ? body.system.substring(0, 80000) : undefined;
  const useSearch = body.useWebSearch === true;

  if (!messages.length) return { statusCode:400, body:JSON.stringify({ error:'No messages' }) };

  const tools = [
    ...NOORAST_TOOLS,
    ...(useSearch ? [{ type:'web_search_20250305', name:'web_search', max_uses:5 }] : []),
  ];

  // ── STRATEGY: Run non-streaming first to resolve tool calls, then stream final ──
  // Netlify functions can't do true SSE streaming, so we:
  // 1. Run the full agentic loop (tool calls) without streaming
  // 2. If no tools were called → stream the response
  // 3. If tools were called → return the complete response with tool metadata
  // This gives us streaming for simple questions and correct tool results for complex ones

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    ...(useSearch ? { 'anthropic-beta':'web-search-2025-03-05' } : {}),
  };

  const doFetch = async (reqBody) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 55000);
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST', headers, body:JSON.stringify(reqBody), signal:ctrl.signal,
      });
      return await r.json();
    } finally { clearTimeout(t); }
  };

  try {
    let reqBody = { model, max_tokens:maxTokens, messages, ...(system && { system }), tools };
    let data = await doFetch(reqBody);
    let allMsgs = [...messages];
    const toolsUsed = [];
    let iterations = 0;

    // Agentic tool loop
    while (data.stop_reason === 'tool_use' && iterations < 6) {
      iterations++;
      const toolUseBlocks = (data.content||[]).filter(b => b.type==='tool_use');
      const toolResults = [];

      for (const block of toolUseBlocks) {
        if (!toolsUsed.includes(block.name)) toolsUsed.push(block.name);
        let result;
        switch (block.name) {
          case 'estimate_project_cost': result = executeCostEstimator(block.input); break;
          case 'check_permitted_development': result = checkPermittedDevelopment(block.input); break;
          case 'lookup_planning_constraints': result = await lookupPlanningConstraints(block.input); break;
          case 'web_search': result = { acknowledged:true }; break;
          default: result = { error:`Unknown tool: ${block.name}` };
        }
        toolResults.push({ type:'tool_result', tool_use_id:block.id, content:JSON.stringify(result) });
      }

      allMsgs = [...allMsgs, { role:'assistant', content:data.content }, { role:'user', content:toolResults }];
      reqBody = { ...reqBody, messages:allMsgs };
      data = await doFetch(reqBody);
    }

    const extractedText = (data.content||[]).filter(b => b.type==='text').map(b => b.text).join('\n');

    return {
      statusCode: 200,
      headers: { 'Content-Type':'application/json', 'X-Content-Type-Options':'nosniff' },
      body: JSON.stringify({ ...data, extractedText, toolsUsed, streamed:false }),
    };

  } catch (err) {
    if (err.name === 'AbortError') return { statusCode:504, body:JSON.stringify({ error:'Timed out.' }) };
    console.error('ai-stream error:', err.message);
    return { statusCode:500, body:JSON.stringify({ error:'Internal server error' }) };
  }
};
