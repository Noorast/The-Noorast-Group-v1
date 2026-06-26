import heroImage from '../../assets/d349c2e1b0a0adb43813b52e67d9047ecc52f575.webp';
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

export function Interiors() {
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
        title="Interior Design · Noorast"
        description="Interior design for homes. Single rooms or whole houses. Works well alongside a building project, or on its own once the construction is done."
        path="/interiors"
      />

      {/* HERO */}
      <section className="w-full overflow-hidden" style={{ height: '64vh', minHeight: 360 }}>
        <img src={heroImage} alt="Interior design · Noorast"
          className="w-full h-full object-cover" style={{ objectPosition: 'center 50%' }} />
      </section>

      {/* TITLE */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end reveal">
          <div className="lg:col-span-8">
            <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.75rem' }}>Interior design</p>
            <h1 style={{ letterSpacing: '-0.02em' }}>
              The inside of the house,<br />thought about properly.
            </h1>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p style={{ ...s.body, fontSize: '0.875rem' }}>
              A single room or a whole home, resolved through layout, light, material, and joinery.
            </p>
          </div>
        </div>
      </section>

      {/* STANZA — text + image */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6 reveal order-2 lg:order-1">
              <div className="overflow-hidden" style={{ aspectRatio: '4/5', background: 'var(--bau-paper)' }}>
                <img src={detailImage} alt="" loading="lazy" decoding="async"
                  className="w-full h-full object-cover" />
              </div>
              <p className="masonry-label">Interior · study</p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 reveal order-1 lg:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ ...s.eyebrow, marginBottom: '0.5rem' }}>How we approach it</p>
              <p style={s.body}>
                Interior design starts with a conversation about how you actually live and what you want the home to feel like. From there the studio works through layout, materials, colour, furniture, and light until there is a clear specification, detailed enough that whoever does the work knows exactly what is needed.
              </p>
              <p style={s.body}>
                It is at its best running alongside an architectural project, when the inside and the outside of the house can be thought about at once. It works just as well on its own, once the building work is done.
              </p>
              <p style={s.body}>
                For projects abroad, the studio runs the same service remotely, for clients who want a considered British interior applied to a home being built somewhere else. We scope each project to what it needs, and agree the studio's fee in writing before any work begins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessTimeline stages={[
        { n: '01', title: 'Conversation', duration: '30 min · free', deliverable: 'How you live, and what the home should feel like.' },
        { n: '02', title: 'Concept', duration: 'Weeks 1 to 3', deliverable: 'Mood, layout options, a first materials palette.' },
        { n: '03', title: 'Development', duration: 'Weeks 4 to 7', deliverable: 'Layouts fixed; materials, lighting, and furniture resolved.' },
        { n: '04', title: 'Specification', duration: 'Weeks 8 to 10', deliverable: 'A clear document for your builder or joiner.' },
        { n: '05', title: 'Delivery', duration: 'As needed', deliverable: 'Procurement support and queries answered through the build.' },
      ]} />

      {/* CTA */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={s.body}>Want to talk through an interior project?</p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/services" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '2px solid var(--bau-black)' }}>About our fees</Link>
            <Link to="/contact" style={s.link}>Get in touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
