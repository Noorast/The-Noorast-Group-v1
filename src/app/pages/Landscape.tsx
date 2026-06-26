import heroImage from '../../assets/fd485c30db969be36e00beb80f2ac31e3eea017e.webp';
import detailImage from '../../assets/e947385c703c8e3c623a4d1f62c7deeba551bd6e.webp';
import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';
import { ProcessTimeline } from '../components/ProcessTimeline';

const s = {
  eyebrow: { fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--bau-black)', fontWeight: 700 },
  body: { fontSize: '0.9375rem', lineHeight: 1.82, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px' },
};

export function Landscape() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.01, rootMargin: '0px 0px -4% 0px' });
    els.forEach(el => io.observe(el));
    const fb = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2000);
    return () => { io.disconnect(); window.clearTimeout(fb); };
  }, []);

  return (
    <div>
      <SEO
        title="Landscape Design · Noorast"
        description="Garden and landscape design as part of the same idea as the house. Planting, paving, levels, drainage, and lighting, considered together."
        path="/landscape"
      />

      {/* HERO */}
      <section className="w-full overflow-hidden" style={{ height: '64vh', minHeight: 360 }}>
        <img src={heroImage} alt="Landscape design · Noorast"
          className="w-full h-full object-cover" style={{ objectPosition: 'center 50%' }} />
      </section>

      {/* TITLE */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end reveal">
          <div className="lg:col-span-8">
            <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.75rem' }}>Landscape design</p>
            <h1 style={{ letterSpacing: '-0.02em' }}>
              The garden, as part<br />of the same idea.
            </h1>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p style={{ ...s.body, fontSize: '0.875rem' }}>
              Levels, planting, paving, and the line between house and ground, drawn together, not bolted on.
            </p>
          </div>
        </div>
      </section>

      {/* STANZA — text + image */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ ...s.eyebrow, marginBottom: '0.5rem' }}>Why it matters</p>
              <p style={s.body}>
                Most extensions are designed with almost no thought given to the garden. The back door opens, and suddenly there is a question about what comes next, what the levels do, where the drainage goes, where the terrace sits, how the new work meets the old garden. It is a missed opportunity, and an avoidable one.
              </p>
              <p style={s.body}>
                Far better to think about it from the start. The studio can design the outdoor space as part of the same project, so everything joins up, or come in separately to make a garden that works with whatever is already there.
              </p>
              <p style={s.body}>
                The work covers planting, paving, levels, drainage, raised beds, lighting, and the boundary, everything the outside of a house needs to function and to feel right. From a small courtyard to the grounds of a new house, we agree the studio's fee in writing before we start.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="overflow-hidden" style={{ aspectRatio: '4/5', background: 'var(--bau-paper)' }}>
                <img src={detailImage} alt="" loading="lazy" decoding="async"
                  className="w-full h-full object-cover" />
              </div>
              <p className="masonry-label">Garden · study</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessTimeline stages={[
        { n: '01', title: 'Conversation', duration: '30 min · free', deliverable: 'The garden, the levels, and what you want from it.' },
        { n: '02', title: 'Survey & concept', duration: 'Weeks 1 to 3', deliverable: 'Site appraisal, layout options, a planting direction.' },
        { n: '03', title: 'Design', duration: 'Weeks 4 to 6', deliverable: 'The plan resolved, hard landscaping, planting, lighting, drainage.' },
        { n: '04', title: 'Package', duration: 'Weeks 7 to 8', deliverable: 'Drawings and a planting schedule for your landscaper.' },
        { n: '05', title: 'Planting season', duration: 'Timed to suit', deliverable: 'Guidance through the build and the first season.' },
      ]} />

      {/* CTA */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={s.body}>Got a garden you want to do something with?</p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/services" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '2px solid var(--bau-black)' }}>About our fees</Link>
            <Link to="/contact" style={s.link}>Get in touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
