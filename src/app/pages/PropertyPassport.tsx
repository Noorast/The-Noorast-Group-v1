import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { SEO } from "../components/SEO";
import { Sparkles, X, Send, Paperclip, Loader2, Cloud, CloudOff, Search } from "lucide-react";
import { PassportAI } from "../components/PassportAI";
import { PassportInsights } from "../components/PassportInsights";
import { useAuth } from "../../lib/auth";
import { savePassportToCloud, loadPassportFromCloud } from "../../lib/db";
import { AuthModal } from "../components/AuthModal";
import { generateBriefHTML } from "../../lib/brief-generator";

const SYS = `You are Noorast's property intelligence research engine. You help homeowners complete their Property Passport accurately — answering questions about UK planning constraints, legal positions, site conditions, and budget modelling. You do not describe yourself as AI. Always recommend the user obtains formal professional advice from a registered architect, planning consultant, structural engineer, or solicitor for decisions on their specific project.

YOUR EXPERTISE: UK planning law (TCPA 1990, GPDO 2015, NPPF 2023), Building Regulations (Approved Documents A–R), property law (restrictive covenants, easements, Party Wall Act), environmental law (flood risk, protected species, BNG), spatial design, and construction finance.

HOW TO RESPOND:
- Always use clear structure. Use **bold** for key terms, legislation references, and critical thresholds.
- Use short paragraphs — never walls of text.
- When listing items, use dashes (—) not bullet points.
- Give exact figures and legislation: "Under Class A, Part 1, GPDO 2015, the limit is 4m for a detached house" not vague statements.
- Start with the direct answer, then explain. Don't bury the lead.
- Use ### headers to separate distinct topics in longer answers.
- Be warm but expert — like a knowledgeable friend, not a bureaucrat.
- British English throughout. Concise. No filler phrases.

CURRENT SECTION CONTEXT: Use the section data provided to give hyper-relevant advice for what the user is currently filling in.`;


async function callAI(messages: any[], currentSection: string, sectionData: any) {
  const ctx = `[Current section: ${currentSection}. Section data: ${JSON.stringify(sectionData)}]`;
  const apiMsgs = messages.map((m: any, i: number) => {
    const content = i === messages.length - 1 ? `${ctx}\n\n${m.content}` : m.content;
    if (m.file) return { role: "user", content: [{ type: "document", source: { type: "base64", media_type: m.file.type, data: m.file.data } }, { type: "text", text: content }] };
    return { role: m.role, content };
  });
  const res = await fetch("/.netlify/functions/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-opus-4-7", max_tokens: 1000, system: SYS, messages: apiMsgs }),
  });
  const d = await res.json();
  return d.content?.map((b: any) => b.type === "text" ? b.text : "").filter(Boolean).join("\n") || "Something went wrong.";
}

const SECTIONS = [
  { id: "property", title: "Property Details", num: "01" },
  { id: "planning_history", title: "Planning History", num: "02" },
  { id: "planning_policy", title: "Planning Policy", num: "03" },
  { id: "legal", title: "Legal Constraints", num: "04" },
  { id: "site", title: "Site Constraints", num: "05" },
  { id: "environmental", title: "Environmental", num: "06" },
  { id: "spatial", title: "Spatial Record", num: "07" },
  { id: "boundary", title: "Boundary Record", num: "08" },
  { id: "circulation", title: "Circulation", num: "09" },
  { id: "brief", title: "Preliminary Brief", num: "10" },
  { id: "constraints", title: "Constraint Register", num: "11" },
  { id: "documents", title: "Supporting Documents", num: "12" },
];

const CHECKLIST: Record<string, string[]> = {
  "Planning Intelligence": [
    "Planning history searched for your property",
    "Planning history searched for neighbouring properties",
    "All planning conditions identified and checked",
    "Local plan policies identified and read",
    "SPD / design guide obtained and read",
    "Conservation area status confirmed",
    "Article 4 Direction status checked",
    "Neighbourhood plan status checked",
    "Permitted development rights confirmed",
    "Neighbourhood pattern analysis completed",
  ],
  "Legal Intelligence": [
    "Title register obtained (£3)",
    "Title plan obtained (£3)",
    "Restrictive covenants identified",
    "Easements and rights of way identified",
    "Leasehold restrictions reviewed (if applicable)",
    "Chancel repair liability checked",
    "Mines and minerals reservation checked",
  ],
  "Site Intelligence": [
    "Measured survey commissioned and received",
    "Drainage records obtained",
    "Utility positions identified",
    "Tree positions and TPO status checked",
    "Protected species risk assessed",
    "Flood risk zone confirmed",
    "Ground conditions assessed",
    "Access constraints identified",
  ],
  "Boundary & Neighbours": [
    "Boundary positions confirmed",
    "Party Wall Act obligations identified",
    "Neighbour consultation completed",
    "Rights of light risk assessed",
  ],
  "Spatial & Design": [
    "Circulation analysis completed",
    "Spatial benchmarks applied",
    "Ceiling heights recorded",
    "Structural arrangement understood",
  ],
  Financial: [
    "Full project budget established",
    "Funding route confirmed",
    "Ceiling price researched",
    "VAT position confirmed",
  ],
  "Brief & Passport": [
    "Design brief written",
    "Budget envelope confirmed",
    "Value engineering priorities set",
    "Property passport compiled",
    "Constraint register finalised",
  ],
};

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "select";
  ph?: string;
  opts?: string[];
}

