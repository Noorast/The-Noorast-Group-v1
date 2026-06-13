import { loadPassportFromCloud } from './db';

export interface PassportContext {
  propertyAddress?: string;
  propertyType?: string;
  tenure?: string;
  constructionType?: string;
  yearBuilt?: string;
  planningHistory?: string;
  planningPolicy?: string;
  conservationArea?: boolean;
  article4?: boolean;
  listedBuilding?: boolean;
  legalConstraints?: string;
  restrictiveCovenants?: string;
  partyWall?: string;
  siteConstraints?: string;
  floodRisk?: string;
  treesTPO?: string;
  ecological?: string;
  spatialRecord?: string;
  boundaryRecord?: string;
  preliminaryBrief?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

export function parsePassportContext(sectionData: any): PassportContext {
  if (!sectionData) return {};
  const s = sectionData;
  return {
    propertyAddress: s.property?.address || s.property?.full_address,
    propertyType: s.property?.property_type || s.property?.type,
    tenure: s.property?.tenure,
    constructionType: s.property?.construction_type,
    yearBuilt: s.property?.year_built || s.property?.construction_year,
    planningHistory: s.planning_history?.previous_applications || s.planning_history?.notes,
    planningPolicy: s.planning_policy?.notes,
    conservationArea: s.planning_policy?.conservation_area === true || s.planning_policy?.conservation_area === 'yes',
    article4: s.planning_policy?.article_4 === true || s.planning_policy?.article_4 === 'yes',
    listedBuilding: s.planning_policy?.listed_building === true || s.planning_policy?.listed_building === 'yes',
    legalConstraints: s.legal?.notes || s.legal?.constraints,
    restrictiveCovenants: s.legal?.restrictive_covenants,
    partyWall: s.legal?.party_wall,
    siteConstraints: s.site?.notes || s.site?.constraints,
    floodRisk: s.environmental?.flood_zone || s.environmental?.flood_risk,
    treesTPO: s.environmental?.trees_tpo || s.environmental?.tpo,
    ecological: s.environmental?.ecological_notes,
    spatialRecord: s.spatial?.notes,
    boundaryRecord: s.boundary?.notes,
    preliminaryBrief: s.brief?.description || s.brief?.notes,
    projectType: s.brief?.project_type,
    budget: s.brief?.budget,
    timeline: s.brief?.timeline,
  };
}

export function buildPersonalisedSystem(base: string, ctx: PassportContext, profile: any): string {
  const lines: string[] = [];

  if (ctx.propertyAddress || profile?.property_address) {
    lines.push(`PROPERTY ADDRESS: ${ctx.propertyAddress || profile.property_address}`);
  }
  if (ctx.propertyType) lines.push(`PROPERTY TYPE: ${ctx.propertyType}`);
  if (ctx.tenure) lines.push(`TENURE: ${ctx.tenure}`);
  if (ctx.constructionType) lines.push(`CONSTRUCTION: ${ctx.constructionType}`);
  if (ctx.yearBuilt) lines.push(`YEAR BUILT: ${ctx.yearBuilt}`);
  if (ctx.conservationArea) lines.push(`CONSERVATION AREA: Yes — permitted development rights are restricted`);
  if (ctx.article4) lines.push(`ARTICLE 4 DIRECTION: Yes — additional PD rights removed`);
  if (ctx.listedBuilding) lines.push(`LISTED BUILDING: Yes — Listed Building Consent required for works affecting character`);
  if (ctx.floodRisk) lines.push(`FLOOD RISK: ${ctx.floodRisk}`);
  if (ctx.treesTPO) lines.push(`TREES/TPO: ${ctx.treesTPO}`);
  if (ctx.legalConstraints) lines.push(`LEGAL CONSTRAINTS: ${ctx.legalConstraints}`);
  if (ctx.restrictiveCovenants) lines.push(`RESTRICTIVE COVENANTS: ${ctx.restrictiveCovenants}`);
  if (ctx.planningHistory) lines.push(`PLANNING HISTORY: ${ctx.planningHistory}`);
  if (ctx.preliminaryBrief) lines.push(`PROJECT BRIEF: ${ctx.preliminaryBrief}`);
  if (ctx.projectType || profile?.project_type) lines.push(`PROJECT TYPE: ${ctx.projectType || profile?.project_type}`);
  if (ctx.budget || profile?.budget) lines.push(`BUDGET: ${ctx.budget || profile?.budget}`);

  if (lines.length === 0) return base;

  return `${base}

━━━ THIS USER'S PROPERTY — USE THIS CONTEXT IN EVERY ANSWER ━━━

${lines.join('\n')}

When answering questions, refer to this specific property and its constraints. Do not give generic advice when you have specific information about their property. If they ask about permitted development, apply the thresholds to their specific house type. If they're in a conservation area, note the implications immediately. Make every answer personal to their situation.`;
}
