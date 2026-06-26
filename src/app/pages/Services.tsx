import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';
import heroImage   from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.webp';
import modernImage from '../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.webp';

const EYE: React.CSSProperties = {
  fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--bau-black)', fontWeight: 700,
};
const BODY: React.CSSProperties = {
  fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--muted-foreground)',
};
const LINK: React.CSSProperties = {
  textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em',
  textTransform: 'uppercase', color: 'var(--foreground)',
  borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px',
};

const disciplines = [
  {
    n: '01', title: 'Architectural Design', to: '/architectural',
    paras: [
      'The studio works on extensions, loft conversions, garage conversions, and new houses. That means drawing up the design, lodging the planning application, and seeing it through the council to a decision.',
      'Once permission is granted, we prepare the technical drawings that building control need before work begins, the set your builder reads from on site. We stay involved through construction.',
    ],
  },
  {
    n: '02', title: 'Interior Design', to: '/interiors',
    paras: [
      'Interiors begin with how you actually live, not a mood board. We work through the plan, materials, light, and joinery until the inside has been thought about as carefully as the outside.',
      'It sits naturally alongside an extension or renovation. It works equally well on its own.',
    ],
  },
  {
    n: '03', title: 'Landscape Design', to: '/landscape',
    paras: [
      'The garden is usually the last thing anyone thinks about and the first thing you see from the kitchen. We design the outside as part of the same idea as the inside: levels, planting, paving, the line between house and ground.',
      'Best considered early, while there is still time to do it properly.',
    ],
  },
  {
    n: '04', title: 'International Projects', to: '/international',
    paras: [
      'For clients building outside the UK, the studio leads the design from London and appoints a trusted partner on the ground for everything that must happen locally.',
      'One point of contact here, one there. The way we work does not change from one country to the next.',
    ],
  },
];

