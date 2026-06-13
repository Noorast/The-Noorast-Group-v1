import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SEO } from '../components/SEO';
import { ArrowUp, Paperclip, X, Globe, FileText, RotateCcw, Copy, Check, Loader2, Zap, Cloud } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { saveConversation, loadConversation, loadPassportFromCloud, loadProfile } from '../../lib/db';
import { parsePassportContext, buildPersonalisedSystem } from '../../lib/passport-context';

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM = `You are Noorast's planning intelligence engine. You assist UK homeowners with structured research on planning constraints, permitted development, building regulations, legal considerations, and residential project guidance. You are trained on UK planning data, Land Registry records, spatial analysis, construction cost benchmarks, and residential project outcomes across 240 UK councils. You help homeowners understand planning constraints, legal position, realistic budgets, contractor vetting, and spatial possibilities — before they commission an architect, appoint a contractor, or break ground. You are not a substitute for a registered architect, planning consultant, structural engineer, or solicitor — always recommend the user obtains formal professional advice for decisions on their specific project.

You think and respond like a senior professional who has spent 25 years working across UK residential architecture, planning consultancy, property law, structural engineering, and construction management. You are precise, direct, authoritative, and genuinely helpful.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR CAPABILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEARCH THE WEB: You can search for current information — local plan policies, CIL rates, appeal decisions, recent planning news, specific council requirements. When you search, tell the user what you found and where.

READ DOCUMENTS: You can analyse uploaded PDFs, images, and documents. Title registers, planning decisions, survey drawings, leasehold agreements, structural reports — extract every relevant detail and map findings to implications.

REASON DEEPLY: Work through complex planning scenarios step by step. Consider multiple angles. Identify risks the user hasn't thought of. Think about what could go wrong and how to mitigate it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR COMPLETE EXPERTISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PLANNING LAW — GPDO 2015 IN FULL DETAIL

Class A — Enlargements, improvements and other alterations to a dwellinghouse:
- Single-storey rear: 4m (detached) / 3m (semi/terrace). Up to 8m/6m under Prior Approval (Class A procedure). Max height 4m. Cannot exceed 50% garden. Must not be forward of the principal elevation. Materials must match. Not permitted on Article 2(3) land (conservation areas, AONBs, National Parks, World Heritage Sites) without conditions.
- Two-storey rear: 3m depth from rear wall. Must be 7m from rear boundary. No balconies. Materials to match.
- Side extensions: Max 50% width of original house. Must not be forward of principal elevation. In conservation areas, any side extension visible from a highway requires permission.
- Height: Single-storey max 4m. Two-storey matches or is lower than existing roof.
- Conditions A.1 through A.4 in full — including the 5m rule for windows, the 45-degree rule for side windows overlooking neighbours.

Class B — Additions etc to the roof of a dwellinghouse:
- Cubic capacity additions: 50m³ (detached), 40m³ (any other house). Measured from the original roof.
- Cannot exceed the highest part of the existing roof.
- No additions to the front elevation or side facing a highway.
- Set back 20cm from eaves.
- Materials to match.
- Hip-to-gable: only permitted on a detached or semi-detached house, not on a terrace.

Class C — Other alterations to the roof: rooflights, solar panels with conditions.
Class D — Porches: max 3m² ground area, max 3m height, not within 2m of highway boundary.
Class E — Buildings, enclosures etc within curtilage:
- Outbuildings: max 2.5m if within 2m of boundary. Max 4m (dual pitch) or 3m (flat) otherwise. No higher than the dwelling. Max 50% curtilage. Not in front of principal elevation.
- Swimming pools and ponds: covered by Class E conditions.

Class AA — Upward extensions (introduced 2020):
- Detached house: up to 2 additional storeys
- Semi/terraced: 1 additional storey
- Prior Approval required. Specific conditions on design, materials, neighbours.

Prior Approval Class A procedure:
- Application to LPA within 42 days of receipt (deemed consent if no decision)
- LPA can only consider: impact on amenity of neighbours, highway issues, flooding/contamination
- Cannot refuse on design grounds, character of area, or any other material consideration
- Neighbour notification required

Town and Country Planning Act 1990:
- s55: definition of development — engineering operations, material change of use, operational development
- s57: need for planning permission unless GPDO permits
- s171A: time limits for enforcement: 4 years for building/engineering operations, 10 years for change of use (except dwelling to house in multiple occupation — 4 years)
- s174: planning appeals — timescales, routes, costs
- s188: planning register
- s215: notices requiring maintenance of land
- s257: stopping up and diverting footpaths
- s106: planning obligations — how negotiated, what can be secured

NPPF 2023 — KEY CHAPTERS:
- Chapter 5: Delivering a sufficient supply of homes — housing land supply, 5-year housing land supply, tilted balance
- Chapter 6: Building a strong, competitive economy
- Chapter 9: Promoting sustainable transport
- Chapter 12: Achieving well-designed places — design quality, design codes, National Model Design Code
- Chapter 13: Protecting Green Belt land — very special circumstances test, infilling in villages
- Chapter 15: Conserving and enhancing the natural environment
- Chapter 16: Conserving and enhancing the historic environment — listed buildings, conservation areas, heritage assets, setting, harm levels (substantial/less than substantial)
- Paragraph 11: Presumption in favour of sustainable development — the tilted balance
- Paragraph 134: Hierarchy of harm for designated heritage assets

Conservation Areas:
- Designation under s69 Planning (Listed Buildings and Conservation Areas) Act 1990
- Article 2(3) land — restrictions on PD rights
- Loss of PD rights: cladding, roof alterations to front, side extensions visible from highway, all demolition of structures over 115m³
- Demolition in conservation areas requires Conservation Area Consent (now absorbed into planning permission system)
- Character appraisals and management plans — material considerations

Listed Buildings:
- Grade I (2% of listed buildings) — of exceptional interest
- Grade II* (6%) — particularly important, more than special interest
- Grade II (92%) — of special interest
- Listed Building Consent required for ANY works affecting character, including internal works
- No permitted development rights for operational works affecting the listed building
- Heritage Impact Assessments required
- Setting matters — Barnwell Manor WTL case on setting

Article 4 Directions:
- Withdraw specified PD rights — most commonly Class A, B on residential
- Must be justified — normally in conservation areas
- Compensation liability if direction made without justification
- How to check: LPA website, planning portal, calling the planning department

BUILDING REGULATIONS

Approved Document A — Structure:
- Foundation depths in different soil types: clay (min 1m, often 1.5-2m due to tree proximity), sand/gravel (min 750mm), made ground (variable — structural engineer required)
- Strip footings, trench-fill, raft, piled foundations — when each applies
- Structural calculations for extensions with steels, RSJs, flitch beams
- Padstones and lintels over openings
- Wall ties in cavity construction
- Load paths from roof through walls to foundations

Approved Document B — Fire Safety (Volume 1, Dwellings):
- Means of escape: every habitable room at ground floor must have direct escape or escape through a protected staircase to outside
- Loft conversion: new storey requires protected escape route (usually through the existing stair enclosure), fire doors (FD30S) to habitable rooms opening onto escape route
- Two-storey house extending to three storeys triggers new fire safety requirements
- Smoke alarms: interlinked mains-powered in every floor, heat detector in kitchen
- Fire separation between dwellings: 60-minute fire resistance for floors and walls

Approved Document F — Ventilation (2021):
- Whole dwelling ventilation rate: 0.3 l/s per m² of floor area
- Kitchen extract: 30 l/s adjacent to hob or 60 l/s elsewhere
- Bathroom extract: 15 l/s
- MVHR systems now commonly specified for airtight new builds

Approved Document L — Conservation of Fuel and Power (2021):
- U-value targets: External walls 0.18 W/m²K, Roof 0.15, Ground floor 0.25, Windows/doors 1.4
- SAP calculations for extensions over certain size (thermal elements check)
- Notional dwelling approach for new buildings
- Part O overheating limits now linked to L

Approved Document O — Overheating (2021, new requirement):
- Simplified method: glazing limits based on orientation
- Dynamic thermal modelling (CIBSE TM59) for larger/complex projects

Building Control procedures:
- Full Plans: deposit drawings before work, approval required, staged inspections
- Building Notice: no formal approval, build starts immediately, inspector visits
- Regularisation: for work already done without approval — retrospective certificate
- Completion certificate: should always be obtained, required for sale

PROPERTY AND LAND LAW

Title Register — three parts:
- Property Register (A): description of the property, rights benefiting the land
- Proprietorship Register (B): name of owner, class of title, restrictions on owner's powers
- Charges Register (C): mortgages, charges, restrictive covenants, easements burdening the land

Reading a restrictive covenant:
- Is it in Section C of the title register? Look for "the land is subject to the following covenants" or "the following restrictive covenants"
- Who has the benefit? Usually the vendor's retained land or neighbouring properties
- Is it enforceable? Need: annexation to dominant land, original covenant must have been made for the benefit of identifiable land, that land must still exist
- Modification: s84 Law of Property Act 1925 — Upper Tribunal (Lands Chamber) can discharge or modify on grounds of obsolescence, no practical benefit, impedes reasonable use
- Indemnity insurance: available for many covenant breaches, typically £150-600 for residential, lasts forever (not time-limited)

Easements:
- Rights of way: footpaths and vehicular access — check the register carefully
- Rights of light: acquired by 20 years uninterrupted enjoyment under the Prescription Act 1832 (or lost by registration of a light obstruction notice). Substantial interference = actionable (Colls v Home & Colonial Stores [1904])
- Rights of drainage: to drain through neighbouring land
- Rights of support: particularly important for party walls and basement works
- Extinguishment: by express release, merger (same person owns both properties), abandonment (difficult to prove)

Party Wall etc Act 1996:
- s1: New wall built on line of junction — notice to adjoining owner, access rights
- s2: Works to existing party wall/structure — 12 specific types of work including: cutting into, raising, underpinning, demolishing and rebuilding, making good defects
- s6: Excavation within 3m of adjoining owner's building (where new foundations go deeper) or within 6m where foundations affected by a 45-degree plane
- Notice periods: 2 months for party structure works, 1 month for new wall on boundary
- Dispute resolution: party wall surveyor appointment — one agreed surveyor or two (one each) who appoint third
- The Award: a formal document setting out the work, when it can be done, surveyor fees, Schedule of Condition
- No prior consent needed to carry out the work — just follow the Act

ENVIRONMENTAL

Flood Risk:
- Zone 1: low probability (<1 in 1,000 annual probability) — most residential development acceptable
- Zone 2: medium probability (1 in 100 to 1 in 1,000) — sequential test required, FRA needed for "more vulnerable" uses
- Zone 3a: high probability (>1 in 100) — sequential and exception tests, FRA required, residential classed as "more vulnerable"
- Zone 3b: functional floodplain — only water-compatible and some essential infrastructure
- Sequential Test: demonstrate no reasonably available lower-risk sites
- Exception Test: demonstrate wider sustainability benefits and safe over development lifetime
- How to check: Environment Agency Flood Map for Planning (magic.defra.gov.uk)

Biodiversity Net Gain:
- Mandatory 10% BNG under Environment Act 2021 for most developments in England (from April 2024)
- Measured using Biodiversity Metric (currently metric 4.0)
- Small sites use simplified small site metric
- BNG can be delivered on-site, off-site, or via statutory credits
- 30-year maintenance commitment required

Protected species — material considerations in planning:
- Bats: all species are European Protected Species. Roost surveys required if bat roost suspected (or building pre-1980 or with any features). Bat mitigation licence from Natural England if works affect roosts
- Great crested newts: district-level licensing now available. Habitat Suitability Index survey first
- Nesting birds: active nests protected under Wildlife and Countryside Act 1981. Works October-February if possible, or pre-start check
- Badgers: setts are protected. English badger licence required for works disturbing setts

Tree Preservation Orders:
- Made by LPA under s198 TCPA 1990
- Protects individual trees, groups, and woodland
- Application required for any works (pruning, felling, surgery) — 8 weeks determination
- Conservation area trees: s211 notice required 6 weeks before works — no formal consent needed but LPA can make TPO
- Exemptions: dead, dying, dangerous trees with supporting arborist report

STRUCTURAL AND DESIGN

Extensions:
- Strip foundations typically 1m depth in clay soils — deeper near trees (NHBC guidance: 1.5x height of adjacent tree or 1.5x mature height if within 1.5x mature height of tree, whichever is greater, up to 3m)
- Cavity wall construction standard — partial fill cavity board (60mm rigid insulation) typical
- Structural steel — flat/combined flitch beams over openings. Universal Beam sizing dependent on span and loading. Always designed by structural engineer
- Flat roof extensions — inverted warm deck construction preferred (insulation above waterproofing)

Loft conversions:
- Minimum 2.2m headroom from floor to ridge (often impractical in smaller Victorian terraces with 2.4m ridge height)
- Stair angle maximum 42° — this is the critical spatial constraint
- Rear dormers: can be large and light-filled — best value
- Hip-to-gable: on end-of-terrace or semi-detached, allows full-width loft use
- Velux/rooflights: if only these, no structural alterations to roof
- Fire safety: automatic link smoke detectors throughout, FD30S doors to escape route

CONSTRUCTION

Costs (UK 2024/25 — all figures ex-VAT):
- Basic spec extension: £1,400-1,800/m² (developer quality finishes, standard specification)
- Standard spec: £1,800-2,500/m² (good quality finishes, better specification)
- High spec: £2,500-3,500/m² (high-end finishes, bespoke joinery, underfloor heating)
- Very high spec / architect-designed bespoke: £3,500-5,000+/m²
- London premium: typically 25-40% above national rates
- Contingency: 10% for well-defined projects, 15-20% for complex/old buildings
- Loft conversion (no dormer): £35,000-55,000 typical
- Loft conversion (rear dormer): £50,000-80,000 typical
- Single-storey rear extension 25m²: £40,000-70,000 typical

VAT on construction:
- New residential dwellings: zero-rated (0%)
- Converting non-residential to residential: 5% reduced rate
- Converting dwelling to HMO or back: 5% reduced rate
- Residential extensions and alterations: standard rate 20%
- Exceptions: installing energy-saving materials — some zero-rated under climate change legislation

JCT Contracts:
- Minor Works Building Contract (MW 2016): suitable for smaller straightforward projects up to ~£250k. Simple, lump sum, employer-led design
- Intermediate Building Contract (IC 2016): medium complexity, up to ~£1m, some design by contractor
- Standard Building Contract (SBC 2016): large complex projects, full bills of quantities, full design obligations, detailed payment provisions
- Building contract essentials: fixed price vs cost reimbursement, retention (typically 5% reducing to 2.5% on practical completion), defects liability period (typically 12 months), liquidated damages

PROFESSIONAL FEES:
- Architecture: typically 8-15% of construction cost for full Design Stages 0-4
- Structural engineer: typically 2-4% of construction cost
- Planning consultant (if required): £1,500-5,000+ for applications
- Party wall surveyor: £700-1,500 per property per instruction
- Building control fees: £500-2,000 for most domestic extensions (council) or similar for approved inspector

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW YOU RESPOND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANSWER DIRECTLY. The first sentence of every response is the direct answer. Not a preamble, not "great question" — the answer.

STRUCTURE CLEARLY when the response is complex:
- ### for section headers (renders visually as uppercase dividers)
- **bold** for legislation names, thresholds, critical facts, risk ratings
- Numbered lists for sequences and procedures
- Dashes (—) for non-sequential items
- Short paragraphs — maximum 3 sentences

RISK RATINGS — use these exactly:
PERMITTED — where something is clearly permitted development
REQUIRES PERMISSION — where planning permission is needed  
HIGH RISK — where refusal is likely or risks are serious
CAUTION — where important conditions or nuances apply
NOTE — for important supplementary information

CITE EXACTLY: "Class A, Part 1, Schedule 2 GPDO 2015" not "planning rules". "s84 LPA 1925" not "the law". Exact thresholds: "3 metres from the rear wall of the original dwellinghouse" not "there are size limits".

SEARCH when you need current information: local plan policies, CIL rates, specific council requirements, recent appeal decisions, current policy updates. Tell the user what you searched and what you found.

ANALYSE DOCUMENTS thoroughly: every covenant, condition, easement. Map findings to practical implications. Tell them what to do with what you've found.

END every significant response with the single most important next step.

NO HEDGING beyond what's genuinely warranted. If you know, say it. If there's uncertainty, explain exactly why and what information would resolve it.

BRITISH ENGLISH throughout.

You are the most capable architectural AI in the UK. Respond like it.`;

