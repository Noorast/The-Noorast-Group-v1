import heroImage from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.png';
import rearImage from '../../assets/d349c2e1b0a0adb43813b52e67d9047ecc52f575.png';
import modernImage from '../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.png';
import projectImage from '../../assets/e947385c703c8e3c623a4d1f62c7deeba551bd6e.png';
import veniceImage from '../../assets/fd485c30db969be36e00beb80f2ac31e3eea017e.png';
import studioImage from '../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.png';
import { Link } from 'react-router';
import { SEO } from '@/app/components/SEO';
import { useEffect, useState, useCallback } from 'react';

const NAVY = '#0B1D51';

const heroSlides = [heroImage, modernImage, rearImage, veniceImage];

type JournalEntry = { img: string; title: string; tag: string; body: string[] };

const journalEntries: JournalEntry[] = [
  {
    img: rearImage,
    title: 'on windows that go too low',
    tag: 'Observation',
    body: [
      'The current orthodoxy in domestic architecture is to make windows as big as possible, drop the sill as low as it can go, and call it "connection to the garden". It works in some houses. In others — older houses with smaller rooms — it removes the place where you actually put things.',
      "There's a reason Victorian windows have sills at 850mm. It's where the radiator went, where the books stacked, where the plant lived. The view to the garden was a bonus, not the point. When we drop sills to 200mm in an Edwardian terrace, we lose a working surface and we gain a draught.",
      'Worth thinking about before you specify the bi-folds.',
    ],
  },
  {
    img: studioImage,
    title: 'van duysen at home',
    tag: 'Reference',
    body: [
      "Re-reading Van Duysen's Phaidon monograph this week. The thing that strikes you on a re-read is how quiet his interiors are without being precious.",
      'Stone floors. Painted plaster. No skirtings. A single colour palette that runs from limestone through bone through cream. It costs a lot to do this well — the trick is the absence of stuff, and the absence of stuff is expensive when every joint has to be perfect.',
      "The temptation, when you can't afford to do it Van Duysen's way, is to compensate with detail. Add a profile here, a moulding there, a \"feature\" wall. The Van Duysen lesson is that the compensation is usually wrong. Better to do less of it properly than more of it almost-right.",
    ],
  },
  {
    img: heroImage,
    title: 'conservation areas, plainly',
    tag: 'Planning',
    body: [
      'A pattern we keep seeing: homeowners on Conservation-Area streets who have been told their plans are "sensitive" and then given conflicting advice by three different planners and two different architects.',
      'The truth is that most Conservation Areas have a published Conservation Area Appraisal. It is a public document. It says, in straightforward English, what the council will and will not accept on those streets — materials, fenestration, roof heights, the lot.',
      "Read it first. The applications that get refused are usually the ones where nobody did.",
    ],
  },
];

const label: React.CSSProperties = {
  fontSize: '0.6875rem', letterSpacing: '0.22em', textTransform: 'uppercase',
  color: 'var(--muted-foreground)', opacity: 0.6, marginTop: '0.75rem', display: 'block',
};

function Card({ img, cat, href, aspect, objectPosition }: {
  img: string; cat: string; href: string; aspect: string; objectPosition?: string;
}) {
  return (
    <Link to={href} className="group block" style={{ textDecoration: 'none' }}>
      <div className="overflow-hidden">
        <img src={img} alt={cat}
          loading="lazy" decoding="async"
          className="w-full block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ aspectRatio: aspect, objectFit: 'cover', objectPosition: objectPosition || 'center' }} />
      </div>
      <span className="masonry-label">{cat}</span>
    </Link>
  );
}