export function Services() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.04, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach(el => io.observe(el));
    const fb = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2000);
    return () => { io.disconnect(); window.clearTimeout(fb); };
  }, []);

  return (
    <div>
      <SEO
        title="Services · Noorast"
        description="Architectural design, interior design, landscape, and international projects. Residential work, considered properly."
        path="/services"
      />

      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 reveal">
            <p className="label" style={{ marginBottom: '2rem' }}>What we do</p>
            <h1>The house, its rooms, and its ground.</h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ transitionDelay: '0.1s' }}>
            <p style={{ ...BODY, maxWidth: '26rem' }}>
              Most studios stop at the structure. We design the building, the interior, and the landscape as one continuous problem, because a house only works when the three agree. Take all of it, or any one part.
            </p>
          </div>
        </div>
      </section>

      {/* PAIRED IMAGE + INTRO */}
      <section className="reveal" style={{ marginBottom: '0' }}>
        <div style={{ aspectRatio: '21/8', overflow: 'hidden', background: 'var(--bau-paper)' }}>
          <img src={heroImage} alt="" loading="eager" decoding="async"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 42%' }} />
        </div>
      </section>

      {/* JOB-LED ROUTES — what people actually come in for */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="reveal" style={{ marginBottom: '3.5rem', maxWidth: '34rem' }}>
            <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '1.75rem' }}>Where most people start</p>
            <h2 style={{ fontWeight: 500 }}>What are you<br />looking to do?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(40,30,20,0.08)' }}>
            {[
              { to: '/services/extensions-loft', n: '01', t: 'Extension or loft', d: 'More space. A rear extension, a side return, or a loft conversion, designed and taken through planning.' },
              { to: '/services/renovation-interiors', n: '02', t: 'Renovation or interior', d: 'Better space. Reworking how an existing house lives, with the inside considered as carefully as the structure.' },
              { to: '/services/new-build', n: '03', t: 'A new house', d: 'From the ground up. A single house on its own plot, led from first principles through to construction.' },
            ].map((c, i) => (
              <Link key={c.n} to={c.to} className="group reveal"
                style={{ background: 'var(--background)', padding: '2.5rem 2rem', textDecoration: 'none', display: 'block', transition: 'background 0.3s ease', transitionDelay: `${i * 0.06}s` }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bau-paper)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--background)')}>
                <p style={{ ...EYE, opacity: 0.35, marginBottom: '1.5rem' }}>{c.n}</p>
                <h3 style={{ fontWeight: 400, fontSize: '1.1875rem', marginBottom: '0.875rem' }}>{c.t}</h3>
                <p style={{ ...BODY, fontSize: '0.875rem', marginBottom: '1.5rem' }}>{c.d}</p>
                <span style={LINK}>See more →</span>
              </Link>
            ))}
          </div>
          <p className="reveal" style={{ ...BODY, fontSize: '0.8125rem', opacity: 0.7, marginTop: '1.75rem' }}>
            Not sure which fits, or working on something else? The disciplines below explain how we work, or you can just <Link to="/contact" style={{ color: 'var(--foreground)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>tell us about it</Link>.
          </p>
        </div>
      </section>

      {/* DISCIPLINES — numbered rows */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-14">
          {disciplines.map((d, i) => (
            <div key={d.n} className="reveal"
              style={{ borderTop: i === 0 ? 'none' : '2px solid var(--bau-black)', padding: '3rem 0', transitionDelay: `${i * 0.06}s` }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-2">
                  <p style={{ ...EYE, opacity: 0.35, marginBottom: '1rem' }}>{d.n}</p>
                </div>
                <div className="lg:col-span-3">
                  <h2 style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)', fontWeight: 500, letterSpacing: '-0.018em', lineHeight: 1.2 }}>
                    {d.title}
                  </h2>
                </div>
                <div className="lg:col-span-5 lg:col-start-7" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {d.paras.map((p, j) => <p key={j} style={BODY}>{p}</p>)}
                  <div style={{ marginTop: '0.5rem' }}>
                    <Link to={d.to} style={LINK}>More on {d.title.toLowerCase()} →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISUALISATIONS UPSELL */}
      <section style={{ background: 'var(--bau-black)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 reveal">
              <p style={{ ...EYE, color: 'rgba(255,255,255,.3)', marginBottom: '2rem' }}>3D Visualisation</p>
              <h2 style={{ color: 'rgba(255,255,255,.88)', marginBottom: '1.5rem' }}>
                Seeing it before it is built.
              </h2>
              <p style={{ ...BODY, color: 'rgba(255,255,255,.5)', marginBottom: '2rem' }}>
                For projects where it matters, planning applications, client decisions, contractor briefings, we produce rendered visualisations that show the design as it will look, not as a line drawing.
              </p>
              <Link to="/contact" style={{ ...LINK, color: 'rgba(255,255,255,.5)', borderBottomColor: 'rgba(255,255,255,.2)' }}>
                Ask about visualisations →
              </Link>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ transitionDelay: '0.1s' }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'rgba(255,255,255,.04)' }}>
                <img src={modernImage} alt="" loading="lazy" decoding="async"
                  className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEES */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 reveal">
              <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '1.5rem' }}>On fees</p>
              <h2 style={{ fontSize: 'clamp(1.375rem, 2.4vw, 2rem)' }}>Clear before<br />we start.</h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ transitionDelay: '0.08s', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={BODY}>
                Most work is priced at a fixed fee for the design stage, agreed in writing before anything begins. Some scopes, early advice, ongoing input, smaller pieces, sit better on an hourly basis. Either way, you know the studio's fee before you commit.
              </p>
              <p style={BODY}>
                We quote each project on its own terms once we understand what it involves. The first conversation is free and carries no obligation.
              </p>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                <Link to="/fee-guide" style={LINK}>Fee guide →</Link>
                <Link to="/contact" style={{ ...LINK, color: 'var(--muted-foreground)', borderBottomColor: 'var(--bau-red)' }}>
                  Start a conversation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