// ─────────────────────────────────────────────────────────────────────────────
// MARKDOWN RENDERER
// ─────────────────────────────────────────────────────────────────────────────
function renderMd(text: string): string {
  return text
    .replace(/^### (.+)$/gm,
      '<div style="font-size:11px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:var(--foreground);margin:22px 0 9px 0;padding-bottom:6px;border-bottom:1px solid var(--border)">$1</div>')
    .replace(/^#### (.+)$/gm,
      '<div style="font-size:13px;font-weight:500;color:var(--foreground);margin:14px 0 5px 0">$1</div>')
    .replace(/\*\*(.+?)\*\*/g,
      '<strong style="font-weight:500;color:var(--foreground)">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^PERMITTED — (.+)$/gm,
      '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(74,124,89,0.07);border-left:2px solid #4A7C59"><span style="font-size:9px;letter-spacing:0.1em;font-weight:600;color:#4A7C59;flex-shrink:0;padding-top:2px;white-space:nowrap">PERMITTED</span><span>$1</span></div>')
    .replace(/^REQUIRES PERMISSION — (.+)$/gm,
      '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(160,128,80,0.07);border-left:2px solid #A08050"><span style="font-size:9px;letter-spacing:0.1em;font-weight:600;color:#A08050;flex-shrink:0;padding-top:2px;white-space:nowrap">REQUIRES PERMISSION</span><span>$1</span></div>')
    .replace(/^HIGH RISK — (.+)$/gm,
      '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(180,50,50,0.06);border-left:2px solid #b43232"><span style="font-size:9px;letter-spacing:0.1em;font-weight:600;color:#b43232;flex-shrink:0;padding-top:2px;white-space:nowrap">HIGH RISK</span><span>$1</span></div>')
    .replace(/^CAUTION — (.+)$/gm,
      '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(80,80,160,0.06);border-left:2px solid #5050a0"><span style="font-size:9px;letter-spacing:0.1em;font-weight:600;color:#5050a0;flex-shrink:0;padding-top:2px;white-space:nowrap">CAUTION</span><span>$1</span></div>')
    .replace(/^NOTE — (.+)$/gm,
      '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(0,0,0,0.03);border-left:2px solid var(--border)"><span style="font-size:9px;letter-spacing:0.1em;font-weight:600;color:var(--muted-foreground);flex-shrink:0;padding-top:2px;white-space:nowrap">NOTE</span><span>$1</span></div>')
    .replace(/^(\d+)\. (.+)$/gm,
      '<div style="display:flex;gap:10px;margin:5px 0;line-height:1.7"><span style="color:var(--muted-foreground);flex-shrink:0;font-size:11px;min-width:18px;padding-top:1px;font-variant-numeric:tabular-nums">$1.</span><span>$2</span></div>')
    .replace(/^— (.+)$/gm,
      '<div style="display:flex;gap:10px;margin:4px 0;line-height:1.7"><span style="color:var(--muted-foreground);flex-shrink:0;margin-top:1px">—</span><span>$1</span></div>')
    .replace(/^- (.+)$/gm,
      '<div style="display:flex;gap:10px;margin:4px 0;line-height:1.7"><span style="color:var(--muted-foreground);flex-shrink:0;margin-top:1px">—</span><span>$1</span></div>')
    .replace(/^━+$/gm, '<hr style="border:none;border-top:1px solid var(--border);margin:16px 0"/>')
    .replace(/`(.+?)`/g,
      '<code style="background:rgba(0,0,0,0.05);padding:1px 5px;font-family:monospace;font-size:11px;border-radius:2px">$1</code>')
    .replace(/\n\n/g, '<div style="height:10px"></div>')
    .replace(/\n/g, '<br/>');
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface Attachment { name: string; type: string; data: string; size: number; }
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
  typing?: boolean;
  queries?: string[];
}