const FIELDS: Record<string, Field[]> = {
  property: [
    { key: "address", label: "Property Address", type: "textarea", ph: "Full address including postcode" },
    { key: "titleNumber", label: "Title Number", type: "text", ph: "e.g. GM123456" },
    { key: "tenure", label: "Tenure", type: "select", opts: ["", "Freehold", "Leasehold", "Commonhold"] },
    { key: "propertyType", label: "Property Type", type: "select", opts: ["", "Detached", "Semi-detached", "Terraced", "End-terrace", "Flat / Maisonette", "Bungalow", "Other"] },
    { key: "yearBuilt", label: "Approximate Year of Construction", type: "text", ph: "e.g. 1935" },
    { key: "constructionType", label: "Construction Type", type: "select", opts: ["", "Cavity brick", "Solid brick", "Stone", "Timber frame", "Steel frame", "Concrete", "Mixed", "Unknown"] },
    { key: "storeys", label: "Number of Storeys", type: "select", opts: ["", "1", "2", "3", "4+"] },
    { key: "bedrooms", label: "Number of Bedrooms", type: "select", opts: ["", "1", "2", "3", "4", "5+"] },
    { key: "notes", label: "Additional Notes", type: "textarea", ph: "Any relevant observations" },
  ],
  planning_history: [
    { key: "searchCompleted", label: "Planning Portal Search Completed", type: "select", opts: ["", "Yes", "No", "In progress"] },
    { key: "localAuthority", label: "Local Planning Authority", type: "text", ph: "e.g. Westminster City Council" },
    { key: "applications", label: "Planning Applications Found", type: "textarea", ph: "Reference, Description, Decision, Date, Conditions" },
    { key: "liveConditions", label: "Live Conditions Identified", type: "textarea", ph: "Conditions that remain live, especially PD right removals" },
    { key: "neighbourHistory", label: "Neighbour Planning History", type: "textarea", ph: "Notable applications on neighbouring properties" },
    { key: "patternNotes", label: "Pattern Recognition Notes", type: "textarea", ph: "Patterns in approvals and refusals" },
  ],
  planning_policy: [
    { key: "localPlan", label: "Local Plan", type: "text", ph: "Name and adoption date" },
    { key: "relevantPolicies", label: "Relevant Policies", type: "textarea", ph: "Policy references and key requirements" },
    { key: "spd", label: "SPD / Design Guide", type: "textarea", ph: "Name and key requirements" },
    { key: "conservationArea", label: "Conservation Area Status", type: "select", opts: ["", "Not in a conservation area", "In a conservation area", "Adjacent", "Unknown"] },
    { key: "conservationAppraisal", label: "Conservation Area Appraisal Notes", type: "textarea", ph: "Key character elements (if applicable)" },
    { key: "article4", label: "Article 4 Direction", type: "select", opts: ["", "No Article 4 applies", "Article 4 applies", "Unknown"] },
    { key: "neighbourhoodPlan", label: "Neighbourhood Plan", type: "select", opts: ["", "None", "In force", "In preparation", "Unknown"] },
  ],
  legal: [
    { key: "titleObtained", label: "Title Register Obtained", type: "select", opts: ["", "Yes", "No", "Ordered"] },
    { key: "covenants", label: "Restrictive Covenants", type: "textarea", ph: "Covenants from Section C of the title register" },
    { key: "easements", label: "Easements and Rights of Way", type: "textarea", ph: "List any easements or encumbrances" },
    { key: "leaseholdRestrictions", label: "Leasehold Restrictions", type: "textarea", ph: "Relevant lease terms (if applicable)" },
    { key: "chancellRepair", label: "Chancel Repair Liability", type: "select", opts: ["", "Not applicable", "Checked — no liability", "Indemnity obtained", "Needs checking"] },
    { key: "minesAndMinerals", label: "Mines and Minerals", type: "select", opts: ["", "Not applicable", "No reservation", "Reservation noted", "Coal Authority report obtained", "Needs checking"] },
    { key: "flyingFreehold", label: "Flying Freehold", type: "select", opts: ["", "Not applicable", "Present", "Not present"] },
    { key: "legalAdvice", label: "Professional Advice Summary", type: "textarea", ph: "Solicitor's advice on legal matters" },
  ],
  site: [
    { key: "drainage", label: "Drainage Layout", type: "textarea", ph: "Foul and surface water drainage. Public sewers near proposed works." },
    { key: "utilities", label: "Utility Positions", type: "textarea", ph: "Gas, water, electricity, telecoms" },
    { key: "groundConditions", label: "Ground Conditions", type: "textarea", ph: "Soil type, ground investigation results" },
    { key: "trees", label: "Trees and TPOs", type: "textarea", ph: "Positions, species, TPO status, root protection areas" },
    { key: "access", label: "Construction Access", type: "textarea", ph: "Side access, width, crane access, skip positions" },
    { key: "other", label: "Other Site Constraints", type: "textarea", ph: "Levels, retaining walls, overhead cables" },
  ],
  environmental: [
    { key: "floodZone", label: "Flood Risk Zone", type: "select", opts: ["", "Zone 1 — Low", "Zone 2 — Medium", "Zone 3 — High", "Not checked"] },
    { key: "surfaceWater", label: "Surface Water Risk", type: "select", opts: ["", "Low", "Medium", "High", "Not checked"] },
    { key: "protectedSpecies", label: "Protected Species", type: "textarea", ph: "Bat roost potential, nesting birds, survey status" },
    { key: "contamination", label: "Contaminated Land", type: "select", opts: ["", "No known contamination", "Investigation needed", "Search completed — clear", "Search completed — issues found", "Not checked"] },
    { key: "designations", label: "Nearby Designations", type: "textarea", ph: "SSSI, SAC, SPA, Local Nature Reserve" },
    { key: "biodiversity", label: "Biodiversity Notes", type: "textarea", ph: "BNG implications, garden features, mitigation" },
  ],
  spatial: [
    { key: "surveyStatus", label: "Measured Survey", type: "select", opts: ["", "Not commissioned", "Commissioned", "Received", "Not required"] },
    { key: "surveyRef", label: "Survey Provider / Reference", type: "text", ph: "e.g. Smith Surveys, Ref SS-2025-042" },
    { key: "gfArea", label: "Ground Floor Area (m²)", type: "text", ph: "e.g. 52" },
    { key: "ffArea", label: "First Floor Area (m²)", type: "text", ph: "e.g. 48" },
    { key: "ceilingGF", label: "Ground Floor Ceiling Height (m)", type: "text", ph: "e.g. 2.6" },
    { key: "ceilingFF", label: "First Floor Ceiling Height (m)", type: "text", ph: "e.g. 2.5" },
    { key: "structural", label: "Structural Notes", type: "textarea", ph: "Loadbearing walls, steelwork, modifications" },
    { key: "loft", label: "Loft Dimensions", type: "textarea", ph: "Ridge height, headroom, stair feasibility" },
  ],
  boundary: [
    { key: "status", label: "Boundary Positions", type: "select", opts: ["", "Confirmed by survey", "Assumed from title plan", "Disputed", "Survey commissioned", "Not assessed"] },
    { key: "partyWall", label: "Party Wall Obligations", type: "textarea", ph: "Boundaries triggering the Act. Adjoining owner details." },
    { key: "neighbours", label: "Neighbour Details", type: "textarea", ph: "Names, contact details, record of discussions" },
    { key: "agreements", label: "Boundary Agreements", type: "textarea", ph: "Existing agreements or deeds" },
    { key: "rightsOfLight", label: "Rights of Light", type: "textarea", ph: "Identified risks from neighbouring windows" },
  ],
  circulation: [
    { key: "existing", label: "Existing Circulation", type: "textarea", ph: "Movement patterns, bottlenecks, dead ends" },
    { key: "inefficiencies", label: "Key Inefficiencies", type: "textarea", ph: "What doesn't work about the current layout" },
    { key: "priorities", label: "Extension Priorities", type: "textarea", ph: "What the extension should achieve spatially" },
    { key: "insideOutside", label: "Inside–Outside Connection", type: "textarea", ph: "Current and desired relationship to garden" },
  ],
  brief: [
    { key: "overview", label: "Project Overview", type: "textarea", ph: "What are you proposing and why" },
    { key: "spatial", label: "Spatial Requirements", type: "textarea", ph: "Room by room: area, quality, light, connections" },
    { key: "quality", label: "Quality Priorities", type: "textarea", ph: "How should the finished space feel" },
    { key: "budget", label: "Budget Envelope (£)", type: "text", ph: "e.g. 95000" },
    { key: "contingency", label: "Contingency", type: "select", opts: ["", "10%", "15%", "20%", "25%"] },
    { key: "programme", label: "Programme", type: "textarea", ph: "Desired start, completion, deadlines" },
    { key: "essential", label: "Essential Items", type: "textarea", ph: "Items that cannot be cut" },
    { key: "desirable", label: "Desirable Items", type: "textarea", ph: "Items you want but could compromise on" },
    { key: "deferrable", label: "Deferrable Items", type: "textarea", ph: "Items that could wait or be omitted" },
  ],
  constraints: [
    { key: "planning", label: "Planning Constraints", type: "textarea", ph: "PD removals, policy restrictions, conservation requirements" },
    { key: "legal", label: "Legal Constraints", type: "textarea", ph: "Covenants, easements, lease terms" },
    { key: "site", label: "Site Constraints", type: "textarea", ph: "Drainage, utilities, trees, access, ground" },
    { key: "environmental", label: "Environmental Constraints", type: "textarea", ph: "Flood risk, ecology, contamination" },
    { key: "actions", label: "Actions Required", type: "textarea", ph: "For each constraint: what needs to happen" },
  ],
  documents: [
    { key: "titleReg", label: "Title Register", type: "select", opts: ["", "Obtained", "Ordered", "Not obtained"] },
    { key: "titlePlan", label: "Title Plan", type: "select", opts: ["", "Obtained", "Ordered", "Not obtained"] },
    { key: "survey", label: "Measured Survey", type: "select", opts: ["", "Received (CAD)", "Received (PDF)", "Commissioned", "Not commissioned"] },
    { key: "decisions", label: "Planning Decisions", type: "select", opts: ["", "All downloaded", "Partial", "Not downloaded"] },
    { key: "reports", label: "Officer's Reports", type: "select", opts: ["", "All downloaded", "Partial", "Not downloaded", "Not available"] },
    { key: "sewer", label: "Sewer Records", type: "select", opts: ["", "Obtained", "Requested", "Not requested"] },
    { key: "ecology", label: "Ecological Reports", type: "select", opts: ["", "Not required", "Commissioned", "Received", "Not commissioned"] },
    { key: "coal", label: "Coal Authority Report", type: "select", opts: ["", "Not required", "Obtained", "Not obtained"] },
    { key: "other", label: "Other Documents", type: "textarea", ph: "Any other documents gathered" },
  ],
};

