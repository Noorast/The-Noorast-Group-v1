import { useAuth } from '../../lib/auth';
import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { useEffect } from 'react';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.45 },
  body: { fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function Toolkit() {
  const { isAdmin } = useAuth();

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="Property Passport Toolkit — Noorast"
        description="A guide for homeowners getting ready to hire a designer or builder. Covers planning constraints, budgeting, and drawing up a brief. A free digital download from the studio."
      />

      {isAdmin && (
        <div style={{ background: 'var(--foreground)', padding: '0.5rem' }}>
          <p style={{ fontSize: '0.625rem', color: 'var(--background)', textAlign: 'center', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Admin — full access</p>
        </div>
      )}

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-3xl reveal">
          <p style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Property Passport Toolkit</p>
          <h1 style={{ letterSpacing: '-0.03em', marginBottom: '2rem' }}>
            Get ready to hire a designer or builder.
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ ...s.body, fontSize: '1.0625rem' }}>
              We wrote the Property Passport because nine times out of ten the first conversation with a homeowner was identical. The toolkit is that conversation, written down, with worksheets. We give it away — well, almost — because a well-prepared client makes for better work.
            </p>
            <p style={s.body}>
              It walks you through the things most people don't think about until it's too late — the planning history of your property, what's actually allowed without applying, what your title register says, where the drains run, and what realistic budgets look like once you factor in everything beyond the build itself.
            </p>
            <p style={s.body}>
              By the time you've worked through it, you'll know what you can and can't do, you'll have written a proper brief for your designer, and you'll have a list of the right questions to ask at your first meeting. The better your starting point, the better the outcome.
            </p>
            <p style={s.body}>
              It's a digital download — twelve sections, around a hundred and twenty pages — and yours to keep. You can fill it in on screen or print it out. The studio gives it away freely; a well-prepared client makes for better work.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '3rem' }}>
            <a href="mailto:design@noorast.co.uk?subject=Property%20Passport%20request"
              style={{ background: 'var(--foreground)', color: 'var(--background)', textDecoration: 'none', padding: '0.875rem 2rem', fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Request the toolkit →
            </a>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(40,30,20,0.07)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8">
          <p style={s.body}>Looking to commission a project rather than go it alone?</p>
          <Link to="/services" style={s.link}>See our services →</Link>
        </div>
      </section>
    </div>
  );
}
