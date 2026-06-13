// Generates a professionally formatted HTML document from Passport data
// Printed/exported as PDF via window.print()

export function generateBriefHTML(data: any, profile: any, overall: number): string {
  const address = data?.property?.address || profile?.property_address || 'Property address not provided';
  const projectType = data?.brief?.project_type || profile?.project_type || 'Not specified';
  const budget = data?.brief?.budget || profile?.budget || 'Not specified';
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const SECTION_LABELS: Record<string, string> = {
    property: 'Property Details',
    planning_history: 'Planning History',
    planning_policy: 'Planning Policy',
    legal: 'Legal Constraints',
    site: 'Site Constraints',
    environmental: 'Environmental',
    spatial: 'Spatial Record',
    boundary: 'Boundary Record',
    circulation: 'Circulation',
    brief: 'Preliminary Brief',
    construction: 'Construction Notes',
    documents: 'Supporting Documents',
  };

  const sectionRows = Object.entries(SECTION_LABELS).map(([key, label]) => {
    const sectionData = data?.[key];
    if (!sectionData || typeof sectionData !== 'object') return '';
    const fields = Object.entries(sectionData)
      .filter(([, v]) => v && String(v).trim())
      .map(([k, v]) => `
        <tr>
          <td style="padding:6px 12px;font-size:11px;color:#6b6560;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #f0efec;width:160px;vertical-align:top">${k.replace(/_/g, ' ')}</td>
          <td style="padding:6px 12px;font-size:12px;color:#1a1a1a;border-bottom:1px solid #f0efec">${String(v)}</td>
        </tr>`).join('');
    if (!fields) return '';
    return `
      <div style="margin-bottom:32px;break-inside:avoid">
        <div style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6b6560;font-weight:500;padding-bottom:8px;border-bottom:2px solid #1a1a1a;margin-bottom:0">${label}</div>
        <table style="width:100%;border-collapse:collapse">${fields}</table>
      </div>`;
  }).filter(Boolean).join('');

  // Constraints summary
  const pp = data?.planning_policy || {};
  const constraints = [
    pp.conservation_area === true || pp.conservation_area === 'yes' ? 'Conservation Area' : null,
    pp.article_4 === true || pp.article_4 === 'yes' ? 'Article 4 Direction' : null,
    pp.listed_building === true || pp.listed_building === 'yes' ? 'Listed Building' : null,
    data?.environmental?.flood_zone ? `Flood Zone: ${data.environmental.flood_zone}` : null,
    data?.environmental?.trees_tpo === 'yes' ? 'Tree Preservation Order' : null,
  ].filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Property Passport — ${address}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; color:#1a1a1a; background:#fff; font-size:13px; line-height:1.6; }
    @media print {
      body { font-size:11px; }
      .no-print { display:none; }
      @page { margin: 20mm; }
    }
    .page { max-width:800px; margin:0 auto; padding:40px; }
  </style>
</head>
<body>
<div class="page">

  <!-- Cover -->
  <div style="border-bottom:3px solid #1a1a1a;padding-bottom:40px;margin-bottom:40px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px">
      <div>
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#6b6560;margin-bottom:8px">Property Passport</div>
        <div style="font-size:28px;font-weight:300;letter-spacing:-0.02em;color:#1a1a1a;line-height:1.1">Noorast</div>
      </div>
      <div style="text-align:right;font-size:11px;color:#6b6560">
        <div>${date}</div>
        <div style="margin-top:4px">noorast.co.uk</div>
      </div>
    </div>
    <div style="font-size:22px;font-weight:300;color:#1a1a1a;margin-bottom:8px">${address}</div>
    <div style="font-size:13px;color:#6b6560">${projectType} · ${budget}</div>
    ${constraints.length ? `<div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:8px">${constraints.map(c => `<span style="font-size:10px;letter-spacing:0.08em;text-transform:uppercase;padding:3px 8px;border:1px solid #1a1a1a;color:#1a1a1a">${c}</span>`).join('')}</div>` : ''}
  </div>

  <!-- Completion -->
  <div style="margin-bottom:40px;padding:20px;background:#f9f8f6;border-left:3px solid #1a1a1a">
    <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#6b6560;margin-bottom:8px">Passport Completion</div>
    <div style="font-size:32px;font-weight:300;color:#1a1a1a">${overall}%</div>
    <div style="width:100%;height:2px;background:#e5e4e1;margin-top:10px">
      <div style="height:2px;background:#1a1a1a;width:${overall}%"></div>
    </div>
  </div>

  <!-- Sections -->
  ${sectionRows}

  <!-- Footer -->
  <div style="margin-top:48px;padding-top:20px;border-top:1px solid #e5e4e1;font-size:10px;color:#9e9994;display:flex;justify-content:space-between">
    <span>Generated by Noorast · noorast.co.uk</span>
    <span>${date}</span>
  </div>

  <!-- Print button -->
  <div class="no-print" style="position:fixed;bottom:24px;right:24px">
    <button onclick="window.print()" style="padding:12px 24px;background:#1a1a1a;color:#fff;border:none;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:inherit">
      Save as PDF
    </button>
  </div>
</div>
</body>
</html>`;
}
