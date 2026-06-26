import { Link } from 'react-router';
import { useEffect } from 'react';

export function NotFound() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.05 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: '8rem', paddingBottom: '8rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="max-w-2xl reveal">
          <p className="eyebrow-tick" style={{
            fontSize: '0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            color: 'var(--muted-foreground)', opacity: 0.45, marginBottom: '1.75rem',
          }}>
            404<span className="brand-dot" />Page not found
          </p>
          <h1 style={{ fontWeight: 500, letterSpacing: '-0.025em', marginBottom: '1.5rem' }}>
            That page doesn't exist.
          </h1>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.82, color: 'var(--muted-foreground)', marginBottom: '2.5rem', maxWidth: '28rem' }}>
            It may have moved, or the link may be out of date. Here are a few places to start instead.
          </p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{
              textDecoration: 'none', fontSize: '0.625rem', letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--foreground)',
              borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px',
            }}>
              Return home →
            </Link>
            <Link to="/work" style={{
              textDecoration: 'none', fontSize: '0.625rem', letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--muted-foreground)',
              borderBottom: '2px solid var(--bau-black)', paddingBottom: '2px',
            }}>
              See our work →
            </Link>
            <Link to="/contact" style={{
              textDecoration: 'none', fontSize: '0.625rem', letterSpacing: '0.06em',
              textTransform: 'uppercase', color: 'var(--muted-foreground)',
              borderBottom: '2px solid var(--bau-black)', paddingBottom: '2px',
            }}>
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
