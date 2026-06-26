import { useState, useEffect, useRef } from 'react';
import { Loader2, AlertTriangle, TrendingUp, ArrowRight, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface Analysis {
  headline: string;
  summary: string;
  risks: string[];
  opportunities: string[];
  planning_route: string;
  next_action: string;
  completion_note: string;
}

interface Props {
  passportData: any;
  completionPercent: number;
}

export function PassportInsights({ passportData, completionPercent }: Props) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [lastDataHash, setLastDataHash] = useState('');
  const hasRunRef = useRef(false);

  // Simple hash of key passport fields to detect meaningful changes
  const getDataHash = (data: any) => {
    const key = [
      data?.property?.address,
      data?.property?.property_type,
      data?.planning_policy?.conservation_area,
      data?.planning_policy?.article_4,
      data?.planning_policy?.listed_building,
      data?.brief?.project_type,
      data?.brief?.budget,
      data?.environmental?.flood_zone,
    ].filter(Boolean).join('|');
    return key;
  };

  const runAnalysis = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/analyse-passport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passportData }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAnalysis(data);
      setLastDataHash(getDataHash(passportData));
      setExpanded(true);
    } catch (err: any) {
      setError('Analysis unavailable — check back when more sections are complete.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-run when completion hits 40% and key data is present
  useEffect(() => {
    if (completionPercent < 40) return;
    if (hasRunRef.current) return;
    const hash = getDataHash(passportData);
    if (!hash) return;
    hasRunRef.current = true;
    runAnalysis();
  }, [completionPercent]);

  // Re-run when meaningful data changes (after initial run)
  useEffect(() => {
    if (!analysis) return;
    const hash = getDataHash(passportData);
    if (hash === lastDataHash || !hash) return;
    // Debounce — don't re-run on every keystroke
    const timer = setTimeout(() => {
      if (getDataHash(passportData) !== lastDataHash) {
        runAnalysis();
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [passportData]);

  // Don't show at all until 40% complete
  if (completionPercent < 40 && !analysis && !loading) {
    return (
      <div className="border border-border/40 p-5 mb-8 bg-muted/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/50 font-medium">
            Property Intelligence
          </span>
        </div>
        <p className="text-xs text-muted-foreground/50">
          Complete at least 40% of your Passport to unlock an AI analysis of your property's development potential.
        </p>
        <div className="mt-3 h-px bg-border">
          <div
            className="h-px bg-foreground/20 transition-all duration-700"
            style={{ width: `${(completionPercent / 40) * 100}%` }}
          />
        </div>
        <p className="text-[9px] text-muted-foreground/30 mt-1">{completionPercent}% complete — {40 - completionPercent}% more to unlock</p>
      </div>
    );
  }

  return (
    <div className="border border-border/60 mb-8">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer select-none border-b border-border/40"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium">
            Property Intelligence
          </span>
          {analysis && (
            <span className="text-[8px] tracking-[0.08em] uppercase text-muted-foreground/40 border border-border/40 px-1.5 py-0.5">
              AI Analysis
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {analysis && !loading && (
            <button
              onClick={(e) => { e.stopPropagation(); runAnalysis(); }}
              className="flex items-center gap-1 text-[9px] text-muted-foreground/50 hover:text-foreground transition-colors bg-transparent border-none cursor-pointer p-1"
              title="Refresh analysis"
            >
              <RefreshCw size={9} />
            </button>
          )}
          {expanded ? <ChevronUp size={12} className="text-muted-foreground/40" /> : <ChevronDown size={12} className="text-muted-foreground/40" />}
        </div>
      </div>

      {expanded && (
        <div className="px-5 py-5">
          {loading && (
            <div className="flex items-center gap-2.5 py-4">
              <Loader2 size={12} className="animate-spin text-muted-foreground/50" />
              <span className="text-xs text-muted-foreground">Analysing your passport data...</span>
            </div>
          )}

          {error && !loading && (
            <p className="text-xs text-muted-foreground/60">{error}</p>
          )}

          {analysis && !loading && (
            <div className="space-y-5">
              {/* Headline */}
              <div>
                <p className="text-sm font-light text-foreground leading-relaxed">
                  {analysis.headline}
                </p>
              </div>

              {/* Summary */}
              <div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {analysis.summary}
                </p>
              </div>

              {/* Planning route */}
              <div className="px-3 py-2.5 bg-muted/20 border-l-2 border-foreground/30">
                <span className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground/50 font-medium block mb-1">
                  Likely planning route
                </span>
                <p className="text-xs text-foreground font-medium">{analysis.planning_route}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Risks */}
                {analysis.risks?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <AlertTriangle size={9} className="text-amber-600/70" />
                      <span className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground/60 font-medium">
                        Risks to address
                      </span>
                    </div>
                    <div className="space-y-2">
                      {analysis.risks.map((risk, i) => (
                        <div key={i} className="flex gap-2.5 text-[10.5px] text-muted-foreground leading-relaxed">
                          <span className="text-amber-600/60 flex-shrink-0 mt-0.5">—</span>
                          <span>{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opportunities */}
                {analysis.opportunities?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <TrendingUp size={9} className="text-green-700/60" />
                      <span className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground/60 font-medium">
                        Opportunities
                      </span>
                    </div>
                    <div className="space-y-2">
                      {analysis.opportunities.map((opp, i) => (
                        <div key={i} className="flex gap-2.5 text-[10.5px] text-muted-foreground leading-relaxed">
                          <span className="text-green-700/60 flex-shrink-0 mt-0.5">—</span>
                          <span>{opp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Next action */}
              <div className="border-t border-border/40 pt-4 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[9px] tracking-[0.12em] uppercase text-muted-foreground/50 font-medium block mb-1">
                    Recommended next action
                  </span>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {analysis.next_action}
                  </p>
                </div>
                <ArrowRight size={12} className="text-muted-foreground/30 flex-shrink-0 mt-1" />
              </div>

              {/* Completion note */}
              {analysis.completion_note && (
                <p className="text-[9.5px] text-muted-foreground/40 leading-relaxed border-t border-border/30 pt-3">
                  {analysis.completion_note}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
