// Planning history lookup using planning.data.gov.uk
// No API key required — public data

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  try {
    const { address } = JSON.parse(event.body || '{}');
    if (!address || typeof address !== 'string' || address.length < 3)
      return { statusCode: 400, body: JSON.stringify({ error: 'Address required' }) };

    const clean = address.replace(/[^a-zA-Z0-9\s,\-\.]/g, '').trim().substring(0, 200);

    // Step 1: Geocode
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(clean + ', UK')}&format=json&limit=1&addressdetails=1`,
      { headers: { 'User-Agent': 'Noorast Property Passport (noorast.co.uk)' } }
    );
    const geoData = await geoRes.json();
    if (!geoData?.length)
      return { statusCode: 404, body: JSON.stringify({ error: 'Address not found. Try including postcode.' }) };

    const { lat, lon, display_name, address: addr } = geoData[0];
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (latitude < 49.5 || latitude > 61.0 || longitude < -8.5 || longitude > 2.0)
      return { statusCode: 400, body: JSON.stringify({ error: 'Address must be within the UK' }) };

    // Step 2: Planning constraints
    const constraintDatasets = [
      'conservation-area', 'article-4-direction-area', 'flood-risk-zone',
      'listed-building', 'tree-preservation-zone', 'national-park',
      'area-of-outstanding-natural-beauty', 'green-belt', 'scheduled-monument',
    ];
    const constraintsRes = await fetch(
      `https://www.planning.data.gov.uk/entity.json?latitude=${latitude}&longitude=${longitude}&${constraintDatasets.map(d => `dataset=${d}`).join('&')}&field=name&field=dataset&field=reference&field=listed_building_grade&limit=50`
    );
    const constraintsData = await constraintsRes.json();

    const constraints = {};
    (constraintsData.entities || []).forEach((e: any) => {
      if (!constraints[e.dataset]) constraints[e.dataset] = [];
      constraints[e.dataset].push({ name: e.name || e.reference, grade: e.listed_building_grade });
    });

    // Step 3: Recent planning applications
    const appsRes = await fetch(
      `https://www.planning.data.gov.uk/entity.json?latitude=${latitude}&longitude=${longitude}&dataset=planning-application&limit=20&field=name&field=reference&field=description&field=decision&field=start_date&field=development-type`
    );
    const appsData = await appsRes.json();
    const applications = (appsData.entities || []).map((e: any) => ({
      reference: e.reference,
      description: e.name || e.description || 'No description',
      decision: e.decision,
      date: e.start_date,
      type: e['development-type'],
    })).filter((a: any) => a.reference);

    // Build summary for passport auto-fill
    const summary = {
      displayAddress: display_name,
      localAuthority: addr?.city || addr?.county || addr?.state_district || 'Unknown',
      latitude, longitude,
      constraints: {
        conservationArea: !!constraints['conservation-area']?.length,
        conservationAreaName: constraints['conservation-area']?.[0]?.name,
        article4: !!constraints['article-4-direction-area']?.length,
        floodRisk: constraints['flood-risk-zone']?.[0]?.name,
        listedBuilding: !!constraints['listed-building']?.length,
        listedBuildingGrade: constraints['listed-building']?.[0]?.grade,
        tpo: !!constraints['tree-preservation-zone']?.length,
        nationalPark: !!constraints['national-park']?.length,
        aonb: !!constraints['area-of-outstanding-natural-beauty']?.length,
        greenBelt: !!constraints['green-belt']?.length,
        scheduledMonument: !!constraints['scheduled-monument']?.length,
      },
      applications,
      raw: constraints,
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(summary),
    };
  } catch (err: any) {
    console.error('Planning lookup error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Lookup failed. Please try again.' }) };
  }
};
