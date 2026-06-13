import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';
import { ProcessTimeline } from '../components/ProcessTimeline';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.45 },
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function Landscape() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="Landscape Design — Noorast"
        description="Garden and outdoor space design for homes. Planting, hard landscaping, drainage, and lighting. Standalone or alongside a building project."
      />

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl reveal">
          <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Landscape design</p>
          <h1 style={{ letterSpacing: '-0.03em' }}>
            Your outdoor space, designed properly.
          </h1>
        </div>
      </section>

      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <div className="max-w-2xl reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={s.body}>
              Most extension projects are designed with almost no thought given to the garden. The back door opens and suddenly there's a question about what comes next — what the levels do, where the drainage goes, where the terrace sits, how the new bit connects to the old garden. It's a missed opportunity, and it's avoidable.
            </p>
            <p style={s.body}>
              Far better to think about it from the start. The studio can design the outdoor space as part of the same project, so everything joins up properly. Or we'll come in separately to do a garden that works with whatever's already there.
            </p>
            <p style={s.body}>
              Our work covers planting plans, paving, drainage, raised beds, fencing, external lighting, and anything else your outdoor space needs to function and look the way you want it to.
            </p>
            <p style={s.body}>
              From a small courtyard to the grounds of a new house, we scope each garden to what it needs and agree the studio's fee in writing before we start.
            </p>
            <p style={s.body}>
              You'll have a fixed quote in writing before any work starts.
            </p>
          </div>
        </div>
      </section>


      <ProcessTimeline stages={[
        { n: '01', title: 'Conversation', duration: '30 min · free', deliverable: 'The garden, the levels, what you want from it.' },
        { n: '02', title: 'Survey & concept', duration: 'Weeks 1–3', deliverable: 'Site appraisal, layout options, a planting direction.' },
        { n: '03', title: 'Design', duration: 'Weeks 4–6', deliverable: 'The plan resolved — hard landscaping, planting, lighting, drainage.' },
        { n: '04', title: 'Package', duration: 'Weeks 7–8', deliverable: 'Drawings and a planting schedule your landscaper prices from.' },
        { n: '05', title: 'Planting season', duration: 'Timed to suit', deliverable: 'Guidance through the build and the first season.' },
      ]} />
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8">
          <p style={s.body}>Got a garden you want to do something with?</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/services" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '1px solid rgba(40,30,20,0.1)' }}>About our fees</Link>
            <Link to="/contact" style={s.link}>Get in touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
