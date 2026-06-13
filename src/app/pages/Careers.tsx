import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { useEffect } from 'react';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.5 },
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

const roles = [
  {
    title: 'Part 1 Architectural Assistant',
    type: 'Freelance · Remote',
    body: 'A Part 1 assistant to help with drawing packages, planning documents, and concept work on residential projects. You will need a confident hand in CAD, a good eye, and the patience to draw things properly. Hours are flexible and the work is project by project.',
  },
  {
    title: 'In-country delivery partners',
    type: 'Ongoing · International',
    body: 'Architects and project managers based outside the UK who can act as our partner on the ground for international commissions. Local knowledge of contractors, regulations, and the way buildings actually go up is the whole point.',
  },
];

export function Careers() {
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

  return (
    <div>
      <SEO
        title="Careers — Noorast"
        description="Join Noorast. We work with architects, designers, and specialists on a core and project basis. Remote-first, London."
      />

      {/* HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl reveal">
          <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Careers<span className="brand-dot" />Noorast</p>
          <h1 style={{ letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Work with the studio.</h1>
          <p style={{ ...s.body, maxWidth: '40rem' }}>
            Noorast runs as a tight core team supported by a wider network of architects, designers, and specialists engaged per project. We're always glad to hear from people who care about residential work done properly — whether that's a permanent role or project collaboration.
          </p>
        </div>
      </section>

      {/* ROLES */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
          {roles.map((r, i) => (
            <div key={r.title} className="reveal" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(40,30,20,0.07)', padding: '2.5rem 0' }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-4">
                  <h2 style={{ fontSize: '1.375rem', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: '0.5rem' }}>{r.title}</h2>
                  <p style={s.eyebrow}>{r.type}</p>
                </div>
                <div className="lg:col-span-6 lg:col-start-6">
                  <p style={{ ...s.body, fontSize: '0.9375rem' }}>{r.body}</p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <a href={`mailto:design@noorast.co.uk?subject=${encodeURIComponent('Careers — ' + r.title)}`} style={s.link}>Apply →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN APPLICATION */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8 reveal">
          <div style={{ maxWidth: '34rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 300, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>Nothing that fits?</h3>
            <p style={s.body}>We keep a file of people we'd like to work with. Send a portfolio and a line about what you're after — we read everything.</p>
          </div>
          <a href="mailto:design@noorast.co.uk?subject=Careers%20—%20open%20application" style={s.link}>Send a portfolio →</a>
        </div>
      </section>
    </div>
  );
}