async function load(k: string, fb: any) {
  try {
    const r = localStorage.getItem(k);
    return r ? JSON.parse(r) : fb;
  } catch {
    return fb;
  }
}

async function sv(k: string, d: any) {
  try {
    localStorage.setItem(k, JSON.stringify(d));
  } catch (e) {
    console.error(e);
  }
}

function buildPDF(data: any) {
  const d = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  let h = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Property Passport — Noorast</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;color:#2d2d2d;line-height:1.6;padding:50px 60px;max-width:780px;margin:0 auto;font-weight:400;letter-spacing:0.01em}
@media print{body{padding:30px}@page{margin:2.5cm}.np{display:none}}
h1{font-size:28px;font-weight:400;letter-spacing:0.05em;color:#2d2d2d;text-transform:uppercase;margin-bottom:8px}
.sub{font-size:10px;color:#78716c;font-weight:400;margin-bottom:2px;letter-spacing:0.2em;text-transform:uppercase}
.date{font-size:10px;color:#78716c;margin-bottom:40px;font-weight:400}
.rule{width:40px;height:1px;background:rgba(0,0,0,0.08);margin:10px 0 8px}
h2{font-size:11px;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:#78716c;margin:36px 0 16px;padding-bottom:8px;border-bottom:1px solid rgba(0,0,0,0.08)}
.fl{margin-bottom:14px}.flbl{font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#78716c;font-weight:400}
.fval{font-size:14px;margin-top:4px;white-space:pre-wrap;font-weight:400;color:#2d2d2d;line-height:1.7}.empty{color:#78716c;font-style:italic;font-size:12px}
.ft{margin-top:50px;padding-top:16px;border-top:1px solid rgba(0,0,0,0.08);font-size:10px;color:#78716c;text-align:center;letter-spacing:0.1em}
.btn{position:fixed;top:24px;right:24px;padding:10px 20px;background:#2d2d2d;color:#fff;border:none;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;font-family:'Inter',sans-serif;font-weight:400}
.btn:hover{background:#1a1a1a}
</style></head><body><button class="np btn" onclick="window.print()">Save as PDF</button>
<h1>NOORAST</h1><div class="rule"></div><div class="sub">Property Passport</div><div class="date">${d}</div>`;

  SECTIONS.forEach((s) => {
    const fs = FIELDS[s.id];
    const sd = data[s.id] || {};
    const has = fs.some((f) => sd[f.key]);
    h += `<h2>${s.num} &mdash; ${s.title}</h2>`;
    if (!has) {
      h += `<p class="empty">No data entered.</p>`;
      return;
    }
    fs.forEach((f) => {
      const v = sd[f.key];
      if (v)
        h += `<div class="fl"><div class="flbl">${f.label}</div><div class="fval">${v.replace(/</g, "&lt;")}</div></div>`;
    });
  });

  h += `<div class="ft">NOORAST · Property Passport · Pre-Architecture Design Intelligence</div></body></html>`;
  return h;
}

export function PropertyPassport() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState<'signin' | 'signup' | null>(null);
  const [cloudSynced, setCloudSynced] = useState(false);
  const [data, setData] = useState<any>(() => {
    try { const r = localStorage.getItem("np-data"); return r ? JSON.parse(r) : {}; } catch { return {}; }
  });
  const [checks, setChecks] = useState<Record<string, boolean>>(() => {
    try { const r = localStorage.getItem("np-checks"); return r ? JSON.parse(r) : {}; } catch { return {}; }
  });
  const [active, setActive] = useState("property");
  const [view, setView] = useState<"passport" | "checklist" | "ai">("passport");
  const [saving, setSaving] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Email capture modal — show once at section 5
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [captureEmail, setCaptureEmail] = useState('');
  const [captureSubmitting, setCaptureSubmitting] = useState(false);
  const [capturedAlready, setCapturedAlready] = useState(() => {
    try { return !!localStorage.getItem('np-email-captured'); } catch { return false; }
  });

  const handleEmailCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captureEmail || !captureEmail.includes('@')) return;
    setCaptureSubmitting(true);
    try {
      await fetch('/.netlify/functions/capture-passport-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: captureEmail }),
      });
      localStorage.setItem('np-email-captured', '1');
      setCapturedAlready(true);
    } catch { /* silent */ } finally {
      setCaptureSubmitting(false);
      setShowEmailCapture(false);
    }
  };

  // Onboarding — show once
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try { return !localStorage.getItem("np-onboarded"); } catch { return true; }
  });

  // Mobile section drawer
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Completion screen
  const [showCompletion, setShowCompletion] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(null);

  // AI chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [pendingFile, setPendingFile] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const dismissOnboarding = () => {
    try { localStorage.setItem("np-onboarded", "1"); } catch {}
    setShowOnboarding(false);
  };

  const runPlanningLookup = async () => {
    const address = data?.property?.address;
    if (!address) return;
    setLookupLoading(true);
    setLookupResult(null);
    try {
      const res = await fetch("/.netlify/functions/planning-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Lookup failed");
      setLookupResult(result);
      // Auto-fill planning policy section from lookup
      const c = result.constraints;
      const existingPolicy = data?.planning_policy || {};
      const updated = {
        ...existingPolicy,
        conservation_area: c.conservationArea ? "yes" : existingPolicy.conservation_area,
        conservation_area_name: c.conservationAreaName || existingPolicy.conservation_area_name,
        article_4: c.article4 ? "yes" : existingPolicy.article_4,
        listed_building: c.listedBuilding ? "yes" : existingPolicy.listed_building,
        listed_building_grade: c.listedBuildingGrade || existingPolicy.listed_building_grade,
        green_belt: c.greenBelt ? "yes" : existingPolicy.green_belt,
        aonb: c.aonb ? "yes" : existingPolicy.aonb,
        national_park: c.nationalPark ? "yes" : existingPolicy.national_park,
      };
      const envExisting = data?.environmental || {};
      const envUpdated = {
        ...envExisting,
        flood_zone: c.floodRisk || envExisting.flood_zone,
        trees_tpo: c.tpo ? "yes" : envExisting.trees_tpo,
      };
      setData((prev: any) => ({
        ...prev,
        planning_policy: updated,
        environmental: envUpdated,
      }));
    } catch (err: any) {
      setLookupResult({ error: err.message || "Lookup failed" });
    }
    setLookupLoading(false);
  };

  // Load from cloud when user signs in — merge with local data
  useEffect(() => {
    if (!user) return;
    loadPassportFromCloud(user.id).then(cloudData => {
      if (!cloudData) return;
      const cloudUpdated = new Date(cloudData.updated_at).getTime();
      const localDataStr = localStorage.getItem("np-data");
      const localData = localDataStr ? JSON.parse(localDataStr) : {};
      const localHasData = Object.keys(localData).length > 0;
      // Use whichever is newer — cloud wins if both exist
      if (cloudData.section_data && Object.keys(cloudData.section_data).length > 0) {
        setData(cloudData.section_data);
        setChecks(cloudData.checklist_data || {});
        localStorage.setItem("np-data", JSON.stringify(cloudData.section_data));
        localStorage.setItem("np-checks", JSON.stringify(cloudData.checklist_data || {}));
      }
      setCloudSynced(true);
    });
  }, [user]);

  // Auto-save to cloud every 5 seconds when user is signed in
  const cloudTimer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!user) return;
    if (cloudTimer.current) clearTimeout(cloudTimer.current);
    cloudTimer.current = setTimeout(() => {
      savePassportToCloud(user.id, data, checks).then(() => setCloudSynced(true));
    }, 5000);
    return () => { if (cloudTimer.current) clearTimeout(cloudTimer.current); };
  }, [data, checks, user]);
  const debounce = useCallback(
    (nd: any, nc: any) => {
      if (timer.current) clearTimeout(timer.current);
      setSaving(true);
      timer.current = setTimeout(async () => {
        await sv("np-data", nd);
        await sv("np-checks", nc);
        setSaving(false);
      }, 800);
    },
    []
  );

  const updateField = useCallback(
    (sec: string, key: string, val: string) => {
      setData((prev: any) => {
        const next = { ...prev, [sec]: { ...(prev[sec] || {}), [key]: val } };
        debounce(next, checks);
        return next;
      });
    },
    [checks, debounce]
  );

  const toggleCheck = useCallback(
    (key: string) => {
      setChecks((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        debounce(data, next);
        return next;
      });
    },
    [data, debounce]
  );

  const comp: Record<string, number> = {};
  SECTIONS.forEach((s) => {
    const fs = FIELDS[s.id];
    const sd = data[s.id] || {};
    const filled = fs.filter((f) => sd[f.key] && String(sd[f.key]).trim()).length;
    comp[s.id] = Math.round((filled / fs.length) * 100);
  });

  const overall = Math.round(SECTIONS.reduce((s, x) => s + comp[x.id], 0) / SECTIONS.length);
  const totalChk = Object.values(CHECKLIST).flat().length;
  const doneChk = Object.values(checks).filter(Boolean).length;
  const chkPct = Math.round((doneChk / totalChk) * 100);
  const curIdx = SECTIONS.findIndex((s) => s.id === active);

  const resetAll = async () => {
    if (confirm("Reset all data? This cannot be undone.")) {
      setData({});
      setChecks({});
      await sv("np-data", {});
      await sv("np-checks", {});
    }
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs, chatOpen]);

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text && !pendingFile) return;
    const userMsg = { role: "user", content: pendingFile ? `Document uploaded. ${text || "Analyse this for my Property Passport."}` : text, display: text || "Uploaded a document for analysis", file: pendingFile || undefined };
    const newMsgs = [...chatMsgs, userMsg];
    setChatMsgs(newMsgs); setChatInput(""); setPendingFile(null); setAiLoading(true);
    try {
      const reply = await callAI(newMsgs, SECTIONS[curIdx].title, data[active] || {});
      setChatMsgs([...newMsgs, { role: "assistant", content: reply, display: reply }]);
    } catch {
      setChatMsgs([...newMsgs, { role: "assistant", content: "Something went wrong.", display: "Something went wrong." }]);
    }
    setAiLoading(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPendingFile({ data: (reader.result as string).split(",")[1], type: file.type, name: file.name });
    reader.readAsDataURL(file);
    e.target.value = "";
  };


  return (
    <>
      <SEO
        title="Property Passport — Noorast"
        description="Pre-Architecture Design Intelligence Toolkit — Digital Property Passport Application"
      />

      {/* ── AUTH MODAL ─────────────────────────────────────── */}
      {showAuthModal && (
        <AuthModal
          defaultMode={showAuthModal}
          onClose={() => setShowAuthModal(null)}
        />
      )}

      {/* ── AUTH GATE — show until signed in ──────────────── */}
      {!authLoading && !user && (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center px-6">
          <div className="w-full max-w-lg">
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">Property Passport</div>
            <h1 className="mb-4 leading-tight" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
              Create a free account to access your Passport.
            </h1>
            <div className="w-10 h-px bg-border mb-8" />
            <p className="text-base text-muted-foreground font-light leading-relaxed mb-4">
              Your Property Passport saves 12 sections of intelligence about your home — planning history, legal constraints, site conditions, and design brief. It needs an account so your data is safe and accessible on any device.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10">
              Free forever. No card required. Takes 30 seconds.
            </p>
            <div className="space-y-3 mb-10">
              {[
                'Passport saved to the cloud — never lose your data',
                'Access on any device, any browser',
                'AI conversation memory — pick up where you left off',
                'Your data is private — only you can see it',
              ].map(item => (
                <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-muted-foreground/30 shrink-0">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowAuthModal('signup')}
                className="px-8 py-3.5 bg-foreground text-background text-[11px] tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors cursor-pointer border-none"
              >
                Create free account
              </button>
              <button
                onClick={() => setShowAuthModal('signin')}
                className="px-8 py-3.5 border border-border/60 text-foreground text-[11px] tracking-[0.15em] uppercase hover:border-foreground/30 hover:bg-muted/20 transition-all cursor-pointer bg-transparent"
              >
                Sign in
              </button>
            </div>
            <p className="text-xs text-muted-foreground/50 mt-6">
              Want to try the AI first? <a href="/ai" className="text-foreground underline underline-offset-4">Noorast AI is completely free</a> with no account required.
            </p>
          </div>
        </div>
      )}

      {/* ── ONBOARDING OVERLAY ────────────────────────────────── */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center px-6">
          <div className="w-full max-w-lg">
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">Welcome</div>
            <h1 className="text-3xl font-light text-foreground mb-2 leading-tight">
              Your Property Passport
            </h1>
            <div className="w-10 h-px bg-border mb-8" />
            <p className="text-base text-muted-foreground font-light leading-relaxed mb-6">
              Before you appoint an architect, you need to understand your site. The Property Passport guides you through 12 sections — covering everything from planning history and legal constraints to spatial records and your design brief.
            </p>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-10">
              Most homeowners skip this step. That's why projects get delayed, budgets overrun, and planning applications get refused. This takes 30–60 minutes and could save you thousands.
            </p>

            <div className="space-y-3 mb-10">
              {[
                { num: "01–04", label: "Planning & Legal", desc: "Understand what you can build and what constraints exist" },
                { num: "05–08", label: "Site & Environment", desc: "Document drainage, ecology, boundaries, and spatial data" },
                { num: "09–12", label: "Design & Brief", desc: "Define what you want and build a consultant-ready brief" },
              ].map(item => (
                <div key={item.num} className="flex gap-5 p-4 border border-border/50">
                  <div className="text-[10px] font-mono text-muted-foreground/50 pt-0.5 w-10 shrink-0">{item.num}</div>
                  <div>
                    <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium mb-0.5">{item.label}</div>
                    <div className="text-xs text-muted-foreground font-light">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={dismissOnboarding}
                className="px-8 py-3 bg-foreground text-background text-[11px] tracking-[0.15em] uppercase border-none cursor-pointer hover:bg-foreground/90 transition-colors"
              >
                Start my Passport
              </button>
              <span className="text-xs text-muted-foreground font-light">
                {user ? 'Your data saves to the cloud automatically' : 'Saves in your browser · Sign in to sync across devices'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-screen bg-background">{/* WRAP START */}
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background shrink-0 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl tracking-wider">NOORAST</h1>
            <div className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mt-0.5">
              Property Passport
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            {saving && (
              <span className="text-[10px] text-muted-foreground tracking-[0.1em] uppercase">Saving</span>
            )}
            {user && (
              <span className="hidden md:flex items-center gap-1.5 text-[9px] tracking-[0.1em] uppercase text-muted-foreground/50">
                {cloudSynced
                  ? <><Cloud size={9} /> Synced</>
                  : <><CloudOff size={9} /> Local only</>
                }
              </span>
            )}
            <nav className="flex gap-0 items-center">
              {(["passport", "checklist", "ai"] as const).map((v) => (
                v === "ai" ? (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`relative ml-3 px-3 md:px-4 py-1.5 text-[10px] md:text-[11px] tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 flex items-center gap-1.5 border rounded-full ${
                      view === v
                        ? 'text-foreground font-medium border-foreground bg-foreground/5'
                        : 'text-muted-foreground font-light hover:text-foreground border-border hover:border-foreground/20'
                    }`}
                  >
                    Noorast AI
                    <span className="text-[8px] tracking-wide px-1.5 py-0.5 rounded-full bg-foreground text-background font-medium leading-none">
                      β
                    </span>
                  </button>
                ) : (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 md:px-4 py-1.5 text-[10px] md:text-[11px] tracking-[0.15em] uppercase border-none cursor-pointer transition-colors duration-300 ${
                      view === v
                        ? 'text-foreground font-normal border-b border-foreground'
                        : 'text-muted-foreground font-light hover:text-foreground border-b border-transparent'
                    }`}
                  >
                    {v}
                  </button>
                )
              ))}
            </nav>
            <button
              onClick={() => {
                const w = window.open("", "_blank");
                if (w) {
                  w.document.write(generateBriefHTML(data, {}, overall));
                  w.document.close();
                }
              }}
              className="px-4 md:px-5 py-2 text-[10px] tracking-[0.15em] uppercase border border-border bg-transparent text-foreground cursor-pointer hover:bg-muted/30 transition-colors duration-300"
            >
              Export
            </button>
            <button
              onClick={() => navigate("/toolkit")}
              className="hidden md:block px-5 py-2 text-[10px] tracking-[0.15em] uppercase border border-border bg-transparent text-foreground cursor-pointer hover:bg-muted/30 transition-colors duration-300"
            >
              Back to Toolkit
            </button>
          </div>
        </header>

        {/* ── MOBILE SECTION NAV BAR ──────────────────────────── */}
        <div className="md:hidden flex items-center justify-between px-5 py-3 border-b border-border/50 bg-background shrink-0">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="flex items-center gap-3 text-left bg-transparent border-none cursor-pointer p-0"
          >
            <div>
              <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Section {SECTIONS[curIdx].num}</div>
              <div className="text-sm font-light text-foreground">{SECTIONS[curIdx].title}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground ml-1">
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-light text-foreground">{overall}</span>
            <span className="text-xs text-muted-foreground">%</span>
          </div>
        </div>

        {/* ── MOBILE SECTION DRAWER ───────────────────────────── */}
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex flex-col bg-background">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium">Sections</div>
              <button onClick={() => setMobileNavOpen(false)} className="bg-transparent border-none cursor-pointer text-muted-foreground p-1">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {SECTIONS.map(s => {
                const isA = s.id === active;
                const pct = comp[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => { setActive(s.id); setView("passport"); setMobileNavOpen(false); }}
                    className={`flex items-center w-full px-5 py-4 bg-transparent border-none cursor-pointer text-left border-b border-border/30 ${isA ? 'bg-muted/20' : ''}`}
                  >
                    <span className="text-[10px] text-muted-foreground/50 w-8 shrink-0 font-mono">{s.num}</span>
                    <span className={`text-sm flex-1 ${isA ? 'text-foreground font-medium' : 'text-muted-foreground font-light'}`}>{s.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">{pct}%</span>
                      <span className={`w-2 h-2 rounded-full ${pct >= 100 ? 'bg-green-700' : pct > 0 ? 'bg-amber-600' : 'bg-border'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          {/* SIDEBAR */}
          <aside className="hidden md:flex w-60 shrink-0 border-r border-border/50 bg-background flex-col overflow-hidden">
            <div className="px-5 py-5 pb-4">
              <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                Completion
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-light text-foreground">{overall}</span>
                <span className="text-xs text-muted-foreground font-light">%</span>
              </div>
              <div className="w-full h-px bg-border mt-3">
                <div
                  className="h-px bg-foreground transition-all duration-500 ease-out"
                  style={{ width: `${overall}%` }}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {SECTIONS.map((s) => {
                const isA = s.id === active;
                const pct = comp[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActive(s.id);
                      setView("passport");
                    }}
                    className={`flex items-center w-full px-5 py-2.5 bg-transparent border-none cursor-pointer text-left transition-all duration-200 ${
                      isA ? 'border-l-2 border-foreground' : 'border-l-2 border-transparent'
                    }`}
                  >
                    <span className="text-[10px] text-muted-foreground/70 w-5 shrink-0 tracking-tight">
                      {s.num}
                    </span>
                    <span className={`text-xs flex-1 tracking-tight transition-colors duration-200 ${
                      isA ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}>
                      {s.title}
                    </span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${
                        pct >= 100 ? 'bg-green-700' : pct > 0 ? 'bg-amber-600' : 'bg-border'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="px-5 py-3 border-t border-border/50">
              <button
                onClick={resetAll}
                className="text-[10px] text-muted-foreground bg-transparent border-none cursor-pointer tracking-[0.1em] uppercase hover:text-foreground transition-colors duration-300"
              >
                Reset Data
              </button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1 overflow-y-auto px-6 md:px-12 py-6 md:py-9">
            <div className="max-w-3xl mx-auto">
              {view === "ai" ? (
                <PassportAI
                  currentSection={SECTIONS[curIdx].title}
                  sectionData={data[active] || {}}
                  allData={data}
                />
              ) : view === "passport" ? (
                <>
                  {/* Mobile Progress Indicator */}
                  <div className="md:hidden mb-6 pb-4 border-b border-border/50">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-light text-foreground">{overall}</span>
                      <span className="text-xs text-muted-foreground">% complete</span>
                    </div>
                    <div className="w-full h-px bg-border">
                      <div
                        className="h-px bg-foreground transition-all duration-500 ease-out"
                        style={{ width: `${overall}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-10">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                      Section {SECTIONS[curIdx].num}
                    </div>
                    <h2 className="text-2xl font-light text-foreground m-0 leading-tight">
                      {SECTIONS[curIdx].title}
                    </h2>
                    <div className="w-10 h-px bg-border mt-3" />
                  </div>

                  {/* Property Intelligence — auto-analysis at 40%+ completion */}
                  {active === 'property' && (
                    <PassportInsights
                      passportData={data}
                      completionPercent={overall}
                    />
                  )}

                  {FIELDS[active].map((f) => (
                    <div key={f.key} className="mb-6">
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        {f.label}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea
                          value={(data[active] || {})[f.key] || ""}
                          placeholder={f.ph}
                          rows={4}
                          onChange={(e) => updateField(active, f.key, e.target.value)}
                          className="w-full px-3 py-2.5 text-sm leading-relaxed border border-border bg-background text-foreground outline-none resize-vertical min-h-[80px] focus:border-foreground transition-colors duration-200 placeholder:text-muted-foreground/50"
                        />
                      ) : f.type === "select" ? (
                        <select
                          value={(data[active] || {})[f.key] || ""}
                          onChange={(e) => updateField(active, f.key, e.target.value)}
                          className="w-full px-3 py-2.5 text-sm leading-relaxed border border-border bg-background text-foreground outline-none cursor-pointer focus:border-foreground transition-colors duration-200"
                        >
                          {f.opts!.map((o) => (
                            <option key={o} value={o}>
                              {o || "—"}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={(data[active] || {})[f.key] || ""}
                          placeholder={f.ph}
                          onChange={(e) => updateField(active, f.key, e.target.value)}
                          className="w-full px-3 py-2.5 text-sm leading-relaxed border border-border bg-background text-foreground outline-none focus:border-foreground transition-colors duration-200 placeholder:text-muted-foreground/50"
                        />
                      )}
                    </div>
                  ))}

                  {/* Planning lookup — only show on property section */}
                  {active === "property" && data?.property?.address && (
                    <div className="mt-2 mb-8 border border-border/50 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium mb-1">Planning Intelligence Lookup</div>
                          <p className="text-xs text-muted-foreground">Auto-populate planning constraints, conservation area status, flood risk, and recent applications from live government data.</p>
                        </div>
                        <button
                          onClick={runPlanningLookup}
                          disabled={lookupLoading}
                          className="ml-4 flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-[10px] tracking-[0.12em] uppercase hover:bg-foreground/85 transition-colors cursor-pointer border-none shrink-0 disabled:opacity-50"
                        >
                          {lookupLoading ? <Loader2 size={11} className="animate-spin" /> : <Search size={11} />}
                          {lookupLoading ? "Looking up..." : "Run lookup"}
                        </button>
                      </div>
                      {lookupResult && !lookupResult.error && (
                        <div className="mt-3 pt-3 border-t border-border/40 space-y-1.5">
                          <div className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground mb-2">Found & auto-filled:</div>
                          {[
                            lookupResult.constraints?.conservationArea && `Conservation area: ${lookupResult.constraints.conservationAreaName || "Yes"}`,
                            lookupResult.constraints?.article4 && "Article 4 Direction",
                            lookupResult.constraints?.listedBuilding && `Listed building: Grade ${lookupResult.constraints.listedBuildingGrade || "unknown"}`,
                            lookupResult.constraints?.floodRisk && `Flood zone: ${lookupResult.constraints.floodRisk}`,
                            lookupResult.constraints?.tpo && "Tree Preservation Order",
                            lookupResult.constraints?.greenBelt && "Green Belt",
                            lookupResult.constraints?.aonb && "AONB",
                            lookupResult.applications?.length && `${lookupResult.applications.length} planning application${lookupResult.applications.length !== 1 ? "s" : ""} found`,
                          ].filter(Boolean).map((item, i) => (
                            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                              <span className="text-green-700">✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                          {lookupResult.applications?.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border/30">
                              <div className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground mb-2">Recent applications:</div>
                              {lookupResult.applications.slice(0, 3).map((app: any, i: number) => (
                                <div key={i} className="py-2 border-b border-border/10 last:border-0">
                                  <div className="text-[10px] text-foreground font-medium">{app.reference}</div>
                                  <div className="text-[10px] text-muted-foreground">{app.description?.substring(0, 80)}{app.description?.length > 80 ? "..." : ""}</div>
                                  {app.decision && <div className="text-[9px] text-muted-foreground/60 mt-0.5">{app.decision} · {app.date}</div>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {lookupResult?.error && (
                        <p className="mt-2 text-xs text-red-600">{lookupResult.error}</p>
                      )}
                    </div>
                  )}

                  {/* Quick Ask — jump to AI tab pre-loaded with section context */}
                  <div className="mt-8 mb-2 p-4 border border-border/40 bg-muted/10 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-medium mb-1">
                        Have a question about this section?
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Noorast AI knows exactly what you've entered and can give specific advice.
                      </p>
                    </div>
                    <button
                      onClick={() => setView('ai')}
                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 text-[9px] tracking-[0.15em] uppercase bg-foreground text-background border-none cursor-pointer hover:bg-foreground/85 transition-colors whitespace-nowrap"
                    >
                      <Sparkles size={9} />
                      Ask AI
                    </button>
                  </div>

                  <div className="flex justify-between mt-6 pt-6 border-t border-border/50">
                    <button
                      onClick={() => curIdx > 0 && setActive(SECTIONS[curIdx - 1].id)}
                      disabled={curIdx === 0}
                      className={`px-5 py-2 text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                        curIdx > 0
                          ? 'border border-border bg-transparent text-foreground cursor-pointer hover:bg-muted/30'
                          : 'border border-transparent bg-transparent text-border cursor-default'
                      }`}
                    >
                      ← Previous
                    </button>
                    {curIdx < SECTIONS.length - 1 ? (
                      <button
                        onClick={() => {
                          // Show email capture modal when leaving section 5 (index 4) if not already captured
                          if (curIdx === 4 && !capturedAlready && !user) {
                            setShowEmailCapture(true);
                          }
                          setActive(SECTIONS[curIdx + 1].id);
                        }}
                        className="px-5 py-2 text-[10px] tracking-[0.15em] uppercase border-none bg-foreground text-background cursor-pointer hover:bg-foreground/90 transition-colors"
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowCompletion(true);
                          // Send completion email if signed in
                          if (user?.email) {
                            fetch('/.netlify/functions/send-email', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                type: 'passport-complete',
                                to: user.email,
                                data: {
                                  address: data?.property?.address || 'your property',
                                  pct: overall,
                                },
                              }),
                            }).catch(() => {});
                          }
                        }}
                        className="px-6 py-2 text-[10px] tracking-[0.15em] uppercase border-none bg-foreground text-background cursor-pointer hover:bg-foreground/90 transition-colors"
                      >
                        Complete Passport →
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-9">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                      Phase 1
                    </div>
                    <h2 className="text-2xl font-light text-foreground m-0">
                      Pre-Architecture Checklist
                    </h2>
                    <div className="w-10 h-px bg-border mt-3 mb-2" />
                    <div className="text-xs text-muted-foreground font-light">
                      {doneChk} of {totalChk} tasks — {chkPct}%
                    </div>
                    <div className="w-full h-px bg-border mt-3">
                      <div
                        className="h-px bg-foreground transition-all duration-500 ease-out"
                        style={{ width: `${chkPct}%` }}
                      />
                    </div>
                  </div>
                  {Object.entries(CHECKLIST).map(([cat, items]) => {
                    const catDone = items.filter((_, i) => checks[`${cat}::${i}`]).length;
                    return (
                      <div key={cat} className="mb-9">
                        <div className="flex justify-between items-baseline mb-3 pb-2 border-b border-border/50">
                          <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                            {cat}
                          </span>
                          <span className={`text-[10px] ${catDone === items.length ? 'text-green-700' : 'text-muted-foreground'}`}>
                            {catDone}/{items.length}
                          </span>
                        </div>
                        {items.map((item, i) => {
                          const key = `${cat}::${i}`;
                          const done = !!checks[key];
                          return (
                            <label
                              key={key}
                              className={`flex items-start gap-3 py-1.5 cursor-pointer text-xs leading-relaxed transition-colors duration-200 ${
                                done ? 'text-muted-foreground' : 'text-foreground'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={done}
                                onChange={() => toggleCheck(key)}
                                className="mt-1 accent-foreground shrink-0"
                              />
                              <span className={done ? "line-through" : ""}>{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* AI CHAT PANEL */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 h-[480px] bg-background border border-border flex flex-col shadow-2xl z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-foreground">Planning Intelligence</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{SECTIONS[curIdx].title}</div>
            </div>
            <div className="flex items-center gap-3">
              {chatMsgs.length > 0 && (
                <button onClick={() => setChatMsgs([])} className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground bg-transparent border-none cursor-pointer hover:text-foreground transition-colors">Clear</button>
              )}
              <button onClick={() => setChatOpen(false)} className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors flex items-center">
                <X size={15} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {chatMsgs.length === 0 && (
              <div className="text-center mt-10">
                <Sparkles size={18} className="mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-xs text-muted-foreground font-light leading-relaxed">Ask me anything about your {SECTIONS[curIdx].title.toLowerCase()}, or upload a document to analyse.</p>
              </div>
            )}
            {chatMsgs.map((m: any, i: number) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "user" ? (
                  <div className="max-w-[85%] px-3 py-2.5 text-xs leading-relaxed bg-foreground text-background">
                    {m.fileName && <div className="text-[10px] opacity-60 mb-1">📎 {m.fileName}</div>}
                    {m.display}
                  </div>
                ) : (
                  <div className="max-w-[90%] text-xs leading-relaxed text-foreground"
                    dangerouslySetInnerHTML={{
                      __html: (m.display || "")
                        .replace(/^### (.+)$/gm, '<div style="font-size:11px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--foreground);margin:14px 0 6px;padding-bottom:4px;border-bottom:1px solid var(--border)">$1</div>')
                        .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:500;color:var(--foreground)">$1</strong>')
                        .replace(/✅ (.+)/g, '<div style="display:flex;gap:8px;margin:6px 0;padding:8px 10px;background:rgba(74,124,89,0.08);border-left:2px solid #4A7C59"><span style="flex-shrink:0">✅</span><span>$1</span></div>')
                        .replace(/⚠️ (.+)/g, '<div style="display:flex;gap:8px;margin:6px 0;padding:8px 10px;background:rgba(160,128,80,0.08);border-left:2px solid #A08050"><span style="flex-shrink:0">⚠️</span><span>$1</span></div>')
                        .replace(/🔴 (.+)/g, '<div style="display:flex;gap:8px;margin:6px 0;padding:8px 10px;background:rgba(180,50,50,0.06);border-left:2px solid #b43232"><span style="flex-shrink:0">🔴</span><span>$1</span></div>')
                        .replace(/^(\d+)\. (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:var(--muted-foreground);flex-shrink:0;font-size:10px;padding-top:1px">$1.</span><span>$2</span></div>')
                        .replace(/^— (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:var(--muted-foreground);flex-shrink:0">—</span><span>$1</span></div>')
                        .replace(/^- (.+)$/gm, '<div style="display:flex;gap:8px;margin:3px 0"><span style="color:var(--muted-foreground);flex-shrink:0">—</span><span>$1</span></div>')
                        .replace(/\n\n/g, '<div style="height:8px"></div>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                )}
              </div>
            ))}
            {aiLoading && (
              <div className="flex justify-start">
                <div className="bg-muted px-3 py-2.5">
                  <Loader2 size={13} className="text-muted-foreground animate-spin" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {pendingFile && (
            <div className="px-4 py-2 border-t border-border/50 flex items-center gap-2 text-[10px] text-muted-foreground">
              <Paperclip size={11} />
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{pendingFile.name}</span>
              <button onClick={() => setPendingFile(null)} className="bg-transparent border-none cursor-pointer text-muted-foreground flex items-center"><X size={11} /></button>
            </div>
          )}

          <div className="p-3 border-t border-border/50 flex gap-2 items-end">
            <input ref={fileRef} type="file" accept=".pdf,image/*" onChange={handleFile} className="hidden" />
            <button onClick={() => fileRef.current?.click()} className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0 flex items-center">
              <Paperclip size={15} />
            </button>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask about this section..."
              rows={1}
              className="flex-1 px-2.5 py-2 text-xs border border-border bg-background text-foreground outline-none resize-none leading-relaxed focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
            />
            <button
              onClick={sendMessage}
              disabled={aiLoading || (!chatInput.trim() && !pendingFile)}
              className="bg-foreground border-none cursor-pointer text-background p-2 shrink-0 flex items-center disabled:opacity-30 hover:bg-foreground/90 transition-colors"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* AI FLOATING BUTTON */}
      <button
        onClick={() => setChatOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-foreground border-none cursor-pointer flex items-center justify-center shadow-lg z-50 hover:bg-foreground/90 transition-all duration-200"
      >
        {chatOpen ? <X size={17} className="text-background" /> : <Sparkles size={17} className="text-background" />}
      </button>

      {/* ── EMAIL CAPTURE MODAL (section 5) ───────────────────── */}
      {showEmailCapture && (
        <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-background p-8 border border-border">
            <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Save your progress</div>
            <h2 className="text-xl font-light mb-3">Pick up where you left off — from any device.</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Enter your email and we'll save your Passport to the cloud. We'll also send you a few short emails with planning intelligence that's worth knowing before you commission anyone.
            </p>
            <form onSubmit={handleEmailCapture} className="space-y-4">
              <input
                type="email"
                value={captureEmail}
                onChange={e => setCaptureEmail(e.target.value)}
                placeholder="your@email.co.uk"
                className="w-full px-4 py-3 border border-border bg-muted/10 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground transition-colors"
                required
              />
              <button
                type="submit"
                disabled={captureSubmitting}
                className="w-full px-4 py-3 bg-foreground text-background text-[10px] tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors disabled:opacity-50"
              >
                {captureSubmitting ? 'Saving...' : 'Save my progress →'}
              </button>
            </form>
            <button
              onClick={() => { setShowEmailCapture(false); localStorage.setItem('np-email-captured', 'skipped'); setCapturedAlready(true); }}
              className="mt-4 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors w-full text-center bg-transparent border-none cursor-pointer"
            >
              Skip — continue without saving
            </button>
          </div>
        </div>
      )}

      {/* ── COMPLETION SCREEN ─────────────────────────────────── */}
      {showCompletion && (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center px-6 overflow-y-auto py-12">
          <div className="w-full max-w-lg">

            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">
              Passport complete
            </div>
            <h1 className="text-3xl font-light text-foreground mb-2 leading-tight">
              You're ready to brief<br />an architect.
            </h1>
            <div className="w-10 h-px bg-border mb-8" />

            {/* Completion stats */}
            <div className="grid grid-cols-3 gap-2 mb-10">
              {[
                { label: "Sections completed", value: `${Object.values(comp).filter(v => v > 0).length}/12` },
                { label: "Passport completion", value: `${overall}%` },
                { label: "Checklist progress", value: `${Math.round((Object.values(checks).filter(Boolean).length / 43) * 100)}%` },
              ].map(stat => (
                <div key={stat.label} className="p-4 border border-border/50 text-center">
                  <div className="text-2xl font-light text-foreground mb-1">{stat.value}</div>
                  <div className="text-[9px] tracking-[0.08em] uppercase text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* What to do next */}
            <div className="mb-10">
              <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-4 font-medium">What to do next</div>
              <div className="space-y-0">
                {[
                  { num: "01", title: "Export your Passport", desc: "Use the Export button to save a PDF. Share it with any architect or planning consultant you speak to — it will immediately set you apart." },
                  { num: "02", title: "Appoint a planning consultant", desc: "If your project involves conservation areas, listed buildings, or a complex site — a planning consultant before an architect could save months." },
                  { num: "03", title: "Brief your architect", desc: "You now have everything an architect needs to give you an accurate fee proposal and start work immediately at Stage 0." },
                ].map(step => (
                  <div key={step.num} className="flex gap-5 py-5 border-b border-border/30">
                    <div className="text-[10px] font-mono text-muted-foreground/40 pt-0.5 w-6 shrink-0">{step.num}</div>
                    <div>
                      <div className="text-sm font-medium text-foreground mb-1">{step.title}</div>
                      <div className="text-xs text-muted-foreground font-light leading-relaxed">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA — work with Noorast */}
            <div className="p-6 border border-foreground/20 bg-foreground/[0.02] mb-8">
              <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3 font-medium">Ready to appoint an architect?</div>
              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
                Noorast provides architectural design services for residential extensions, renovations, and loft conversions across the UK. The studio works from RIBA Stage 0 through to Building Regulations submission, with ARB-registered architects on the team for projects that require them. Because you've completed your Passport, we can move faster and quote more accurately than any cold instruction.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="px-6 py-3 bg-foreground text-background text-[11px] tracking-[0.15em] uppercase text-center hover:bg-foreground/90 transition-colors"
                >
                  Start a project with Noorast
                </a>
                <button
                  onClick={() => {
                    const w = window.open("", "_blank");
                    if (w) { w.document.write(generateBriefHTML(data, {}, overall)); w.document.close(); }
                  }}
                  className="px-6 py-3 border border-border bg-transparent text-foreground text-[11px] tracking-[0.15em] uppercase hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  Export Passport PDF
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowCompletion(false)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
            >
              ← Back to Passport
            </button>
          </div>
        </div>
      )}
    </>
  );
}