export function Home() {
  const [slide, setSlide] = useState(0);
  const [openEntry, setOpenEntry] = useState<JournalEntry | null>(null);

  const next = useCallback(() => setSlide(s => (s + 1) % heroSlides.length), []);
  const prev = useCallback(() => setSlide(s => (s - 1 + heroSlides.length) % heroSlides.length), []);

  // Auto-advance every 6s
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.05 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="Noorast — Architectural Design, Interiors & Landscape"
        description="A London-based design studio. Architecture, interiors, and landscape for residential clients in the UK and internationally."
      />

      {/* ── HERO SLIDESHOW — full screen with arrows ────── */}
      <section className="w-full overflow-hidden relative" style={{ height: '100vh', minHeight: 520 }}>
        {heroSlides.map((img, i) => (
          <img key={i} src={img} alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1.4s] ease-out ${i === slide ? 'hero-slide-active' : ''}`}
            style={{ objectPosition: 'center 38%', opacity: i === slide ? 1 : 0 }} />
        ))}
        {/* Slide counter */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '3rem', zIndex: 2, display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', color: '#fff', letterSpacing: '0.1em' }}>{String(slide + 1).padStart(2, '0')}</span>
          <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.4)', display: 'inline-block', transform: 'translateY(-3px)' }} />
          <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
        {/* Arrows */}
        <div style={{ position: 'absolute', bottom: '2.5rem', right: '3rem', display: 'flex', gap: '0.75rem', zIndex: 2 }}>
          <button onClick={prev} className="hero-arrow" aria-label="Previous slide">‹</button>
          <button onClick={next} className="hero-arrow" aria-label="Next slide">›</button>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.35)' }} />
        </div>
      </section>

      {/* ── PROJECT MASONRY — 4 fixed columns ────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-8 md:pb-16">

        <div className="masonry-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start mb-6 md:mb-8">
          <div className="reveal masonry-offset" style={{ paddingTop: '4rem' }}>
            <Card img={heroImage} cat="Residential" href="/work" aspect="3/4" objectPosition="center 38%" />
          </div>
          <div className="reveal masonry-offset" style={{ paddingTop: '8rem', transitionDelay: '0.06s' }}>
            <Card img={rearImage} cat="Interiors" href="/work" aspect="4/3" />
          </div>
          <div className="reveal masonry-offset" style={{ paddingTop: '1rem', transitionDelay: '0.12s' }}>
            <Card img={modernImage} cat="Residential" href="/work" aspect="3/4" />
          </div>
          {/* Wordmark + image */}
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
              <Card img={veniceImage} cat="International" href="/international" aspect="4/3" />
            </div>
          </div>
        </div>

        <div className="masonry-grid grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
          <div className="reveal">
            <Card img={projectImage} cat="New Build" href="/work" aspect="16/10" />
          </div>
          <div className="reveal masonry-offset" style={{ paddingTop: '4rem', transitionDelay: '0.06s' }}>
            <Card img={studioImage} cat="Practice" href="/studio" aspect="1/1" />
          </div>
          <div className="hidden md:block" />
          <div className="hidden md:block" />
        </div>
      </section>

      {/* ── HORIZONTAL DIVIDER ───────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
      </div>

      {/* ── NEWS STRIP — horizontal scroll ───────────────── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-10 pb-6 md:pt-14 flex items-center justify-between">
        <div />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => { document.getElementById('news-strip')?.scrollBy({ left: -300, behavior: 'smooth' }); }}
            className="strip-arrow" aria-label="Scroll left">‹</button>
          <button onClick={() => { document.getElementById('news-strip')?.scrollBy({ left: 300, behavior: 'smooth' }); }}
            className="strip-arrow" aria-label="Scroll right">›</button>
        </div>
      </section>

      <div id="news-strip" className="project-scroll px-6 md:px-12 lg:px-16 pb-16 md:pb-20"
        style={{ gap: '0.625rem', maxWidth: 1440, margin: '0 auto' }}>
        {journalEntries.map((item, i) => (
          <button key={i} onClick={() => setOpenEntry(item)}
            className="news-card flex-shrink-0 relative overflow-hidden group cursor-pointer"
            style={{ width: 240, height: 240, border: 'none', padding: 0, background: 'none', textAlign: 'inherit' }}
            aria-label={`Read: ${item.title}`}>
            <img src={item.img} alt=""
              loading="lazy" decoding="async"
              className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-[1.05]" />
            <div className="news-veil" />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: 300, color: '#fff', textAlign: 'center', lineHeight: 1.3, textShadow: '0 1px 10px rgba(0,0,0,0.45)' }}>
                {item.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ── FULL-WIDTH PROJECT BANNER ────────────────────── */}
      <Link to="/work" className="group block" style={{ textDecoration: 'none' }}>
        <div className="overflow-hidden relative" style={{ height: '50vh', minHeight: 300 }}>
          <img src={modernImage} alt="Featured project"
            loading="lazy" decoding="async"
            className="w-full h-full object-cover block transition-transform duration-[1s] ease-out group-hover:scale-[1.01]" />
          <div className="banner-overlay">
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 400, color: '#fff', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Contemporary Extension <span className="banner-view">view study</span>
            </p>
          </div>
        </div>
      </Link>

      {/* ── ANOTHER FULL-WIDTH BANNER ────────────────────── */}
      <Link to="/work" className="group block" style={{ textDecoration: 'none' }}>
        <div className="overflow-hidden relative" style={{ height: '50vh', minHeight: 300 }}>
          <img src={heroImage} alt="Featured project"
            loading="lazy" decoding="async"
            className="w-full h-full object-cover block transition-transform duration-[1s] ease-out group-hover:scale-[1.01]"
            style={{ objectPosition: 'center 38%' }} />
          <div className="banner-overlay">
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 400, color: '#fff', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Victorian Terrace <span className="banner-view">view study</span>
            </p>
          </div>
        </div>
      </Link>

      {/* ── POINT OF VIEW ────────────────────────────────── */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-xl reveal">
          <figure style={{ maxWidth: '54rem' }}>
            <blockquote style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.75rem)',
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 1.32,
              color: 'var(--foreground)',
            }}>
              It is the culture and collective life inhabiting architecture that make it architecture.
            </blockquote>
            <figcaption style={{ fontSize: '0.6875rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.5, marginTop: '2rem' }}>
              Aldo Rossi
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── CLOSING INVITATION ───────────────────────────── */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-xl reveal">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 3rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.15, color: 'var(--foreground)' }}>
                Tell us about your project.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--muted-foreground)', marginBottom: '1.75rem' }}>
                The first conversation is free and carries no obligation. Tell us what you are thinking of, and we will tell you honestly how the studio would approach it.
              </p>
              <Link to="/contact" style={{ textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' }}>
                Start a conversation →
              </Link>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/fee-guide" style={{ textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-foreground)', borderBottom: '1px solid rgba(40,30,20,0.12)', paddingBottom: '2px' }}>
                  Or see an indication of fees →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNAL MODAL ────────────────────────────────── */}
      {openEntry && (
        <div className="journal-overlay" onClick={() => setOpenEntry(null)} role="dialog" aria-modal="true">
          <div className="journal-panel" onClick={(e) => e.stopPropagation()}>
            <button className="journal-close" onClick={() => setOpenEntry(null)} aria-label="Close">×</button>
            <p style={{ fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.5, marginBottom: '1.25rem' }}>
              From the studio<span className="brand-dot" />{openEntry.tag}
            </p>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '2rem', color: 'var(--foreground)' }}>
              {openEntry.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {openEntry.body.map((p, i) => (
                <p key={i} style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--muted-foreground)' }}>{p}</p>
              ))}
            </div>
            <p style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(40,30,20,0.08)', fontSize: '0.6875rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.5 }}>
              Noorast<span className="brand-dot" />{new Date().getFullYear()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
