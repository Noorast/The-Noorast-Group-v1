const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 30;
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  const entry = rateLimitMap.get(ip);
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= maxRequests) return true;
  entry.count++;
  return false;
}

function sanitiseAddress(address) {
  if (typeof address !== "string") return null;
  // Strip anything that isn't alphanumeric, spaces, commas, hyphens, dots
  const clean = address.replace(/[^a-zA-Z0-9\s,\-\.]/g, "").trim();
  if (clean.length < 3 || clean.length > 200) return null;
  return clean;
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, body: "" };
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Origin check
  const origin = event.headers.origin || event.headers.Origin || "";
  const referer = event.headers.referer || event.headers.Referer || "";
  const allowedOrigins = ["https://www.noorast.co.uk", "https://noorast.co.uk", "https://noorast.netlify.app"];
  const isLocalDev = origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1");
  if (!isLocalDev && !allowedOrigins.some(o => origin.startsWith(o) || referer.startsWith(o))) {
    return { statusCode: 403, body: JSON.stringify({ error: "Forbidden" }) };
  }

  // Rate limit
  const clientIp = event.headers["x-forwarded-for"]?.split(",")[0].trim()
    || event.headers["x-nf-client-connection-ip"]
    || "unknown";
  if (isRateLimited(clientIp)) {
    return { statusCode: 429, headers: { "Retry-After": "60" }, body: JSON.stringify({ error: "Too many requests. Please wait a moment." }) };
  }

  // Body size
  if (Buffer.byteLength(event.body || "", "utf8") > 1024) {
    return { statusCode: 413, body: JSON.stringify({ error: "Request too large" }) };
  }

  try {
    let body;
    try { body = JSON.parse(event.body); } catch {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
    }

    const address = sanitiseAddress(body.address);
    if (!address) {
      return { statusCode: 400, body: JSON.stringify({ error: "Valid address required (letters, numbers, spaces, commas)" }) };
    }

    // Geocode
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address + ", UK")}&format=json&limit=1&addressdetails=1`,
      { headers: { "User-Agent": "Noorast Property Passport (noorast.co.uk)" } }
    );
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: "Address not found. Try including postcode." }) };
    }

    const { lat, lon, display_name, address: addr } = geoData[0];
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    // Validate coordinates are within UK bounding box
    if (latitude < 49.5 || latitude > 61.0 || longitude < -8.5 || longitude > 2.0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Address must be within the United Kingdom" }) };
    }

    // Planning constraints
    const datasets = [
      "conservation-area", "article-4-direction-area", "flood-risk-zone",
      "listed-building", "tree-preservation-zone", "national-park",
      "area-of-outstanding-natural-beauty", "green-belt", "scheduled-monument",
    ];

    const constraintsRes = await fetch(
      `https://www.planning.data.gov.uk/entity.json?latitude=${latitude}&longitude=${longitude}&${datasets.map(d => `dataset=${d}`).join("&")}&field=name&field=dataset&field=reference&field=listed_building_grade&limit=50`
    );
    const constraintsData = await constraintsRes.json();

    // Planning applications
    const appsRes = await fetch(
      `https://www.planning.data.gov.uk/entity.json?latitude=${latitude}&longitude=${longitude}&dataset=planning-application&limit=10&field=name&field=reference&field=description&field=decision&field=start_date`
    );
    const appsData = await appsRes.json();

    const localAuthority = addr?.city || addr?.county || addr?.state_district || "Unknown";

    const constraints = {};
    (constraintsData.entities || []).forEach(entity => {
      const ds = entity.dataset;
      if (!constraints[ds]) constraints[ds] = [];
      constraints[ds].push({ name: entity.name || entity.reference, reference: entity.reference, grade: entity.listed_building_grade });
    });

    const planningApplications = (appsData.entities || []).map(e => ({
      reference: e.reference,
      description: e.name || e.description,
      decision: e.decision,
      date: e.start_date,
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "X-Content-Type-Options": "nosniff" },
      body: JSON.stringify({ address: display_name, latitude, longitude, localAuthority, constraints, planningApplications }),
    };
  } catch (err) {
    console.error("Planning search error:", err.message);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
  }
};
