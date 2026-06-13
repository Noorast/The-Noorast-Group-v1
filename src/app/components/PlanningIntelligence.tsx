import React, { useState, useRef, useEffect } from "react";
import { Search, AlertTriangle, CheckCircle, Sparkles, ChevronDown, ChevronUp, ArrowUp, Paperclip, X, Globe, FileText, Loader2 } from "lucide-react";

const DATASET_LABELS: Record<string, { label: string; risk: "high" | "medium" | "low" }> = {
  "conservation-area": { label: "Conservation Area", risk: "high" },
  "article-4-direction-area": { label: "Article 4 Direction", risk: "high" },
  "flood-risk-zone": { label: "Flood Risk Zone", risk: "high" },
  "listed-building": { label: "Listed Building", risk: "high" },
  "tree-preservation-zone": { label: "Tree Preservation Order", risk: "medium" },
  "national-park": { label: "National Park", risk: "high" },
  "area-of-outstanding-natural-beauty": { label: "AONB", risk: "medium" },
  "green-belt": { label: "Green Belt", risk: "high" },
  "scheduled-monument": { label: "Scheduled Monument", risk: "high" },
};

const SYSTEM_PROMPT = `You are Noorast's planning intelligence engine. You provide precise, actionable analysis on UK planning constraints, permitted development rights, approval patterns, and refusal reasons — drawing from government planning data and local authority decision records. You do not describe yourself as AI. Always recommend the user obtains formal professional advice from a registered architect, planning consultant, or solicitor before making decisions on a specific project.

YOUR EXPERTISE: TCPA 1990, GPDO 2015 (all Schedule 2 Classes), NPPF 2023, NPPG, Building Regulations (Approved Documents A–R), Party Wall Act 1996, Land Registration Act 2002, restrictive covenants, easements, rights of light, flood risk, protected species, BNG, TPOs, CIL, JCT contracts, construction costs.

HOW TO ANSWER — FOLLOW THESE FORMATTING RULES EXACTLY:

**Structure every response clearly:**
— Start with a direct, one-sentence answer to the question
— Then explain the detail with proper structure
— End with the most important practical next step

**Use these formatting elements:**
— ### for main section headers (use sparingly, only when the answer has distinct topics)
— **bold** for legislation references, thresholds, key terms, and critical facts
— Numbered lists (1. 2. 3.) for sequential steps or procedures
— Dashes (—) for non-sequential lists
— Short paragraphs — maximum 3 sentences each
— Leave a blank line between paragraphs and sections

**Tone and precision:**
— Give exact numbers: "**4 metres**" not "there is a size limit"
— Cite specific legislation: "**Class A, Part 1, Schedule 2 of the GPDO 2015**"
— Rate risk explicitly: "✅ Permitted development — no application needed" or "⚠️ Planning permission required" or "🔴 High risk of refusal because..."
— Ask one clarifying question if you genuinely need more info — don't guess
— British English. Expert but human. No waffle.

RESPONSE LENGTH: Match complexity to the question. Simple questions get short sharp answers. Complex planning matters get full structured analysis.`;

const SUGGESTIONS = [
  { icon: "🏗️", label: "PD rights check", prompt: "Can I build a single-storey rear extension under permitted development? My house is semi-detached, not in a conservation area." },
  { icon: "🏛️", label: "Conservation area", prompt: "What works require planning permission in a conservation area? I want to replace windows and build a rear extension." },
  { icon: "📋", label: "Prior approval", prompt: "How does Prior Approval Class A work for larger home extensions? What's the process and what can be refused?" },
  { icon: "⚠️", label: "Article 4", prompt: "An Article 4 Direction applies to my property. How do I find out exactly what it removes and what I can still do?" },
  { icon: "📄", label: "Planning refusal", prompt: "My planning application was refused. What are my options? How do I decide whether to appeal or reapply?" },
  { icon: "🏠", label: "Loft conversion", prompt: "What are the permitted development rules for a loft conversion with a dormer? My house is a Victorian terrace." },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  isSearch?: boolean;
  file?: { name: string; type: string; data: string };
  isSearching?: boolean;
}

interface PlanningData {
  address: string;
  constraints: Record<string, Array<{ name: string; reference: string; grade?: string }>>;
  planningApplications: Array<{ reference: string; description: string; decision: string; date: string }>;
}

