import { Link } from 'react-router';
import { SEO } from './SEO';
import { useEffect } from 'react';

const EYE: React.CSSProperties = {
  fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--bau-black)', fontWeight: 700,
};
const BODY: React.CSSProperties = {
  fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--muted-foreground)',
};
const LINK: React.CSSProperties = {
  textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em',
  textTransform: 'uppercase', color: 'var(--foreground)',
  borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px',
};

export type ServiceData = {
  path: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  heroImg: string;
  heroAlt: string;
  /* "What this covers" honest scope list */
  covers: { t: string; d: string }[];
  /* The buyer's real questions, answered plainly */
  questions: { q: string; a: string }[];
  /* What you get, stage by stage */
  stages: { n: string; t: string; d: string }[];
  /* Honest planning note, no guarantees */
  planningNote: string;
};

export function ServiceDetail({ data }: { data: ServiceData }) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.04, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach(el => io.observe(el));
    const fb = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2000);
    return () => { io.disconnect(); window.clearTimeout(fb); };
  }, [data.path]);

  return (
    <div>
      <SEO title={data.seoTitle} description={data.seoDescription} path={data.path} />

      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '2rem' }}>{data.eyebrow}</p>
            <h1 style={{ fontWeight: 500 }}>{data.title}</h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ transitionDelay: '0.1s' }}>
            <p style={{ ...BODY, maxWidth: '26rem' }}>{data.lede}</p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="reveal">
        <div style={{ aspectRatio: '21/9', overflow: 'hidden', background: 'var(--bau-paper)' }}>
          <img src={data.heroImg} alt={data.heroAlt} loading="eager" decoding="async"
            className="w-full h-full object-cover" style={{ objectPosition: 'center 45%' }} />
        </div>
      </section>

      {/* WHAT THIS COVERS */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end" style={{ marginBottom: '3.5rem' }}>
            <div className="lg:col-span-6 reveal">
              <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '1.75rem' }}>What this covers</p>
              <h2 style={{ fontWeight: 500 }}>The scope, plainly.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {data.covers.map((c, i) => (
              <div key={c.t} className="reveal" style={{ borderTop: '2px solid var(--bau-black)', padding: '2rem 0', transitionDelay: `${(i % 2) * 0.06}s` }}>
                <h3 style={{ fontWeight: 400, fontSize: '1.0625rem', marginBottom: '0.75rem' }}>{c.t}</h3>
                <p style={BODY}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE QUESTIONS PEOPLE ACTUALLY ASK */}
      <section className="joint" style={{ background: 'var(--bau-paper)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="reveal" style={{ marginBottom: '3.5rem', maxWidth: '32rem' }}>
            <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '1.75rem' }}>The honest answers</p>
            <h2 style={{ fontWeight: 500 }}>What people actually ask.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-0">
            <div className="lg:col-span-10 lg:col-start-2">
              {data.questions.map((qa, i) => (
                <div key={i} className="reveal" style={{ borderTop: '2px solid var(--bau-black)', padding: '2.25rem 0' }}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                    <h3 className="lg:col-span-5" style={{ fontWeight: 400, fontSize: '1.0625rem', lineHeight: 1.4 }}>{qa.q}</h3>
                    <p className="lg:col-span-6 lg:col-start-7" style={BODY}>{qa.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET, STAGE BY STAGE */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="reveal" style={{ marginBottom: '3.25rem', maxWidth: '32rem' }}>
            <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '1.25rem' }}>How it runs</p>
            <p style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.3125rem)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--foreground)' }}>
              A clear sequence, agreed at the outset, so you always know what happens next and what you will have in hand at each stage.
            </p>
          </div>
          <div className="timeline reveal">
            {data.stages.map(st => (
              <div key={st.n} className="timeline-stage">
                <span className="timeline-n index-mark">{st.n}</span>
                <span className="timeline-t">{st.t}</span>
                <span className="timeline-r">{st.d}</span>
              </div>
            ))}
          </div>
          <p className="reveal" style={{ ...BODY, fontSize: '0.8125rem', opacity: 0.8, marginTop: '2.5rem', maxWidth: '40rem' }}>
            {data.planningNote}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end reveal">
            <div className="lg:col-span-7">
              <h2 style={{ fontWeight: 500, fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)' }}>Tell us about your project.</h2>
              <p style={{ ...BODY, marginTop: '1rem', maxWidth: '32rem' }}>
                The first conversation is free. We will give you an honest view on whether we are the right people to help, and a fixed fee in writing if you want to go ahead.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:text-right" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <Link to="/contact" style={LINK}>Start a conversation →</Link>
              <Link to="/fee-guide" style={{ ...LINK, color: 'var(--muted-foreground)', borderBottomColor: 'var(--bau-red)' }}>Fee guide →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