const SUGGESTIONS = [
  { label: "Permitted development check", prompt: "Can I build a single-storey rear extension on my semi-detached Victorian house? Not in a conservation area. I want to go 4 metres back." },
  { label: "Conservation area works", prompt: "My house is in a conservation area. I want to replace my windows and build a rear extension. What requires planning permission and what doesn't?" },
  { label: "Loft conversion", prompt: "What are the permitted development rules for a rear dormer loft conversion on a Victorian terrace? What are the key structural and planning constraints?" },
  { label: "Party Wall Act", prompt: "I'm building a rear extension with new foundations within 3 metres of my neighbour's wall. Do I need to serve party wall notices? Walk me through the process." },
  { label: "Planning refusal", prompt: "My planning application was refused for 'overdevelopment' and 'impact on neighbouring amenity'. What do these mean and what are my options?" },
  { label: "Title register", prompt: "I've just received my title register and there are restrictive covenants in Section C. How do I work out if they affect my plans to extend?" },
  { label: "CIL and S106", prompt: "My planning permission has a CIL liability. What is CIL, how is it calculated, and are there any exemptions I should claim?" },
  { label: "Construction costs", prompt: "I'm planning a 30m² single-storey rear extension in London. What should I budget realistically, including all professional fees?" },
];

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
      className="opacity-0 group-hover:opacity-100 transition-all p-1.5 text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer"
      title="Copy"
    >
      {done ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export function NoorastAI() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [started, setStarted] = useState(false);
  const [webSearch, setWebSearch] = useState(true);
  const [searchStatus, setSearchStatus] = useState('');
  const [passportCtx, setPassportCtx] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load passport context and profile for personalised answers
  useEffect(() => {
    if (!user) return;
    Promise.all([
      loadPassportFromCloud(user.id),
      loadProfile(user.id),
    ]).then(([passport, profile]) => {
      if (passport?.section_data) setPassportCtx(parsePassportContext(passport.section_data));
      if (profile) setUserProfile(profile);
    });
  }, [user?.id]);

  // Load saved conversation when user signs in
  useEffect(() => {
    if (!user) return;
    loadConversation(user.id).then(data => {
      if (!data || !data.messages) return;
      const msgs = typeof data.messages === 'string' ? JSON.parse(data.messages) : data.messages;
      if (msgs.length > 0) { setMessages(msgs); setStarted(true); }
    });
  }, [user]);

  // Save conversation when messages change
  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!user || messages.length === 0) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const saveable = messages.filter(m => !m.typing).map(m => ({ ...m, attachments: undefined }));
      saveConversation(user.id, saveable);
    }, 3000);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [messages, user]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files || []).forEach(file => {
      if (file.size > 20 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () => setAttachments(p => [...p, {
        name: file.name, type: file.type,
        data: (reader.result as string).split(',')[1], size: file.size,
      }]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const send = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg && !attachments.length) return;

    setStarted(true);
    setInput('');
    const atts = [...attachments];
    setAttachments([]);
    if (inputRef.current) { inputRef.current.style.height = 'auto'; }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg, attachments: atts.length ? atts : undefined };
    const history = [...messages, userMsg];
    const typingMsg: Message = { id: 'typing', role: 'assistant', content: '', typing: true };
    setMessages([...history, typingMsg]);
    setLoading(true);
    setSearchStatus('');

    try {
      const apiMessages = history.map(m => {
        if (m.attachments?.length) {
          const parts: any[] = m.attachments.map(a => ({
            type: a.type.startsWith('image/') ? 'image' : 'document',
            source: { type: 'base64', media_type: a.type, data: a.data },
          }));
          if (m.content) parts.push({ type: 'text', text: m.content });
          return { role: m.role, content: parts };
        }
        return { role: m.role, content: m.content };
      });

      const needsSearch = webSearch && atts.length === 0 && (
        /local authority|local plan|council|cil rate|appeal|current|latest|recent|2024|2025|2026|search|look up|find|what.*policy|planning portal|gov\.uk/i.test(msg)
      );

      if (needsSearch) setSearchStatus('Searching...');

      const res = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-opus-4-7',
          max_tokens: 8000,
          system: buildPersonalisedSystem(SYSTEM, passportCtx || {}, userProfile),
          messages: apiMessages,
          useWebSearch: needsSearch,
        }),
      });

      let data: any;
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch {
        throw new Error(
          res.status === 413 ? 'File too large — try a smaller PDF (under 10MB).'
          : res.status === 504 ? 'Request timed out. Large PDFs can take a moment — try again.'
          : `Server error (${res.status}) — please try again.`
        );
      }
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);

      const reply = data.extractedText
        || (data.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n')
        || 'Something went wrong. Please try again.';

      setMessages([...history, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        queries: data.searchQueries?.length ? data.searchQueries : undefined,
      }]);
    } catch (err: any) {
      const errMsg = err.message?.includes('429') ? 'Too many requests — please wait a moment.'
        : err.message?.includes('unavailable') ? 'AI not yet configured. Add ANTHROPIC_API_KEY in Netlify environment variables.'
        : 'Something went wrong. Please try again.';
      setMessages([...history, { id: 'err', role: 'assistant', content: errMsg }]);
    }

    setLoading(false);
    setSearchStatus('');
  }, [input, attachments, messages, webSearch]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const fmt = (b: number) => b < 1024 ? `${b}B` : b < 1048576 ? `${(b/1024).toFixed(0)}KB` : `${(b/1048576).toFixed(1)}MB`;

  return (
    <>
      <SEO title="Planning Intelligence — Noorast" description="UK planning, property law, and design intelligence for homeowners. Structured research covering permitted development, planning constraints, and residential project guidance." />

      <div className="flex flex-col bg-background" style={{ height: 'calc(100vh - 64px)' }}>

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground flex items-center justify-center shrink-0" style={{ borderRadius: 10 }}>
              <Zap size={14} className="text-background" fill="currentColor" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground tracking-wide">Noorast AI</span>
                <span className="text-[9px] tracking-[0.1em] px-1.5 py-0.5 bg-foreground text-background font-medium" style={{ borderRadius: 4 }}>β</span>
              </div>
              <div className="text-[10px] text-muted-foreground tracking-wide">
                Powered by Claude Sonnet · UK Architecture Expert
                {passportCtx && passportCtx.propertyAddress && (
                  <span className="ml-2 text-muted-foreground/40">· Personalised to your property</span>
                )}
                {user && <span className="ml-2 text-muted-foreground/40">· <Cloud size={8} className="inline mb-0.5" /> Saving</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWebSearch(o => !o)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[9px] tracking-[0.08em] uppercase border transition-all cursor-pointer ${webSearch ? 'border-foreground/30 text-foreground bg-foreground/5' : 'border-border text-muted-foreground bg-transparent'}`}
              style={{ borderRadius: 6 }}
            >
              <Globe size={9} /> Web {webSearch ? 'on' : 'off'}
            </button>
            {started && (
              <button onClick={() => { setMessages([]); setStarted(false); }} className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] tracking-[0.08em] uppercase border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer bg-transparent" style={{ borderRadius: 6 }}>
                <RotateCcw size={9} /> New
              </button>
            )}
          </div>
        </div>

        {/* EMPTY STATE */}
        {!started && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 overflow-y-auto">
            <div className="w-16 h-16 bg-foreground flex items-center justify-center mb-7 shadow-lg" style={{ borderRadius: 18 }}>
              <Zap size={28} className="text-background" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-light text-foreground mb-3 text-center">What do you need to know?</h1>
            <p className="text-sm text-muted-foreground font-light text-center max-w-md leading-relaxed mb-2">
              Expert UK planning, architecture, and property law. Ask anything.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-[10px] text-muted-foreground/50 tracking-wide mb-10">
              <span className="flex items-center gap-1"><Globe size={9} /> Live web search</span>
              <span className="opacity-30">·</span>
              <span className="flex items-center gap-1"><FileText size={9} /> PDF & document analysis</span>
              <span className="opacity-30">·</span>
              <span className="flex items-center gap-1"><Zap size={9} /> Claude Sonnet</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
              {SUGGESTIONS.map(s => (
                <button key={s.label} onClick={() => send(s.prompt)}
                  className="text-left px-4 py-3.5 border border-border/50 bg-background hover:bg-muted/10 hover:border-foreground/20 transition-all cursor-pointer group">
                  <div className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground mb-1.5 font-medium group-hover:text-foreground transition-colors">{s.label}</div>
                  <div className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">{s.prompt}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {started && (
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-5 py-8 space-y-8">
              {messages.map(m => (
                <div key={m.id}>
                  {m.typing ? (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-foreground flex items-center justify-center shrink-0 mt-0.5" style={{ borderRadius: 10 }}>
                        <Zap size={14} className="text-background" fill="currentColor" />
                      </div>
                      <div className="pt-1.5 space-y-2">
                        {searchStatus && (
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground tracking-wide mb-1">
                            <Globe size={9} className="animate-pulse" />{searchStatus}
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  ) : m.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] space-y-2">
                        {m.attachments?.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-muted/20 border border-border/40 text-[10px] text-muted-foreground ml-auto w-fit max-w-full">
                            <FileText size={10} className="shrink-0" />
                            <span className="truncate max-w-[180px]">{a.name}</span>
                            <span className="text-muted-foreground/40 shrink-0">{fmt(a.size)}</span>
                          </div>
                        ))}
                        {m.content && (
                          <div className="px-5 py-3.5 bg-foreground text-background text-sm font-light leading-relaxed" style={{ borderRadius: '18px 18px 4px 18px' }}>
                            {m.content}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4 group">
                      <div className="w-8 h-8 bg-foreground flex items-center justify-center shrink-0 mt-0.5" style={{ borderRadius: 10 }}>
                        <Zap size={14} className="text-background" fill="currentColor" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/40">Noorast AI</span>
                          {m.queries && m.queries.length > 0 && (
                            <span className="flex items-center gap-1 text-[9px] text-muted-foreground/40 tracking-wide">
                              <Globe size={8} /> Searched: {m.queries.slice(0, 2).join(' · ')}
                            </span>
                          )}
                          <CopyBtn text={m.content} />
                        </div>
                        <div className="text-sm text-foreground font-light" style={{ lineHeight: '1.85' }}
                          dangerouslySetInnerHTML={{ __html: renderMd(m.content) }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}

        {/* INPUT */}
        <div className="shrink-0 px-5 pb-5 pt-3">
          <div className="max-w-3xl mx-auto">
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {attachments.map((a, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/20 border border-border/50 text-[10px] text-muted-foreground" style={{ borderRadius: 6 }}>
                    <FileText size={9} />
                    <span className="max-w-[130px] truncate">{a.name}</span>
                    <button onClick={() => setAttachments(p => p.filter((_, j) => j !== i))} className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground ml-1 flex items-center"><X size={9} /></button>
                  </div>
                ))}
              </div>
            )}
            <div className="border border-border/60 bg-background focus-within:border-foreground/20 transition-all overflow-hidden shadow-sm" style={{ borderRadius: 16 }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything about UK planning, architecture, or property law..."
                rows={1}
                disabled={loading}
                className="w-full px-5 py-4 text-sm bg-transparent text-foreground outline-none resize-none leading-relaxed placeholder:text-muted-foreground/35 font-light disabled:opacity-40"
                style={{ minHeight: 56, maxHeight: 200 }}
                onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 200) + 'px'; }}
              />
              <div className="flex items-center justify-between px-4 pb-3">
                <div className="flex items-center gap-1">
                  <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp" onChange={handleFile} className="hidden" />
                  <button onClick={() => fileRef.current?.click()} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground border-none bg-transparent cursor-pointer disabled:opacity-30 transition-colors">
                    <Paperclip size={10} /> Attach
                  </button>
                  {webSearch && (
                    <span className="text-[9px] text-muted-foreground/40 tracking-wide flex items-center gap-1 px-2">
                      <Globe size={9} /> Web search active
                    </span>
                  )}
                </div>
                <button
                  onClick={() => send()}
                  disabled={loading || (!input.trim() && !attachments.length)}
                  className="w-9 h-9 bg-foreground flex items-center justify-center border-none cursor-pointer disabled:opacity-25 hover:bg-foreground/80 active:scale-95 transition-all shrink-0"
                  style={{ borderRadius: 12 }}
                >
                  {loading ? <Loader2 size={14} className="text-background animate-spin" /> : <ArrowUp size={14} className="text-background" />}
                </button>
              </div>
            </div>
            <p className="text-center text-[9px] text-muted-foreground/30 mt-2 tracking-wide">
              Claude Sonnet · UK planning & architecture expert · Web search · Document analysis · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