export function PlanningIntelligence() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [pendingFile, setPendingFile] = useState<{ name: string; type: string; data: string } | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchData, setSearchData] = useState<PlanningData | null>(null);
  const [showApps, setShowApps] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiLoading]);

  const callAI = async (msgs: Message[], useWebSearch = false): Promise<string> => {
    // Build API messages — handle files
    const apiMessages = msgs
      .filter(m => !m.isSearching)
      .map(m => {
        if (m.file) {
          return {
            role: m.role,
            content: [
              { type: "document", source: { type: "base64", media_type: m.file.type, data: m.file.data } },
              { type: "text", text: m.content || "Please analyse this document and extract all relevant planning, legal, and site information." }
            ]
          };
        }
        return { role: m.role, content: m.content };
      });

    const res = await fetch("/.netlify/functions/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: apiMessages,
        useWebSearch,
      }),
    });

    const data = await res.json();
    return data.extractedText || data.content?.map((b: any) => b.type === "text" ? b.text : "").filter(Boolean).join("\n") || "Something went wrong. Please try again.";
  };

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText || input.trim();
    if (!text && !pendingFile) return;

    setHasStarted(true);
    setInput("");

    const userMsg: Message = {
      role: "user",
      content: text,
      file: pendingFile || undefined,
    };
    setPendingFile(null);

    // Check if message mentions an address for auto-search
    const addressPattern = /\b([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}|\d+\s+[\w\s]+,\s*[\w\s]+)/i;
    const hasAddress = addressPattern.test(text);

    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setAiLoading(true);

    // Use web search for questions about specific places, recent policies, local authorities
    const needsWebSearch = /local authority|local plan|council|policies|appeal|\d{4}|recent|current|latest|planning portal|search/i.test(text);

    try {
      // If address detected, also fetch planning data
      if (hasAddress && !searchData) {
        setSearchLoading(true);
        try {
          const res = await fetch("/.netlify/functions/planning-search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ address: text }),
          });
          if (res.ok) {
            const data = await res.json();
            setSearchData(data);
          }
        } catch { /* silent */ }
        setSearchLoading(false);
      }

      const reply = await callAI(newMsgs, needsWebSearch);
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }

    setAiLoading(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingFile({
        data: (reader.result as string).split(",")[1],
        type: file.type,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: "calc(100vh - 120px)" }}>

      {/* EMPTY STATE */}
      {!hasStarted && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
          <div className="mb-6 w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center shadow-md">
            <Sparkles size={22} className="text-background" />
          </div>
          <h1 className="text-3xl font-light text-foreground mb-3 tracking-tight text-center">
            Planning Intelligence
          </h1>
          <p className="text-sm text-muted-foreground font-light text-center max-w-lg leading-relaxed mb-2">
            Expert-level UK planning, architecture, and property law advice. Ask anything — from permitted development thresholds to heritage impact assessments.
          </p>
          <div className="flex items-center gap-3 mb-8">
            <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-muted-foreground/60">
              <Globe size={10} /> Live web search
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-muted-foreground/60">
              <FileText size={10} /> Document analysis
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-muted-foreground/60">
              <Search size={10} /> Planning data
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-2xl mb-8">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.prompt}
                onClick={() => { setInput(s.prompt); setTimeout(() => sendMessage(s.prompt), 50); }}
                className="text-left px-4 py-3.5 border border-border/60 bg-background hover:bg-muted/10 hover:border-foreground/30 transition-all duration-150 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-base mt-0.5">{s.icon}</span>
                  <div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-1 font-medium group-hover:text-foreground transition-colors">{s.label}</div>
                    <div className="text-xs text-muted-foreground font-light leading-relaxed">{s.prompt.substring(0, 72)}...</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CHAT */}
      {hasStarted && (
        <div className="flex-1 overflow-y-auto py-8">
          <div className="max-w-2xl mx-auto px-6 space-y-8">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Sparkles size={14} className="text-background" />
                  </div>
                )}
                <div className="max-w-[82%]">
                  {m.role === "user" ? (
                    <div>
                      {m.file && (
                        <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-muted/30 border border-border/40 text-xs text-muted-foreground" style={{ borderRadius: "12px" }}>
                          <FileText size={11} />
                          {m.file.name}
                        </div>
                      )}
                      <div className="px-4 py-3 bg-foreground text-background text-sm font-light leading-relaxed" style={{ borderRadius: "18px 18px 4px 18px" }}>
                        {m.content}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/50 ml-0.5">Noorast AI</div>
                      <div
                        className="text-sm text-foreground font-light leading-[1.85]"
                        dangerouslySetInnerHTML={{
                          __html: m.content
                            // H3 headers
                            .replace(/^### (.+)$/gm, '<div style="font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:var(--foreground);margin:20px 0 8px;padding-bottom:6px;border-bottom:1px solid var(--border)">$1</div>')
                            // H2 headers
                            .replace(/^## (.+)$/gm, '<div style="font-size:15px;font-weight:400;color:var(--foreground);margin:24px 0 10px">$1</div>')
                            // Bold
                            .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:500;color:var(--foreground)">$1</strong>')
                            // Status indicators
                            .replace(/✅ (.+)/g, '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(74,124,89,0.08);border-left:2px solid #4A7C59"><span style="font-size:14px;flex-shrink:0;margin-top:1px">✅</span><span style="color:var(--foreground)">$1</span></div>')
                            .replace(/⚠️ (.+)/g, '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(160,128,80,0.08);border-left:2px solid #A08050"><span style="font-size:14px;flex-shrink:0;margin-top:1px">⚠️</span><span style="color:var(--foreground)">$1</span></div>')
                            .replace(/🔴 (.+)/g, '<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0;padding:10px 14px;background:rgba(180,50,50,0.06);border-left:2px solid #b43232"><span style="font-size:14px;flex-shrink:0;margin-top:1px">🔴</span><span style="color:var(--foreground)">$1</span></div>')
                            // Numbered lists
                            .replace(/^\d+\. (.+)$/gm, '<div style="display:flex;gap:12px;margin:4px 0;padding-left:4px"><span style="color:var(--muted-foreground);flex-shrink:0;min-width:20px;font-variant-numeric:tabular-nums;font-size:11px;padding-top:2px">$&</span></div>')
                            .replace(/^(\d+)\. (.+)$/gm, '<div style="display:flex;gap:10px;margin:5px 0"><span style="color:var(--muted-foreground);flex-shrink:0;font-size:11px;letter-spacing:0.05em;padding-top:1px;min-width:18px">$1.</span><span>$2</span></div>')
                            // Dash lists
                            .replace(/^— (.+)$/gm, '<div style="display:flex;gap:10px;margin:4px 0"><span style="color:var(--muted-foreground);flex-shrink:0">—</span><span>$1</span></div>')
                            .replace(/^- (.+)$/gm, '<div style="display:flex;gap:10px;margin:4px 0"><span style="color:var(--muted-foreground);flex-shrink:0">—</span><span>$1</span></div>')
                            // Blank lines to spacing
                            .replace(/\n\n/g, '<div style="height:10px"></div>')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Planning data constraints if address was searched */}
            {searchData && (
              <div className="ml-12 space-y-3">
                <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground/40">Site constraints found</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(searchData.constraints).length === 0 ? (
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[10px] tracking-[0.08em] uppercase font-medium bg-green-50 text-green-700 border border-green-200 rounded-full">
                      <CheckCircle size={9} /> No major constraints found
                    </span>
                  ) : Object.entries(searchData.constraints).map(([ds]) => {
                    const meta = DATASET_LABELS[ds] || { label: ds, risk: "medium" as const };
                    return (
                      <span key={ds} className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] tracking-[0.08em] uppercase font-medium border rounded-full ${
                        meta.risk === "high" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        <AlertTriangle size={9} />{meta.label}
                      </span>
                    );
                  })}
                </div>
                {searchData.planningApplications.length > 0 && (
                  <div className="border border-border/40 rounded-xl overflow-hidden">
                    <button onClick={() => setShowApps(o => !o)} className="flex items-center justify-between w-full px-4 py-3 bg-transparent border-none cursor-pointer hover:bg-muted/10 transition-colors text-left">
                      <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground">{searchData.planningApplications.length} planning applications nearby</span>
                      {showApps ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                    </button>
                    {showApps && (
                      <div className="divide-y divide-border/30">
                        {searchData.planningApplications.map((app, i) => (
                          <div key={i} className="px-4 py-3">
                            <div className="flex justify-between mb-1">
                              <span className="text-[10px] font-mono text-muted-foreground">{app.reference}</span>
                              <span className="text-[10px] text-muted-foreground">{app.date}</span>
                            </div>
                            <div className="text-xs font-light text-foreground leading-relaxed">{app.description}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Typing */}
            {(aiLoading || searchLoading) && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles size={14} className="text-background" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  {searchLoading && (
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
                      <Search size={10} className="animate-pulse" /> Searching planning data...
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}

      {/* INPUT */}
      <div className="shrink-0 px-6 pb-6 pt-2">
        <div className="max-w-2xl mx-auto">
          {pendingFile && (
            <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-muted/20 border border-border/40 text-xs text-muted-foreground">
              <FileText size={11} />
              <span className="flex-1 truncate">{pendingFile.name}</span>
              <button onClick={() => setPendingFile(null)} className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground flex items-center">
                <X size={11} />
              </button>
            </div>
          )}
          <div className="relative border border-border/60 bg-background focus-within:border-foreground/20 transition-all duration-200 shadow-sm rounded-2xl overflow-hidden">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hasStarted ? "Ask anything about UK planning, architecture, or property law..." : "Ask anything or enter an address to analyse..."}
              rows={1}
              className="w-full px-5 py-4 pr-24 text-sm bg-transparent text-foreground outline-none resize-none leading-relaxed placeholder:text-muted-foreground/40 font-light"
              style={{ minHeight: 56, maxHeight: 160 }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 160) + "px";
              }}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
              <input ref={fileRef} type="file" accept=".pdf,image/*,.doc,.docx" onChange={handleFile} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-8 h-8 flex items-center justify-center border border-border/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all bg-transparent cursor-pointer rounded-lg"
                title="Upload document"
              >
                <Paperclip size={13} />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={aiLoading || (!input.trim() && !pendingFile)}
                className="w-8 h-8 bg-foreground flex items-center justify-center border-none cursor-pointer disabled:opacity-25 hover:bg-foreground/80 active:scale-95 transition-all duration-150 rounded-lg"
              >
                <ArrowUp size={14} className="text-background" />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground/35 mt-2.5 tracking-wide">
            Expert UK planning advice · Upload documents · Live web search · Powered by Claude
          </p>
        </div>
      </div>
    </div>
  );
}
