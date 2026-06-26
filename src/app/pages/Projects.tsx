import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import projectImage from '../../assets/e947385c703c8e3c623a4d1f62c7deeba551bd6e.webp';
import rearImage    from '../../assets/d349c2e1b0a0adb43813b52e67d9047ecc52f575.webp';
import veniceImage  from '../../assets/fd485c30db969be36e00beb80f2ac31e3eea017e.webp';
import modernImage  from '../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.webp';
import heroImage    from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.webp';
import studioImage  from '../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.webp';
import { useEffect } from 'react';

const EYE: React.CSSProperties = {
  fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--bau-black)', fontWeight: 700,
};
const BODY: React.CSSProperties = {
  fontSize: '0.9375rem', lineHeight: 1.82, color: 'var(--muted-foreground)',
};
const LINK: React.CSSProperties = {
  textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em',
  textTransform: 'uppercase', color: 'var(--foreground)',
  borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px',
};

/*
  Honest portfolio for an early studio: each piece is a single concept study,
  shown once, at a stated stage. No image is reused. The first slot is built as a
  full-width ANCHOR so a real completed project (photograph + plan + section) can
  drop straight in and lead the page when it exists.

  To add a real project later: set `anchor` with its own images and copy, and it
  becomes the hero. Until then the anchor slot is intentionally left out and the
  studies lead, framed honestly as concept work.
*/

type Study = {
  fig: string;
  title: string;
  meta: string;        // discipline · stage
  place: string;       // location / context, kept honest and unspecific
  img: string;
  note: string;        // one line on what the study explores
  aspect: string;
  pos?: string;
};

const STUDIES: Study[] = [
  {
    fig: 'fig.01',
    title: 'Victorian Terrace',
    meta: 'Architecture · Study',
    place: 'London terrace, rear',
    img: heroImage,
    note: 'A rear addition tied back into the existing party walls, tested for light through the day.',
    aspect: '4/3',
    pos: 'center 40%',
  },
  {
    fig: 'fig.02',
    title: 'Loft Conversion',
    meta: 'Architecture · Study',
    place: 'Pitched roof, dormer',
    img: rearImage,
    note: 'A study in headroom and the line of the new dormer against the original ridge.',
    aspect: '4/3',
  },
  {
    fig: 'fig.03',
    title: 'Side Extension',
    meta: 'Architecture · Concept',
    place: 'Semi detached, infill',
    img: modernImage,
    note: 'Massing for a single storey infill, kept subordinate to the principal elevation.',
    aspect: '4/3',
  },
  {
    fig: 'fig.04',
    title: 'Garden Studio',
    meta: 'Architecture · Drawing',
    place: 'Detached outbuilding',
    img: studioImage,
    note: 'A small detached studio worked up in plan and section, the most resolved piece on the page.',
    aspect: '4/3',
  },
  {
    fig: 'fig.05',
    title: 'New Build House',
    meta: 'Architecture · Study',
    place: 'Infill plot',
    img: projectImage,
    note: 'An early concept for a single house on a tight urban plot.',
    aspect: '4/3',
    pos: 'center 35%',
  },
  {
    fig: 'fig.06',
    title: 'Residential Masterplan',
    meta: 'International · Concept',
    place: 'Overseas commission',
    img: veniceImage,
    note: 'Concept massing for a small residential group, led from London with a local partner.',
    aspect: '4/3',
  },
];

function StudyRow({ study, flip, delay }: { study: Study; flip: boolean; delay: number }) {
  return (
    <div className="reveal" style={{ borderTop: '2px solid var(--bau-black)', transitionDelay: `${delay}s` }}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center" style={{ padding: '3rem 0' }}>
        {/* Image */}
        <div className={`lg:col-span-7 ${flip ? 'lg:order-2 lg:col-start-6' : ''}`}>
          <div className="group overflow-hidden" style={{ background: 'var(--bau-paper)' }}>
            <img src={study.img} alt={`${study.title}, ${study.meta}`}
              loading="lazy" decoding="async"
              className="w-full block transition-transform duration-[1.1s] ease-out group-hover:scale-[1.025]"
              style={{ aspectRatio: study.aspect, objectFit: 'cover', objectPosition: study.pos || 'center' }} />
          </div>
        </div>

        {/* Text */}
        <div className={`lg:col-span-4 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9'}`}>
          <div className="fig-label" style={{ marginTop: 0, marginBottom: '1.25rem' }}>
            <span className="fig-n">{study.fig}</span>
            <span className="fig-t">{study.meta}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            {study.title}
          </h2>
          <p style={{ ...EYE, opacity: 0.4, marginBottom: '1.25rem' }}>{study.place}</p>
          <p style={BODY}>{study.note}</p>
        </div>
      </div>
    </div>
  );
}

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
        title="Work · Noorast"
        description="Concept studies and current work from Noorast, a London design studio. Residential architecture, interiors, and landscape, shown at the stage each piece has reached."
        path="/work"
      />

      {/* HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '1.75rem' }}>
              Selected work<span className="brand-dot" />Studio 2025 / 26
            </p>
            <h1 style={{ letterSpacing: '-0.025em', fontWeight: 500 }}>
              Concept studies,<br />current work.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ transitionDelay: '0.1s' }}>
            <p style={{ ...BODY, maxWidth: '24rem' }}>
              We are a young studio. What follows is concept work and projects in progress, each shown at the stage it has reached.
            </p>
          </div>
        </div>
      </section>

      {/* STUDIES — alternating rows, one image each, no repeats */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-12">
        {STUDIES.map((study, i) => (
          <StudyRow key={study.fig} study={study} flip={i % 2 === 1} delay={(i % 2) * 0.06} />
        ))}
      </section>

      {/* HONEST NOTE — why concept work, framed as intent */}
      <section className="joint" style={{ background: 'var(--bau-paper)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 reveal">
              <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '1.5rem' }}>A note on the work</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5 reveal" style={{ transitionDelay: '0.08s', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--foreground)' }}>
                We would rather show honest concept work than dress up a thin portfolio.
              </p>
              <p style={BODY}>
                These are studies: the thinking, the massing, the material direction. The garden studio is a real drawing, and the one we are proudest of, precisely because it is real. As projects complete, built work will lead this page instead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={BODY}>Every project starts with a clear brief and a fixed fee.</p>
          <Link to="/contact" style={LINK}>Discuss a project →</Link>
        </div>
      </section>
    </div>
  );
}
