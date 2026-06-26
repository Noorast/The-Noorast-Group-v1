// ─────────────────────────────────────────────────────────────────────────────
// NOORAST AI — Enhanced with Tool Calling + Memory Context
// Tools: estimate_project_cost · check_permitted_development · lookup_planning_constraints
// Memory: injects cross-session context from ai-memory function
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
    if (!m || !["user", "assistant"].includes(m.role)) return null;
    if (Array.isArray(m.content)) {
      const parts = m.content.map(b => {
        if (!b || typeof b !== "object") return null;
        if (b.type === "text") return { type: "text", text: String(b.text || "").substring(0, 20000) };
        if (b.type === "document" && b.source?.type === "base64") {
          if (b.source.data?.length > 5500000) return null;
          return { type: "document", source: { type: "base64", media_type: b.source.media_type || "application/pdf", data: b.source.data } };
        }
        if (b.type === "image" && b.source?.type === "base64") {
          if (b.source.data?.length > 5500000) return null;
          return { type: "image", source: { type: "base64", media_type: b.source.media_type || "image/jpeg", data: b.source.data } };
        }
        if (b.type === "tool_result") return b;
        return null;
      }).filter(Boolean);
      return parts.length ? { role: m.role, content: parts } : null;
    }
    if (typeof m.content !== "string") return null;
    return { role: m.role, content: String(m.content).substring(0, 20000) };
  }).filter(Boolean);
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

