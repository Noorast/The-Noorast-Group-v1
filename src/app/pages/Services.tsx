import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.5 },
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function Services() {
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

  const disciplines = [
    {
      n: '01', title: 'Architectural Design', to: '/architectural',
      paras: [
        'The studio works on extensions, loft conversions, garage conversions, and new houses. For most projects that means drawing up the design, lodging the planning application, and seeing it through the council to a decision.',
        'Once permission is granted, we prepare the technical drawings that building control need before work can begin — the set your builder reads from on site.',
      ],
    },
    {
      n: '02', title: 'Interior Design', to: '/interiors',
      paras: [
        'Interiors begin with how you actually live, not with a mood board. We work through the plan, the materials, the light, and the joinery until the inside of the house has been thought about as carefully as the outside.',
        'It sits naturally alongside an extension or a renovation, and it works just as well on its own.',
      ],
    },
    {
      n: '03', title: 'Landscape Design', to: '/landscape',
      paras: [
        'The garden is usually the last thing anyone thinks about and the first thing you see from the kitchen. We design the outside as part of the same idea as the inside — levels, planting, paving, and the line between house and ground.',
        'Best considered early, while there is still time to do it properly.',
      ],
    },
    {
      n: '04', title: 'International Projects', to: '/international',
      paras: [
        'For clients building outside the UK, the studio leads the design from London and appoints a trusted partner on the ground for everything that has to happen locally.',
        'You speak to one person here and one person there. The way we work does not change from one country to the next.',
      ],
    },
  ];

  return (
    <div>
      <SEO
        title="Services — Noorast"
        description="What the studio does: architectural design, interiors, landscape, and international projects. Residential work, considered properly."
      />

      {/* HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-3xl reveal">
          <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Services<span className="brand-dot" />Noorast</p>
          <h1 style={{ letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>What we do.</h1>
          <p style={{ ...s.body, maxWidth: '40rem' }}>
            Four disciplines, run by one studio. We can take them on together as a single project or any one of them on its own. Every commission begins the same way — a conversation, a clear brief, and a scope agreed in writing before any drawing starts.
          </p>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
          {disciplines.map((d, i) => (
            <div key={d.n} className="reveal" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(40,30,20,0.07)', padding: '3rem 0' }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-3">
                  <p style={{ ...s.eyebrow, marginBottom: '1rem' }}>{d.n}</p>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{d.title}</h2>
                </div>
                <div className="lg:col-span-7 lg:col-start-5" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {d.paras.map((p, j) => <p key={j} style={s.body}>{p}</p>)}
                  <div style={{ marginTop: '0.5rem' }}>
                    <Link to={d.to} style={s.link}>More on {d.title.toLowerCase()} →</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEES — what we charge for, not numbers */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3 reveal">
              <p style={{ ...s.eyebrow, marginBottom: '1rem' }}>On fees</p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.15 }}>Clear before we start.</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-5 reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={s.body}>
                Most of our work is priced at a fixed fee for the design stage, agreed in writing before anything begins. Some scopes — early advice, ongoing input across a longer project, smaller pieces of work — sit better on an hourly basis. Either way, you will know what the studio's fee is before you commit to it.
              </p>
              <p style={s.body}>
                We quote each project on its own terms once we understand what it involves. The first conversation is free and carries no obligation — tell us what you are thinking of and we will tell you honestly how we would approach it.
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <Link to="/contact" style={s.link}>Start a conversation →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
