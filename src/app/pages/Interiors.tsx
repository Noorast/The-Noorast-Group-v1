import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';
import { ProcessTimeline } from '../components/ProcessTimeline';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.45 },
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function Interiors() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="Interior Design — Noorast"
        description="Interior design for homes. Single rooms or whole houses. Works well alongside a building project, or on its own once the construction is done."
      />

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl reveal">
          <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Interior design</p>
          <h1 style={{ letterSpacing: '-0.03em' }}>
            Making your home look and feel the way you want it to.
          </h1>
        </div>
      </section>

      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <div className="max-w-2xl reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={s.body}>
              Interior design starts properly — with a conversation about how you actually live and what you want the home to feel like. From there the studio works through layout, materials, colours, furniture, and lighting until you have a clear specification: something detailed enough that whoever is doing the work knows exactly what's needed.
            </p>
            <p style={s.body}>
              We work on single rooms or whole houses. The interior work is at its best when it runs alongside an architectural project — when we get to think about the inside and outside of the house at the same time — but we're equally happy coming in once construction is done.
            </p>
            <p style={s.body}>
              For projects abroad, the studio runs the same service remotely — for clients who want British design standards applied to a home being built somewhere else.
            </p>
            <p style={s.body}>
              Some clients want a single room thought through; others want the whole house resolved from first principles. We scope each one to what it actually needs, and you will know the studio's fee in writing before any work begins.
            </p>
            <p style={s.body}>
              Whatever the scale, we'll give you a fixed quote in writing before any work starts.
            </p>
          </div>
        </div>
      </section>


      <ProcessTimeline stages={[
        { n: '01', title: 'Conversation', duration: '30 min · free', deliverable: 'How you live, what the home should feel like.' },
        { n: '02', title: 'Concept', duration: 'Weeks 1–3', deliverable: 'Mood, layout options, a first materials palette.' },
        { n: '03', title: 'Development', duration: 'Weeks 4–7', deliverable: 'Layouts fixed. Materials, lighting, and furniture resolved.' },
        { n: '04', title: 'Specification', duration: 'Weeks 8–10', deliverable: 'A document your builder or joiner can price from.' },
        { n: '05', title: 'Delivery', duration: 'As needed', deliverable: 'Procurement support and queries answered through the build.' },
      ]} />
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8">
          <p style={s.body}>Want to talk through an interior project?</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/services" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '1px solid rgba(40,30,20,0.1)' }}>About our fees</Link>
            <Link to="/contact" style={s.link}>Get in touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
