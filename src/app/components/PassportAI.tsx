import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUp, Paperclip, X, Globe, FileText, RotateCcw, Copy, Check, Loader2, Calculator, Wrench, MapPin } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { saveAIMemory, loadAIMemories, buildMemoryContext, type AIMemory } from '../../lib/db';
import { getSmartStarters } from '../../lib/ai-starters';

// ─────────────────────────────────────────────────────────────────
// SYSTEM PROMPT — No emojis. Pure expertise.
// ─────────────────────────────────────────────────────────────────
const buildSystem = (section: string, sectionData: any, allData?: any, memoryContext?: string) => {
  const propertyAddress = allData?.property?.address;
  const propertyType = allData?.property?.property_type || '';
  const tenure = allData?.property?.tenure || '';
  const yearBuilt = allData?.property?.year_built || '';
  const conservationArea = allData?.planning_policy?.conservation_area === 'yes';
  const article4 = allData?.planning_policy?.article_4 === 'yes';
  const listedBuilding = allData?.planning_policy?.listed_building === 'yes';
  const floodRisk = allData?.environmental?.flood_zone;
  const tpoTrees = allData?.environmental?.tpo_trees === 'yes';
  const partyWallLikely = allData?.boundary?.party_wall_likely === 'yes';
  const covenants = allData?.legal?.restrictive_covenants || '';
  const projectType = allData?.brief?.project_type || '';
  const budget = allData?.brief?.budget || '';
  const projectBrief = allData?.brief?.description || '';

  // Build risk profile
  const risks: string[] = [];
  if (conservationArea) risks.push('CONSERVATION AREA — design quality scrutinised, some PD rights removed');
  if (article4) risks.push('ARTICLE 4 DIRECTION — most householder PD rights removed');
  if (listedBuilding) risks.push('LISTED BUILDING — no PD rights, planning + LBC required');
  if (floodRisk && floodRisk !== 'Zone 1') risks.push(`FLOOD RISK ${floodRisk} — FRA likely required`);
  if (tpoTrees) risks.push('TPO TREES — extension must avoid root protection areas');
  if (tenure === 'Leasehold') risks.push('LEASEHOLD — freeholder consent required');
  if (covenants && covenants !== 'none' && covenants.toLowerCase() !== 'no') risks.push('RESTRICTIVE COVENANTS — check title register');
  if (partyWallLikely) risks.push('PARTY WALL ACT likely triggered — notices required');

  const isDetached = propertyType.toLowerCase().includes('detached') && !propertyType.toLowerCase().includes('semi');
  const pdDepth = isDetached ? '4m (8m prior approval)' : '3m (6m prior approval)';

  const propertyContext = [
    propertyAddress && `Address: ${propertyAddress}`,
    propertyType && `Property type: ${propertyType}`,
    tenure && `Tenure: ${tenure}`,
    yearBuilt && `Year built: ${yearBuilt}`,
    projectType && `Project intent: ${projectType}`,
    budget && `Budget: ${budget}`,
    projectBrief && `Brief: ${projectBrief}`,
    !article4 && !listedBuilding && `Standard PD depth: ${pdDepth}`,
  ].filter(Boolean).join('\n');

  const riskBlock = risks.length > 0
    ? `\nPROPERTY RISK FLAGS:\n${risks.map(r => `• ${r}`).join('\n')}`
    : '';

  return `You are Noorast's planning and property intelligence engine. You help UK homeowners research planning constraints, understand legal positions, model realistic budgets, and prepare for professional appointments. Your analysis draws on UK planning law, Land Registry records, local authority decision data, and building regulations. Always recommend the user obtains formal professional advice from a registered architect, planning consultant, structural engineer, or solicitor for decisions on their specific project. Do not describe yourself as AI or mention the technology powering you — you are a planning intelligence tool.

CURRENT CONTEXT: The user is working on their Property Passport, currently in the "${section}" section. Their entered data for this section: ${JSON.stringify(sectionData || {})}.
${propertyContext ? `\nKNOWN PROPERTY DETAILS:\n${propertyContext}${riskBlock}\n\nUse these details in every answer. When risk flags are present, address them proactively — the user needs to know.` : ''}

YOUR COMPLETE EXPERTISE

UK PLANNING LAW (your deepest specialism)
Every clause, threshold, and condition of the GPDO 2015 Schedule 2:
— Class A extensions: 4m detached / 3m semi/terrace single storey; 8m/6m under Prior Approval; max height 4m/ridge of original; 50% garden coverage rule; no side elevation facing highway; materials to match
— Class B roof extensions: cubic capacity limits (50m3 detached, 40m3 other); no fronts; no higher than ridge; must be set back 20cm from eaves
— Class C-H: all thresholds for outbuildings, fences, hard surfaces, chimney stacks, microgeneration
— Class AA: upward extensions on detached (2 storeys), other houses (1 storey) — specific conditions
— Prior Approval Class A: larger extensions up to 8m/6m — neighbour consultation scheme, 42-day determination
— Conservation Area effects: no side extensions, no cladding, no roof alterations to front elevation all require permission
— Article 4 Directions: what they typically remove (Class A PD), how to check (local authority website / planning register)
— Listed Building Consent: required for any works affecting character of Grade I, II*, or II buildings, including internal works
— NPPF 2023: all 17 chapters — presumption in favour, design quality, heritage assets, flood risk, green belt
— Planning conditions: discharge procedure, pre-commencement vs pre-occupation vs ongoing
— Appeal routes: written representations (fastest), hearings, inquiries; costs applications
— Enforcement: 4-year rule for operational development, 10-year rule for material change of use, LDC applications
— CIL: how it's calculated, self-build exemption, instalment policy
— Section 106: what obligations are typically secured, viability assessments

BUILDING REGULATIONS
— Approved Document A: foundations, lintels, cavity walls, structural calculations
— Approved Document B: means of escape, fire resistance periods, smoke alarms, protected routes
— Approved Document F: ventilation rates, MVHR, trickle vents, purge ventilation
— Approved Document H: foul drainage, surface water, soakaways, connection to sewer
— Approved Document L: SAP calculations, U-values (walls 0.18, roof 0.15, floor 0.25, windows 1.4)
— Approved Document O: overheating mitigation, glazing ratios
— Building Notice vs Full Plans: when each applies

PROPERTY AND LAND LAW
— Title register interpretation: property register, proprietorship register, charges register
— Restrictive covenants: identification in Section C, enforceability tests, modification under s84 LPA 1925
— Party Wall Act 1996: s1 notices, s2 notices, s6 notices; surveyors appointment; award process
— Rights of light: 20-year prescription, Waldram diagrams, 45-degree rule, 50% VSC test
— Easements: how created (express, implied, prescription), dominant/servient tenement, extinguishment

ENVIRONMENTAL AND ECOLOGICAL
— Flood zones 1, 2, 3a, 3b: sequential test and exception test application
— BNG: mandatory 10% under Environment Act 2021, small site metric
— Protected species: bats, great crested newts, nesting birds
— TPOs: s211 notice, application for works on TPO trees

DESIGN AND SPATIAL INTELLIGENCE
— Daylight and sunlight: BRE 2011 Guide — VSC 27% threshold, APSH, ADF
— Overlooking: 21m separation between habitable windows
— Residential space standards: NDSS minimum sizes
— Structural: load-bearing wall identification, RSJ/flitch beam sizing
— Loft conversion: minimum 2.2m headroom, stair angle max 42 degrees
— Construction costs 2024/25 UK: basic 1400-1800/m2, standard 1800-2400/m2, high spec 2400-3500/m2, London premium 25-40%

HOW YOU RESPOND

STYLE: Direct, precise, authoritative. Like the most knowledgeable person in the room who is completely on the homeowner's side. Never waffle. When you know the answer, give it.

NO EMOJIS. Use clean typographic structure.

FORMAT EVERY RESPONSE:
[Direct answer] — one clear sentence first.

Bold for legislation references, exact thresholds, critical facts.
Dash lists for non-sequential items.
Numbered lists for sequential steps.

Risk ratings:
PERMITTED — clearly permitted development
REQUIRES PERMISSION — planning permission needed
HIGH RISK — refusal is likely
CAUTION — conditions or nuances apply

SEARCHES: When the question involves a specific local authority, recent appeal decisions, current fee rates, or anything time-sensitive — search the web.

DOCUMENTS: When files are uploaded — extract every relevant detail, map all findings to planning/legal/design implications.

END every response with the single most important next action the user should take.

TOOLS AVAILABLE: You have access to three specialist tools — use them proactively:
- estimate_project_cost: Use whenever costs are discussed. Give real numbers, not vague ranges.
- check_permitted_development: Use when PD rules are relevant. Give precise limits, not generalities.
- lookup_planning_constraints: Use when the user has provided an address and wants live constraint data.
${memoryContext || ''}`;
};

