import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect, useMemo, useState } from 'react';

const s = {
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

/*
  This is a quiet instrument. It does not quote construction cost — that fluxes
  with the market and would mislead. It gives an indicative range for the
  STUDIO'S DESIGN FEE, scaled by scope. Always a guide, never a quote.
*/
type Scope = {
  id: string; label: string;
  feeLow: number; feeHigh: number;   // indicative studio design fee, GBP
};

const SCOPES: Scope[] = [
  { id: 'advice', label: 'Initial advice & feasibility', feeLow: 600, feeHigh: 1800 },
  { id: 'single', label: 'Single-storey extension', feeLow: 1800, feeHigh: 3800 },
  { id: 'double', label: 'Two-storey extension', feeLow: 3000, feeHigh: 6000 },
  { id: 'loft', label: 'Loft conversion', feeLow: 2200, feeHigh: 4500 },
  { id: 'whole', label: 'Whole-house renovation', feeLow: 5000, feeHigh: 14000 },
  { id: 'newbuild', label: 'New build', feeLow: 6000, feeHigh: 20000 },
];

const STAGES = [
  { id: 'concept', label: 'Concept only', mult: 0.4 },
  { id: 'planning', label: 'Through planning', mult: 0.7 },
  { id: 'full', label: 'Concept to construction drawings', mult: 1.0 },
];

const ADDITIONS = [
  { id: 'interior', label: 'Interior design', low: 2000, high: 8000 },
  { id: 'landscape', label: 'Landscape design', low: 1200, high: 4000 },
];

function gbp(n: number) {
  return '£' + (Math.round(n / 100) * 100).toLocaleString('en-GB');
}

export function FeeCalculator() {
  const [scope, setScope] = useState('single');
  const [stage, setStage] = useState('full');
  const [adds, setAdds] = useState<string[]>([]);
  const [intl, setIntl] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.01, rootMargin: '0px 0px -4% 0px' }
    );
    els.forEach(el => io.observe(el));
    const fallback = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2000);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, []);

  const result = useMemo(() => {
    const sc = SCOPES.find(x => x.id === scope)!;
    const st = STAGES.find(x => x.id === stage)!;
    const intlMult = intl ? 1.25 : 1;
    let low = sc.feeLow * st.mult * intlMult;
    let high = sc.feeHigh * st.mult * intlMult;
    for (const a of ADDITIONS) {
      if (adds.includes(a.id)) { low += a.low; high += a.high; }
    }
    return { low, high };
  }, [scope, stage, adds, intl]);

  const toggleAdd = (id: string) =>
    setAdds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div>
      <SEO
        title="Fee Guide — Noorast"
        description="An indicative guide to the studio's design fees, scaled by project scope. A guide, never a quote."
      />

      {/* HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-0 md:pt-28">
        <div className="max-w-3xl reveal">
          <p className="eyebrow-tick" style={{ fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.55, marginBottom: '1.75rem' }}>
            Fee guide
          </p>
          <h1 style={{ letterSpacing: '-0.03em', marginBottom: '1.75rem' }}>An indication, before we speak.</h1>
          <p style={{ ...s.body, maxWidth: '38rem' }}>
            This gives a sense of the studio's design fee for a given scope. It is a guide, not a quote — we price each project properly once we understand it. It does not estimate the cost of building work, which moves with the market and is a question for your contractor.
          </p>
        </div>
      </section>

      {/* THE INSTRUMENT */}
      <section className="joint max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg" style={{ marginTop: '5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* INPUTS — drawn as a ruled instrument */}
          <div className="lg:col-span-6 reveal">

            <div className="instrument">
              {/* Scope */}
              <div className="instrument-row">
                <p className="instrument-label" style={{ marginBottom: '1rem' }}>The work</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {SCOPES.map(x => (
                    <button key={x.id} onClick={() => setScope(x.id)}
                      style={{
                        padding: '0.5rem 0.875rem', fontSize: '0.8125rem',
                        background: scope === x.id ? 'var(--foreground)' : 'transparent',
                        color: scope === x.id ? 'var(--background)' : 'var(--muted-foreground)',
                        border: '1px solid ' + (scope === x.id ? 'var(--foreground)' : 'rgba(40,30,20,0.16)'),
                        cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                      }}>
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stage — segmented */}
              <div className="instrument-row">
                <p className="instrument-label" style={{ marginBottom: '1rem' }}>How far</p>
                <div className="seg">
                  {STAGES.map(x => (
                    <button key={x.id} className={stage === x.id ? 'on' : ''} onClick={() => setStage(x.id)}>
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additions */}
              <div className="instrument-row">
                <p className="instrument-label" style={{ marginBottom: '1rem' }}>Alongside it</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {ADDITIONS.map(a => {
                    const on = adds.includes(a.id);
                    return (
                      <button key={a.id} onClick={() => toggleAdd(a.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.875rem',
                          padding: '0.75rem 0', background: 'none', border: 'none',
                          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                          color: 'var(--foreground)',
                        }}>
                        <span style={{
                          width: 14, height: 14, flexShrink: 0,
                          border: '1px solid ' + (on ? 'var(--foreground)' : 'rgba(40,30,20,0.3)'),
                          background: on ? 'var(--foreground)' : 'transparent',
                          display: 'inline-block', position: 'relative',
                        }}>
                          {on && <span style={{ position: 'absolute', inset: 3, background: 'var(--background)' }} />}
                        </span>
                        <span style={{ fontSize: '0.9375rem' }}>{a.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* International */}
              <div className="instrument-row" style={{ borderBottom: 'none' }}>
                <button onClick={() => setIntl(v => !v)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: 0, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', color: 'var(--foreground)' }}>
                  <span style={{
                    width: 14, height: 14, flexShrink: 0,
                    border: '1px solid ' + (intl ? 'var(--foreground)' : 'rgba(40,30,20,0.3)'),
                    background: intl ? 'var(--foreground)' : 'transparent',
                    display: 'inline-block', position: 'relative',
                  }}>
                    {intl && <span style={{ position: 'absolute', inset: 3, background: 'var(--background)' }} />}
                  </span>
                  <span style={{ fontSize: '0.9375rem' }}>The project is outside the UK</span>
                </button>
              </div>
            </div>
          </div>

          {/* READOUT — the analogue dial */}
          <div className="lg:col-span-5 lg:col-start-8 reveal" style={{ transitionDelay: '0.1s' }}>
            <div style={{ position: 'sticky', top: '7rem' }}>
              <p className="instrument-label" style={{ marginBottom: '1.5rem' }}>Indicative studio fee</p>
              <p style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', fontWeight: 200, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--foreground)', marginBottom: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>
                {gbp(result.low)}<span style={{ color: 'rgba(40,30,20,0.25)', margin: '0 0.4rem' }}>—</span>{gbp(result.high)}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', opacity: 0.6, lineHeight: 1.7, marginTop: '1.5rem', maxWidth: '24rem' }}>
                The studio's design fee only. Excludes VAT, local-authority fees, and the cost of building work. A guide to help you plan — the real figure follows a conversation.
              </p>

              <div style={{ marginTop: '2.5rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(40,30,20,0.1)' }}>
                <Link to="/contact" style={s.link}>Start a conversation →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
