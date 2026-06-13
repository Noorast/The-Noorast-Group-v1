import studioImage from '../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.png';
import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { useEffect } from 'react';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.5 },
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function Practice() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.01, rootMargin: '0px 0px -4% 0px' }
    );
    els.forEach(el => io.observe(el));
    const fallback = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2500);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, []);

  return (
    <div>
      <SEO
        title="Studio — Noorast"
        description="Noorast is a London-based residential design studio working across architecture, interiors, and landscape. Founded 2025."
      />

      {/* ── HEADER ───────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl reveal">
          <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>
            The studio<span className="brand-dot" />Est. 2025
          </p>
          <h1 style={{ letterSpacing: '-0.03em' }}>A studio working in three disciplines.</h1>
        </div>
      </section>

      {/* ── STICKY SCROLL — image anchors, text moves ────── */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* LEFT — scrolling text */}
            <div className="lg:col-span-6" style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>

              {/* The studio */}
              <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p style={s.eyebrow}>The studio</p>
                <p style={s.body}>
                  Noorast is a London-based residential design studio working across architectural design, interior design, and landscape design. The work is almost entirely residential, split between the UK and projects internationally.
                </p>
                <p style={s.body}>
                  The studio runs as a tight core team supported by a wider network of architects, designers, and specialists who join the project where their skills are needed. That structure means the right people work on the right things — not the same handful of people on everything.
                </p>
                <p style={s.body}>
                  We take on a few projects at a time, on purpose. It gives us room to think, to draw properly, to actually pick up the phone.
                </p>
              </div>

              {/* Point of view */}
              <div className="reveal">
                <p style={{ ...s.eyebrow, marginBottom: '2rem' }}>What we believe</p>
                <p style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.5, color: 'var(--foreground)' }}>
                  <em>Most residential design happens to the people who live with it. The studio tries to make it happen with them.</em>
                </p>
                <p style={{ ...s.body, marginTop: '1.75rem' }}>
                  We're interested in houses that age well — buildings that look better in twenty years than they did on the day of completion. That rules out a lot. It rules out signature gestures, fashionable materials, and details that won't survive their first decade. The brief always comes first. The style is whatever the brief requires.
                </p>
              </div>

              {/* How we work */}
              <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p style={s.eyebrow}>How we work</p>
                <p style={s.body}>
                  Most of the work happens remotely. Client meetings are over video call. We visit sites when it's genuinely useful, not as a matter of course. This means we can take on projects anywhere in the UK and abroad without being tied to one location.
                </p>
                <p style={s.body}>
                  The way we work is the same wherever the project is: a clear brief, a fixed scope, regular conversations, no surprises. For international projects, a trusted partner on the ground handles delivery — one point of contact here, one there.
                </p>
              </div>

              {/* Founding director — short, as established */}
              <div className="reveal">
                <p style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Founding director</p>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.75, color: 'var(--foreground)', marginBottom: '0.75rem' }}>Aun Naeem</p>
                <p style={{ ...s.body, fontSize: '0.9375rem' }}>
                  The studio was founded in 2025. Aun leads the architectural side of the work.
                </p>
              </div>
            </div>

            {/* RIGHT — sticky image */}
            <div className="lg:col-span-5 lg:col-start-8 sticky-col reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="overflow-hidden">
                <img src={studioImage} alt="Noorast studio work"
                  loading="lazy" decoding="async"
                  className="w-full block"
                  style={{ aspectRatio: '4/5', objectFit: 'cover' }} />
              </div>
              <p className="masonry-label">The studio<span className="brand-dot" />London</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER NETWORK ──────────────────────────────── */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end reveal">
            <div className="lg:col-span-7">
              <p style={{ ...s.eyebrow, marginBottom: '1.25rem' }}>The network</p>
              <p style={{ ...s.body, maxWidth: '36rem' }}>
                The studio works with a wider network of architects, designers, and specialists engaged per project. If you're a contractor, photographer, or specialist consultant who'd like to be considered for project work, we'd like to hear from you.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
              <a href="mailto:design@noorast.co.uk?subject=Network%20—%20working%20with%20Noorast" style={s.link}>
                Introduce yourself →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSE ────────────────────────────────────────── */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={s.body}>Want to work with the studio?</p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/services" style={s.link}>What we do →</Link>
            <Link to="/contact" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '1px solid rgba(40,30,20,0.1)' }}>Get in touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
