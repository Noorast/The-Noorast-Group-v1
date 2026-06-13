import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import projectImage from '../../assets/e947385c703c8e3c623a4d1f62c7deeba551bd6e.png';
import rearImage from '../../assets/d349c2e1b0a0adb43813b52e67d9047ecc52f575.png';
import veniceImage from '../../assets/fd485c30db969be36e00beb80f2ac31e3eea017e.png';
import modernImage from '../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.png';
import heroImage from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.png';
import studioImage from '../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.png';
import { useEffect } from 'react';

const label: React.CSSProperties = {
  fontSize: '0.625rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'var(--muted-foreground)', opacity: 0.6,
  
  marginTop: '0.875rem',
  display: 'block',
  lineHeight: 1.5,
};

function Card({ img, name, href, aspect, objectPosition }: {
  img: string; name: string; href: string;
  aspect: string; objectPosition?: string;
}) {
  return (
    <Link to={href} className="group block" style={{ textDecoration: 'none' }}>
      <div className="overflow-hidden">
        <img src={img} alt={name}
          loading="lazy" decoding="async"
          className="w-full block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ aspectRatio: aspect, objectFit: 'cover', objectPosition: objectPosition || 'center' }} />
      </div>
      <span className="masonry-label">{name}</span>
    </Link>
  );
}

/*
  4-column grid on a 12-col system:
  Col A = span 3 (cols 1–3)
  Col B = span 3 (cols 4–6)
  Col C = span 3 (cols 7–9)
  Col D = span 3 (cols 10–12)

  Images always sit within these 4 vertical columns.
  Only the aspect ratio (height) varies.
  Vertical stagger via padding-top on individual cells.
*/

export function Projects() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.05 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="Projects — Noorast"
        description="Selected work by Noorast — residential extensions, loft conversions, new builds, interiors, and international commissions."
      />

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-10 md:pt-28 md:pb-12">
        <div className="max-w-3xl reveal">
          <p style={{ fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.5, marginBottom: '1.5rem' }}>
            Selected work<span className="brand-dot" />Studio 2025–26
          </p>
          <h1 style={{ letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Concept studies & current work</h1>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--muted-foreground)', maxWidth: '40rem' }}>
            A young studio, founded in 2025. The work below is a mix of concept studies and projects in progress — the thinking, the massing, the material direction. As projects complete, we'll replace these with photographs of the built results.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 pb-16 md:pb-24">

        {/* ── ROW 1 ──────────────────────────────────────── */}
        <div className="masonry-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start mb-6 md:mb-10">
          {/* Col A — tall portrait, pushed down */}
          <div className="reveal masonry-offset" style={{ paddingTop: '4rem' }}>
            <Card img={heroImage} name="Victorian Terrace — Study" href="/work"
              aspect="3/4" objectPosition="center 38%" />
          </div>

          {/* Col B — landscape, pushed down more */}
          <div className="reveal masonry-offset" style={{ paddingTop: '9rem', transitionDelay: '0.06s' }}>
            <Card img={rearImage} name="Loft Conversion — Study" href="/work"
              aspect="4/3" />
          </div>

          {/* Col C — portrait, higher */}
          <div className="reveal masonry-offset" style={{ paddingTop: '1rem', transitionDelay: '0.12s' }}>
            <Card img={modernImage} name="Side Extension — Concept" href="/work"
              aspect="3/4" />
          </div>

          {/* Col D — wordmark then landscape */}
          <div>
            <div className="reveal hidden md:block" style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
              <span style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: 'var(--foreground)',
              }}>
                NOORAST
              </span>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.16s' }}>
              <Card img={veniceImage} name="Residential Masterplan — Concept" href="/work"
                aspect="4/3" />
            </div>
          </div>
        </div>

        {/* ── ROW 2 ──────────────────────────────────────── */}
        <div className="masonry-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start mb-6 md:mb-10">
          {/* Col A — landscape */}
          <div className="reveal">
            <Card img={veniceImage} name="International — Concept" href="/international"
              aspect="16/10" />
          </div>

          {/* Col B — square, pushed down */}
          <div className="reveal masonry-offset" style={{ paddingTop: '5rem', transitionDelay: '0.06s' }}>
            <Card img={studioImage} name="Garden Studio — Drawing" href="/work"
              aspect="1/1" />
          </div>

          {/* Col C — tall portrait, pushed down */}
          <div className="reveal masonry-offset" style={{ paddingTop: '3rem', transitionDelay: '0.12s' }}>
            <Card img={projectImage} name="New Build — Study" href="/work"
              aspect="3/4" />
          </div>

          {/* Col D — landscape, pushed down */}
          <div className="reveal masonry-offset" style={{ paddingTop: '7rem', transitionDelay: '0.16s' }}>
            <Card img={heroImage} name="Rear Extension — Study" href="/work"
              aspect="16/10" objectPosition="center 60%" />
          </div>
        </div>

        {/* ── ROW 3 — sparser, two images ────────────────── */}
        <div className="masonry-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
          {/* Col A — empty */}
          <div className="hidden md:block" />

          {/* Col B — wide landscape */}
          <div className="reveal masonry-offset" style={{ paddingTop: '2rem' }}>
            <Card img={modernImage} name="Double-Storey — Concept" href="/work"
              aspect="4/3" objectPosition="center 30%" />
          </div>

          {/* Col C — empty */}
          <div className="hidden md:block" />

          {/* Col D — portrait */}
          <div className="reveal" style={{ transitionDelay: '0.08s' }}>
            <Card img={rearImage} name="Listed Building — Study" href="/work"
              aspect="3/4" />
          </div>
        </div>

      </section>

      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8">
          <p style={{ fontSize: '0.9375rem', color: 'var(--muted-foreground)' }}>
            Every project starts with a clear brief and a fixed fee.
          </p>
          <Link to="/contact"
            style={{ textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' }}>
            Discuss a project →
          </Link>
        </div>
      </section>
    </div>
  );
}