const NOORAST_TOOLS = [
  {
    name: "estimate_project_cost",
    description: "Calculate detailed cost estimates for UK residential extension and conversion projects. Use whenever a user asks about costs, budgets, or how much something will cost. Returns a full project budget breakdown including construction, fees, VAT and contingency.",
    input_schema: {
      type: "object",
      properties: {
        project_type: { type: "string", enum: ["single_storey_rear","two_storey_rear","side_extension","loft_conversion_dormer","loft_conversion_velux","loft_conversion_hip_to_gable","garage_conversion","basement_conversion","outbuilding","wraparound"] },
        floor_area_m2: { type: "number", description: "New floor area in m². Estimate if not stated." },
        specification: { type: "string", enum: ["basic","standard","high"] },
        location: { type: "string", enum: ["london","south_east","midlands_east_anglia","north_england_wales"] },
        complexity: { type: "string", enum: ["straightforward","moderate","complex"] }
      },
      required: ["project_type", "floor_area_m2"]
    }
  },
  {
    name: "check_permitted_development",
    description: "Look up precise permitted development rules and dimensional limits for a specific extension type. Use when user asks whether planning permission is needed, or what the PD limits are. Returns exact GPDO thresholds and conditions.",
    input_schema: {
      type: "object",
      properties: {
        extension_type: { type: "string", enum: ["rear_single_storey","rear_two_storey","side_single_storey","loft_dormer","loft_velux","outbuilding","porch","upward_extension"] },
        dwelling_type: { type: "string", enum: ["detached","semi_detached","terraced","end_of_terrace","flat","maisonette"] },
        constraints: { type: "array", items: { type: "string", enum: ["conservation_area","article_4_direction","listed_building","national_park","aonb","flood_zone_3","none"] } }
      },
      required: ["extension_type", "dwelling_type"]
    }
  },
  {
    name: "lookup_planning_constraints",
    description: "Look up live planning constraints for a UK property address using government data. Use when user provides an address and wants to know about conservation area, flood risk, listed building status, TPOs, article 4.",
    input_schema: {
      type: "object",
      properties: {
        address: { type: "string", description: "Full UK address or postcode" }
      },
      required: ["address"]
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// TOOL EXECUTION
// ─────────────────────────────────────────────────────────────────────────────

function executeCostEstimator({ project_type, floor_area_m2, specification = "standard", location = "north_england_wales", complexity = "straightforward" }) {
  const baseRates = {
    single_storey_rear:           { basic: 1450, standard: 2100, high: 3200 },
    two_storey_rear:              { basic: 1300, standard: 1950, high: 3000 },
    side_extension:               { basic: 1400, standard: 2050, high: 3100 },
    loft_conversion_dormer:       { basic: 1600, standard: 2300, high: 3400 },
    loft_conversion_velux:        { basic: 1100, standard: 1650, high: 2400 },
    loft_conversion_hip_to_gable: { basic: 1700, standard: 2500, high: 3600 },
    garage_conversion:            { basic: 900,  standard: 1400, high: 2200 },
    basement_conversion:          { basic: 3000, standard: 4500, high: 7000 },
    outbuilding:                  { basic: 1150, standard: 1750, high: 2700 },
    wraparound:                   { basic: 1500, standard: 2200, high: 3300 },
  };
  const locMult = { london:1.38, south_east:1.18, midlands_east_anglia:1.05, north_england_wales:1.00 }[location] || 1.0;
  const compMult = { straightforward:1.0, moderate:1.12, complex:1.28 }[complexity] || 1.0;
  const rate = (baseRates[project_type] || baseRates.single_storey_rear)[specification];
  const constructionCost = Math.round(rate * locMult * compMult * floor_area_m2 / 100) * 100;
  const archFees = Math.round(constructionCost * 0.12 / 500) * 500;
  const seeFees = Math.round(Math.max(900, constructionCost * 0.025) / 100) * 100;
  const planningFee = project_type.includes("loft") || project_type === "outbuilding" ? 120 : 258;
  const bregsFee = Math.round(Math.min(900, Math.max(400, constructionCost * 0.008)) / 50) * 50;
  const pwFee = ["two_storey_rear","basement_conversion","side_extension"].includes(project_type) ? 2000 : 0;
  const surveyFee = 1100;
  const fees = archFees + seeFees + planningFee + bregsFee + pwFee + surveyFee + 300;
  const subtotal = constructionCost + fees;
  const vat = Math.round(subtotal * 0.20 / 100) * 100;
  const contingency = Math.round(subtotal * 0.175 / 500) * 500;
  return {
    TOTAL_PROJECT_BUDGET: subtotal + vat + contingency,
    breakdown: {
      construction_works: constructionCost,
      architect_fees: archFees,
      structural_engineer: seeFees,
      planning_application_fee: planningFee,
      building_regulations_fee: bregsFee,
      party_wall_surveyor: pwFee,
      measured_survey: surveyFee,
      vat_20_percent: vat,
      contingency_17_5_percent: contingency,
    },
    rate_per_m2: Math.round(rate * locMult * compMult),
    assumptions: { floor_area_m2, specification, location, complexity },
    notes: "Indicative 2024-25. Obtain 3 competitive tenders. Excludes fit-out, furniture, landscaping.",
  };
}

function checkPermittedDevelopment({ extension_type, dwelling_type, constraints = [] }) {
  const isFlat = ["flat","maisonette"].includes(dwelling_type);
  const isListed = constraints.includes("listed_building");
  const isDetached = dwelling_type === "detached";
  const hasCA = constraints.includes("conservation_area");
  const hasA4 = constraints.includes("article_4_direction");

  if (isFlat) return { permitted: false, reason: "Flats have NO householder PD rights. Planning permission required for all external works.", legislation: "GPDO 2015 Sch.2" };
  if (isListed) return { permitted: false, reason: "Listed buildings have no PD rights. Both planning permission and listed building consent required.", legislation: "Planning (Listed Buildings) Act 1990" };
  if (hasA4) return { permitted: false, reason: "Article 4 Direction removes householder PD rights in this area. Full planning permission required.", legislation: "GPDO 2015 Art.4" };

  const rules = {
    rear_single_storey: {
      permitted: true,
      max_depth_standard: isDetached ? "4 metres" : "3 metres",
      max_depth_prior_approval: isDetached ? "8 metres (Prior Approval needed)" : "6 metres (Prior Approval needed)",
      max_eaves_height: "3 metres",
      max_overall_height: "4 metres",
      conditions: ["Materials similar to existing","No projection beyond side elevation facing highway","No raised platforms","50% curtilage coverage max","Within 2m of boundary: 3m max height"],
      conservation_area: hasCA ? "CA does not block rear extensions but restricts cladding. Design quality scrutinised." : null,
      prior_approval_note: `${isDetached ? "4-8m" : "3-6m"}: submit Prior Approval application (£120). 42-day consultation with neighbours.`,
      legislation: "GPDO 2015 Sch.2 Pt.1 Class A"
    },
    rear_two_storey: {
      permitted: true,
      max_depth: "3 metres from original rear wall",
      min_boundary_distance: "7 metres from rear boundary",
      conditions: ["Eaves must not exceed existing eaves height","Cannot use Prior Approval route","No side extension within 2m of boundary"],
      legislation: "GPDO 2015 Sch.2 Pt.1 Class A"
    },
    side_single_storey: {
      permitted: !hasCA,
      max_width: "Half width of original dwelling",
      conditions: ["Single storey only","Half-width rule","Within 2m of boundary: max 3m eaves"],
      conservation_area: hasCA ? "BLOCKED in conservation areas if visible from highway." : null,
      legislation: "GPDO 2015 Sch.2 Pt.1 Class A"
    },
    loft_dormer: {
      permitted: true,
      max_volume: isDetached ? "50m³ additional" : "40m³ additional",
      position: "Rear slope only — NOT principal elevation or side visible from highway",
      conditions: ["Must not exceed highest roof point","Set back 20cm from eaves","Materials to match","No balconies","Side windows within 1m of party wall: obscure glazing + non-opening below 1.7m"],
      conservation_area: hasCA ? "Front dormers blocked. Rear dormers may still be PD — verify." : null,
      legislation: "GPDO 2015 Sch.2 Pt.1 Class B"
    },
    loft_velux: {
      permitted: true,
      conditions: ["Must not protrude beyond roof plane","Side-facing: obscure glazing + non-opening below 1.7m","Conservation area: front roof lights require permission"],
      legislation: "GPDO 2015 Sch.2 Pt.1 Class C"
    },
    outbuilding: {
      permitted: !hasCA || true,
      max_height_near_boundary: "2.5m if within 2m of boundary",
      max_height_dual_pitch: "4m if 2m+ from boundary",
      conditions: ["Not forward of principal elevation","Incidental to dwelling use","50% curtilage max","No mezzanine","10m² max between side wall and boundary in CA"],
      conservation_area: hasCA ? "RESTRICTED: outbuildings over 10m² between side wall and boundary not PD in CAs." : null,
      legislation: "GPDO 2015 Sch.2 Pt.1 Class E"
    },
    porch: {
      permitted: true,
      conditions: ["Max 3m² floor area","Max 3m height","More than 2m from highway boundary","No restrictions for conservation area"],
      legislation: "GPDO 2015 Sch.2 Pt.1 Class D"
    },
    upward_extension: {
      permitted: !hasCA,
      note: "Class AA — introduced 2020",
      max_additional_storeys: isDetached ? "2 storeys" : "1 storey",
      requires_prior_approval: true,
      conditions: ["Property must have been built between 1 July 1948 and 28 October 2018","Prior Approval required before starting","Materials to match","No new separate dwellings","Max total height 18m"],
      conservation_area: hasCA ? "BLOCKED — not permitted in conservation areas." : null,
      legislation: "GPDO 2015 Sch.2 Pt.1 Class AA"
    }
  };

  const rule = rules[extension_type] || { error: "Extension type not recognised" };
  rule.key_warning = "ALWAYS check whether PD rights have been removed by a planning condition on previous permissions. Search your property's planning history at the local authority portal.";
  rule.ldpc_recommendation = "Consider obtaining a Lawful Development Certificate (£120) for formal confirmation — protects you on resale and during enforcement.";
  rule.date = "GPDO 2015 as amended — current at 2025";
  return rule;
}

async function lookupPlanningConstraints({ address }, siteUrl) {
  try {
    const baseUrl = siteUrl || "https://noorast.co.uk";
    const res = await fetch(`${baseUrl}/.netlify/functions/planning-lookup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });
    const data = await res.json();
    if (data.error) return { error: data.error, address };
    return { address, found: true, constraints: data.constraints || {}, recent_applications: (data.applications || []).slice(0, 5), display_name: data.display_name };
  } catch {
    return { error: "Planning lookup temporarily unavailable. Try searching the local authority planning portal directly.", address };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_MODELS = ["claude-opus-4-7","claude-sonnet-4-6","claude-haiku-4-5-20251001","claude-opus-4-6"];
const MAX_BODY_SIZE = 20 * 1024 * 1024;

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const origin = event.headers.origin || event.headers.Origin || "";
  const referer = event.headers.referer || event.headers.Referer || "";
  const allowed = ["https://www.noorast.co.uk","https://noorast.co.uk","https://noorast.netlify.app"];
  const isLocal = origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1");
  if (!isLocal && !allowed.some(o => origin.startsWith(o) || referer.startsWith(o))) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) };
  }

  const ip = event.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return { statusCode: 429, body: JSON.stringify({ error: "Too many requests — please wait a moment." }) };

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return { statusCode: 500, body: JSON.stringify({ error: "Service unavailable" }) };

  const bodySize = Buffer.byteLength(event.body || "", "utf8");
  if (bodySize > MAX_BODY_SIZE) return { statusCode: 413, body: JSON.stringify({ error: "Request too large." }) };

  try {
    let body;
    try { body = JSON.parse(event.body); } catch {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
    }
    if (!body || typeof body !== "object") return { statusCode: 400, body: JSON.stringify({ error: "Invalid request" }) };

    const model = ALLOWED_MODELS.includes(body.model) ? body.model : "claude-opus-4-7";
    const maxTokens = Math.min(Math.max(parseInt(body.max_tokens) || 6000, 100), 16000);
    const messages = sanitiseMessages(body.messages);
    const system = typeof body.system === "string" ? body.system.substring(0, 80000) : undefined;
    const useSearch = body.useWebSearch === true;
    const useTools = body.useTools !== false;

    if (!messages.length) return { statusCode: 400, body: JSON.stringify({ error: "No messages provided" }) };

    const tools = [
      ...(useTools ? NOORAST_TOOLS : []),
      ...(useSearch ? [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }] : []),
    ];

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      ...(useSearch ? { "anthropic-beta": "web-search-2025-03-05" } : {}),
    };

    const doFetch = async (reqBody) => {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 55000);
      try {
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST", headers, body: JSON.stringify(reqBody), signal: ctrl.signal,
        });
        return await r.json();
      } finally { clearTimeout(t); }
    };

    let reqBody = {
      model, max_tokens: maxTokens, messages,
      ...(system && { system }),
      ...(tools.length > 0 && { tools }),
    };

    let data = await doFetch(reqBody);
    let allMsgs = [...messages];
    const searchQueries = [];
    const toolsUsed = [];
    let iterations = 0;

    // Agentic tool loop
    while (data.stop_reason === "tool_use" && iterations < 6) {
      iterations++;
      const toolUseBlocks = (data.content || []).filter(b => b.type === "tool_use");
      const toolResults = [];

      for (const block of toolUseBlocks) {
        if (!toolsUsed.includes(block.name)) toolsUsed.push(block.name);
        let result;

        switch (block.name) {
          case "estimate_project_cost":
            result = executeCostEstimator(block.input);
            break;
          case "check_permitted_development":
            result = checkPermittedDevelopment(block.input);
            break;
          case "lookup_planning_constraints":
            result = await lookupPlanningConstraints(block.input, allowed[1]);
            break;
          case "web_search":
            if (block.input?.query) searchQueries.push(block.input.query);
            result = { acknowledged: true };
            break;
          default:
            result = { error: `Unknown tool: ${block.name}` };
        }

        toolResults.push({ type: "tool_result", tool_use_id: block.id, content: JSON.stringify(result) });
      }

      allMsgs = [...allMsgs, { role: "assistant", content: data.content }, { role: "user", content: toolResults }];
      reqBody = { ...reqBody, messages: allMsgs };
      data = await doFetch(reqBody);
    }

    const extractedText = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "X-Content-Type-Options": "nosniff" },
      body: JSON.stringify({ ...data, extractedText, searchQueries, toolsUsed }),
    };
  } catch (err) {
    if (err.name === "AbortError") return { statusCode: 504, body: JSON.stringify({ error: "Request timed out. Please try again." }) };
    console.error("AI error:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
  }
};