// ─────────────────────────────────────────────────────────────────
// MARKDOWN RENDERER — clean, typographic, no emoji
// ─────────────────────────────────────────────────────────────────
function render(text: string): string {
  return text
    // Headers
    .replace(/^### (.+)$/gm, '<div class="ppa-h3">$1</div>')
    .replace(/^#### (.+)$/gm, '<div class="ppa-h4">$1</div>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="ppa-b">$1</strong>')
    // Risk labels
    .replace(/^PERMITTED — (.+)$/gm, '<div class="ppa-tag ppa-ok"><span class="ppa-tag-label">PERMITTED</span><span>$1</span></div>')
    .replace(/^REQUIRES PERMISSION — (.+)$/gm, '<div class="ppa-tag ppa-amber"><span class="ppa-tag-label">REQUIRES PERMISSION</span><span>$1</span></div>')
    .replace(/^HIGH RISK — (.+)$/gm, '<div class="ppa-tag ppa-red"><span class="ppa-tag-label">HIGH RISK</span><span>$1</span></div>')
    .replace(/^CAUTION — (.+)$/gm, '<div class="ppa-tag ppa-caution"><span class="ppa-tag-label">CAUTION</span><span>$1</span></div>')
    // Numbered lists
    .replace(/^(\d+)\. (.+)$/gm, '<div class="ppa-li-n"><span class="ppa-li-nn">$1.</span><span>$2</span></div>')
    // Dash lists
    .replace(/^— (.+)$/gm, '<div class="ppa-li"><span class="ppa-li-d">—</span><span>$1</span></div>')
    .replace(/^- (.+)$/gm, '<div class="ppa-li"><span class="ppa-li-d">—</span><span>$1</span></div>')
    // Horizontal rules
    .replace(/^━+$/gm, '<hr class="ppa-hr"/>')
    // Code
    .replace(/`(.+?)`/g, '<code class="ppa-code">$1</code>')
    // Spacing
    .replace(/\n\n/g, '<div class="ppa-gap"></div>')
    .replace(/\n/g, '<br/>');
}

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
interface Attachment { name: string; type: string; data: string; size: number; }
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: Attachment[];
  searching?: boolean;
  queries?: string[];
  toolsUsed?: string[];
}

interface Props {
  currentSection: string;
  sectionData: any;
  allData?: any;
}

// ─────────────────────────────────────────────────────────────────
// COPY BUTTON
// ─────────────────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
      className="opacity-0 group-hover:opacity-100 transition-all p-1 text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer"
    >
      {done ? <Check size={11} /> : <Copy size={11} />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// TOOL BADGE — shows which tools Claude used
// ─────────────────────────────────────────────────────────────────
function ToolBadges({ tools }: { tools: string[] }) {
  const labels: Record<string, { label: string; icon: React.ReactNode }> = {
    estimate_project_cost:      { label: 'Cost estimate', icon: <Calculator size={8} /> },
    check_permitted_development:{ label: 'PD rules',      icon: <Wrench size={8} /> },
    lookup_planning_constraints:{ label: 'Live lookup',   icon: <MapPin size={8} /> },
    web_search:                 { label: 'Web search',    icon: <Globe size={8} /> },
  };
  if (!tools?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {tools.map(t => labels[t] ? (
        <div key={t} className="flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-wide border border-border/40 text-muted-foreground/60">
          {labels[t].icon} {labels[t].label}
        </div>
      ) : null)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export function PassportAI({ currentSection, sectionData, allData }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [webSearch, setWebSearch] = useState(true);
  const [memories, setMemories] = useState<AIMemory[]>([]);
  const [memoriesLoaded, setMemoriesLoaded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Load cross-session memories on mount
  useEffect(() => {
    if (!user || memoriesLoaded) return;
    setMemoriesLoaded(true);
    loadAIMemories(user.id).then(setMemories).catch(() => {});
  }, [user, memoriesLoaded]);

  // Auto-save memory when conversation reaches 6+ messages
  useEffect(() => {
    if (!user || messages.length < 6) return;
    // Save every 6 messages (avoid saving too frequently)
    if (messages.length % 6 !== 0) return;
    const propertyAddress = allData?.property?.address;
    saveAIMemory(user.id, messages, propertyAddress).catch(() => {});
  }, [messages.length, user]);

  // Save on unmount if conversation has 4+ messages
  useEffect(() => {
    return () => {
      if (user && messages.length >= 4) {
        const propertyAddress = allData?.property?.address;
        saveAIMemory(user.id, messages, propertyAddress).catch(() => {});
      }
    };
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE = 4 * 1024 * 1024; // 4MB — base64 encoding ~1.33x, stays under Netlify 6MB limit
    Array.from(e.target.files || []).forEach(file => {
      if (file.size > MAX_FILE) {
        setMessages(prev => [...prev, {
          id: `err-${Date.now()}`,
          role: 'assistant' as const,
          content: `${file.name} is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum file size is 4MB. Try compressing the PDF or splitting it into smaller sections.`,
        }]);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setAttachments(p => [...p, { name: file.name, type: file.type, data: (reader.result as string).split(',')[1], size: file.size }]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const send = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg && !attachments.length) return;

    setInput('');
    const atts = [...attachments];
    setAttachments([]);

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msg, attachments: atts.length ? atts : undefined };
    const next = [...messages, userMsg];
    setMessages([...next, { id: 'typing', role: 'assistant', content: '', searching: true }]);
    setLoading(true);

    try {
      const apiMessages = next.map(m => {
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

      const needsSearch = webSearch && /local authority|local plan|council|appeal|current|latest|recent|planning portal|policy|rate|fee|2024|2025|2026|search|find|look up|check|what.*rate|how much/i.test(msg);

      // Build memory context string for system prompt
      const memoryContext = buildMemoryContext(memories);

      const res = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-opus-4-7',
          max_tokens: 5000,
          system: buildSystem(currentSection, sectionData, allData, memoryContext),
          messages: apiMessages,
          useWebSearch: needsSearch,
          useTools: true,
        }),
      });

      // Safe JSON parse — Netlify can return plain text on timeout/gateway errors
      let data: any;
      try {
        const text = await res.text();
        data = JSON.parse(text);
      } catch {
        throw new Error(
          res.status === 413 ? 'File too large — try a smaller PDF (under 10MB).'
          : res.status === 504 ? 'Request timed out. Large PDFs can take a moment — please try again.'
          : res.status === 502 || res.status === 503 ? 'Service temporarily unavailable. Please try again in a moment.'
          : `Server error (${res.status}) — please try again.`
        );
      }
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);

      const reply = data.extractedText ||
        (data.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('\n') ||
        'Something went wrong.';

      setMessages([...next, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        queries: data.searchQueries,
        toolsUsed: data.toolsUsed,
      }]);
    } catch (err: any) {
      const errMsg = err.message?.includes('429') ? 'Too many requests — please wait a moment and try again.'
        : err.message?.includes('unavailable') ? 'AI service not yet configured. Check ANTHROPIC_API_KEY is set in Netlify.'
        : err.message?.includes('403') ? 'Request blocked — check the domain is allowed in the AI function.'
        : err.message?.includes('Failed to fetch') ? 'Cannot reach the AI function. Check Netlify deploy succeeded and functions directory is correct.'
        : `Error: ${err.message || 'Unknown error'}`;
      setMessages([...next, { id: 'err', role: 'assistant', content: errMsg }]);
    }
    setLoading(false);
  }, [input, attachments, messages, webSearch, currentSection, sectionData, allData, memories]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const clear = () => { setMessages([]); setAttachments([]); setInput(''); };
  const fmt = (b: number) => b < 1024 ? `${b}B` : b < 1048576 ? `${(b/1024).toFixed(0)}KB` : `${(b/1048576).toFixed(1)}MB`;

  // Smart starters — context-aware based on section and passport data
  const starters = getSmartStarters(currentSection, sectionData, allData);

  return (
    <>
      <style>{`
        .ppa-h3 { font-size:11px; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:var(--foreground); margin:18px 0 7px; padding-bottom:5px; border-bottom:1px solid var(--border); }
        .ppa-h4 { font-size:12px; font-weight:500; color:var(--foreground); margin:12px 0 5px; }
        .ppa-b { font-weight:500; color:var(--foreground); }
        .ppa-gap { height:9px; display:block; }
        .ppa-hr { border:none; border-top:1px solid var(--border); margin:14px 0; }
        .ppa-code { background:rgba(0,0,0,0.05); padding:1px 4px; font-family:monospace; font-size:10px; border-radius:2px; }
        .ppa-li { display:flex; gap:9px; margin:3px 0; line-height:1.65; }
        .ppa-li-d { color:var(--muted-foreground); flex-shrink:0; font-size:11px; margin-top:1px; }
        .ppa-li-n { display:flex; gap:9px; margin:4px 0; line-height:1.65; }
        .ppa-li-nn { color:var(--muted-foreground); flex-shrink:0; font-size:10px; min-width:16px; padding-top:2px; font-variant-numeric:tabular-nums; }
        .ppa-tag { display:flex; align-items:flex-start; gap:10px; margin:7px 0; padding:9px 12px; line-height:1.5; font-size:12px; }
        .ppa-tag-label { font-size:9px; letter-spacing:0.1em; font-weight:600; flex-shrink:0; padding-top:2px; white-space:nowrap; }
        .ppa-ok { background:rgba(74,124,89,0.07); border-left:2px solid #4A7C59; }
        .ppa-ok .ppa-tag-label { color:#4A7C59; }
        .ppa-amber { background:rgba(160,128,80,0.07); border-left:2px solid #A08050; }
        .ppa-amber .ppa-tag-label { color:#A08050; }
        .ppa-red { background:rgba(180,50,50,0.06); border-left:2px solid #b43232; }
        .ppa-red .ppa-tag-label { color:#b43232; }
        .ppa-caution { background:rgba(80,80,160,0.06); border-left:2px solid #5050a0; }
        .ppa-caution .ppa-tag-label { color:#5050a0; }
      `}</style>

      <div className="flex flex-col h-full">

        {/* Top bar */}
        <div className="flex items-center justify-between px-1 py-3 border-b border-border/40 shrink-0">
          <div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium">Noorast AI</div>
            <div className="text-[9px] text-muted-foreground mt-0.5 tracking-wide flex items-center gap-1.5">
              {currentSection}
              {memories.length > 0 && (
                <span className="text-[8px] text-muted-foreground/50 border border-border/40 px-1.5 py-0.5">
                  {memories.length} past session{memories.length !== 1 ? 's' : ''} remembered
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setWebSearch(o => !o)}
              className={`flex items-center gap-1 px-2.5 py-1 text-[9px] tracking-[0.08em] uppercase border transition-all cursor-pointer ${webSearch ? 'border-foreground/25 text-foreground bg-foreground/4' : 'border-border/50 text-muted-foreground bg-transparent'}`}
            >
              <Globe size={8} />
              {webSearch ? 'Web on' : 'Web off'}
            </button>
            {messages.length > 0 && (
              <button onClick={clear} className="flex items-center gap-1 px-2.5 py-1 text-[9px] tracking-[0.08em] uppercase border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all cursor-pointer bg-transparent">
                <RotateCcw size={8} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 px-1">
          {messages.length === 0 ? (
            <div className="space-y-2 pt-2">
              {memories.length > 0 && (
                <div className="px-3 py-2.5 bg-muted/10 border border-border/40 mb-4">
                  <div className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground/50 mb-1.5">From previous sessions</div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {memories[0].summary}
                  </p>
                  {memories.length > 1 && (
                    <p className="text-[9px] text-muted-foreground/40 mt-1">+ {memories.length - 1} earlier session{memories.length > 2 ? 's' : ''}</p>
                  )}
                </div>
              )}
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                Ask anything about UK planning, architecture, or property law. I'm aware you're in the <strong className="text-foreground font-medium">{currentSection}</strong> section.
              </p>
              {starters.map(s => (
                <button key={s} onClick={() => send(s)} className="w-full text-left px-3 py-2.5 border border-border/50 hover:border-foreground/25 hover:bg-muted/10 transition-all cursor-pointer text-[11px] text-muted-foreground leading-relaxed bg-transparent">
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map(m => (
                <div key={m.id}>
                  {m.searching ? (
                    <div className="flex items-center gap-2 py-2">
                      {webSearch && <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground tracking-wide mb-1"><Globe size={8} className="animate-pulse" />Searching...</div>}
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  ) : m.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] space-y-1.5">
                        {m.attachments?.map((a, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/20 border border-border/40 text-[10px] text-muted-foreground">
                            <FileText size={9} /><span className="truncate max-w-[120px]">{a.name}</span><span className="opacity-50">{fmt(a.size)}</span>
                          </div>
                        ))}
                        {m.content && (
                          <div className="px-3.5 py-2.5 bg-foreground text-background text-xs font-light leading-relaxed" style={{ borderRadius: '14px 14px 3px 14px' }}>
                            {m.content}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="group">
                      {m.queries && m.queries.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/50 mb-2 tracking-wide">
                          <Globe size={8} />Searched: {m.queries.slice(0, 2).join(' · ')}
                        </div>
                      )}
                      {m.toolsUsed && m.toolsUsed.length > 0 && (
                        <ToolBadges tools={m.toolsUsed} />
                      )}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground/40">Noorast AI</span>
                        <CopyBtn text={m.content} />
                      </div>
                      <div
                        className="text-xs text-foreground font-light"
                        style={{ lineHeight: '1.8' }}
                        dangerouslySetInnerHTML={{ __html: render(m.content) }}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-1 pb-2 shrink-0">
            {attachments.map((a, i) => (
              <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/20 border border-border/50 text-[10px] text-muted-foreground">
                <FileText size={9} /><span className="max-w-[100px] truncate">{a.name}</span>
                <button onClick={() => setAttachments(p => p.filter((_, j) => j !== i))} className="bg-transparent border-none cursor-pointer text-muted-foreground ml-0.5 flex items-center"><X size={9} /></button>
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="shrink-0 pt-2 border-t border-border/40">
          <div className="flex gap-2 items-end">
            <div className="flex-1 border border-border/60 bg-background focus-within:border-foreground/20 transition-all overflow-hidden" style={{ borderRadius: '10px' }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything about planning, architecture, or property law..."
                rows={1}
                disabled={loading}
                className="w-full px-3.5 py-2.5 text-xs bg-transparent text-foreground outline-none resize-none leading-relaxed placeholder:text-muted-foreground/35 font-light disabled:opacity-40"
                style={{ minHeight: 40, maxHeight: 120 }}
                onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 120) + 'px'; }}
              />
              <div className="flex items-center justify-between px-2.5 pb-2">
                <div className="flex items-center gap-1">
                  <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" onChange={handleFile} className="hidden" />
                  <button onClick={() => fileRef.current?.click()} disabled={loading} className="flex items-center gap-1 px-2 py-1 text-[9px] text-muted-foreground hover:text-foreground border-none bg-transparent cursor-pointer disabled:opacity-30 tracking-wide uppercase">
                    <Paperclip size={9} /> Attach
                  </button>
                </div>
                <button
                  onClick={() => send()}
                  disabled={loading || (!input.trim() && !attachments.length)}
                  className="w-7 h-7 bg-foreground flex items-center justify-center border-none cursor-pointer disabled:opacity-25 hover:bg-foreground/80 active:scale-95 transition-all rounded-lg shrink-0"
                >
                  {loading ? <Loader2 size={12} className="text-background animate-spin" /> : <ArrowUp size={12} className="text-background" />}
                </button>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground/30 text-center mt-2 tracking-wide">Expert UK planning · Cost estimates · PD rules · Web search · Enter to send</p>
        </div>
      </div>
    </>
  );
}
