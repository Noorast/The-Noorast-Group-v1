import studioImage  from '../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.webp';
import studioImage2 from '../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.webp';
import wideImage    from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.webp';
import { SEO }  from '../components/SEO';
import { Link } from 'react-router';
import { useEffect } from 'react';

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

export function Practice() {
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
        title="Studio · Noorast"
        description="Noorast is a London residential design studio led by Aun Naeem, working across architecture, interiors, and landscape, in the UK and internationally."
        path="/studio"
      />

      {/* HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end reveal">
          <div className="lg:col-span-8">
            <p className="label" style={{ marginBottom: '2rem' }}>The studio, est. 2025</p>
            <h1 style={{ maxWidth: '15ch' }}>Small on purpose.</h1>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p style={{ ...BODY, fontSize: '0.875rem' }}>
              A few projects at a time, so the person who takes your brief is the one who draws it and answers the phone.
            </p>
          </div>
        </div>
      </section>

      {/* THE STUDIO */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ ...EYE, marginBottom: '0.5rem' }}>The studio</p>
              <p style={BODY}>
                A London studio working across architecture, interiors, and landscape, almost entirely on residential projects in the UK and abroad.
              </p>
              <p style={BODY}>
                A small core team, with specialists brought in per project. We take on a few jobs at a time, on purpose.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="overflow-hidden" style={{ aspectRatio: '4/5', background: 'var(--bau-paper)' }}>
                <img src={studioImage} alt="Plan and section drawing" loading="lazy" decoding="async"
                  className="w-full h-full object-cover" />
              </div>
              <p className="masonry-label">Section &amp; plan<span className="brand-dot" />drawing</p>
            </div>
          </div>
        </div>
      </section>

      {/* POINT OF VIEW — what we believe */}
      <section style={{ background: 'var(--bau-black)', padding: '7rem 0' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 reveal">
          <p style={{ ...EYE, color: 'rgba(255,255,255,.3)', marginBottom: '2.5rem' }}>What we believe</p>
          <p style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.625rem)',
            fontWeight: 500,
            letterSpacing: '-0.022em', lineHeight: 1.3,
            color: 'rgba(255,255,255,.88)', maxWidth: '52rem',
          }}>
            We are interested in houses that age well. Buildings that look better in twenty years than on the day the scaffolding comes down.
          </p>
          <p style={{ ...BODY, marginTop: '2.5rem', maxWidth: '40rem', color: 'rgba(255,255,255,.45)' }}>
            That rules a few things out: signature gestures, fashionable materials, and details that will not survive their first decade. The brief comes first. The style is whatever the brief asks for, and not a house style applied on top of it.
          </p>
        </div>
      </section>

      {/* WHAT WE REFUSE / WHAT TO EXPECT — two honest columns */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-6 reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '0.5rem' }}>What we will not do</p>
              <p style={BODY}>
                Take on more than we can do well, or tell you a scheme works when it does not. If planning looks unlikely, you hear it early.
              </p>
              <p style={BODY}>
                Quote low to win the job and revise it later. The fee is fixed in writing before we start.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 reveal" style={{ transitionDelay: '0.08s', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p className="eyebrow-tick" style={{ ...EYE, marginBottom: '0.5rem' }}>What to expect</p>
              <p style={BODY}>
                A clear brief, a fixed scope, and drawings you can actually read. You deal with the person doing the work, not an account manager.
              </p>
              <p style={BODY}>
                We work remotely, with site visits when they earn their place, which is how we take on work across the UK and abroad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Portrait placeholder, ready for a real photo */}
            <div className="lg:col-span-5 reveal order-2 lg:order-1">
              <div className="overflow-hidden" style={{ aspectRatio: '4/5', background: 'var(--bau-paper)', position: 'relative' }}>
                {/* TODO(Aun): replace with a real portrait photograph (4:5, warm, plain background). */}
                <img src={studioImage2} alt="" loading="lazy" decoding="async"
                  className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '1.25rem' }}>
                  <span style={{ ...EYE, opacity: 0.6, background: 'var(--background)', padding: '0.4rem 0.6rem' }}>
                    Portrait to follow
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal order-1 lg:order-2"
              style={{ transitionDelay: '0.08s', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ ...EYE, marginBottom: '0.5rem' }}>Founding director</p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Aun Naeem
              </h2>
              <p style={BODY}>
                Aun founded Noorast in 2025 and leads the design work. The studio started from one idea: that good residential design comes down to attention, not budget, and most homeowners never get enough of it.
              </p>
              {/* TODO(Aun): add one or two sentences in your own voice on your background and what drew you to residential work. Keep it specific and plain. */}
              <p style={BODY}>
                He works directly with every client, start to finish.
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <a href="mailto:design@noorast.co.uk?subject=A%20project%20with%20Noorast" style={LINK}>
                  Email the studio →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WIDE IMAGE */}
      <section className="reveal">
        <div className="overflow-hidden" style={{ aspectRatio: '21/9', background: 'var(--bau-paper)' }}>
          <img src={wideImage} alt="Residential concept study" loading="lazy" decoding="async"
            className="w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
        </div>
      </section>

      {/* PARTNER NETWORK */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end reveal">
            <div className="lg:col-span-7">
              <p style={{ ...EYE, marginBottom: '1.25rem' }}>The network</p>
              <p style={{ ...BODY, maxWidth: '36rem' }}>
                We bring in specialists per project. If you are a contractor, photographer, or consultant who would like to be considered for work, get in touch.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
              <a href="mailto:design@noorast.co.uk?subject=Working%20with%20Noorast" style={LINK}>
                Introduce yourself →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={BODY}>Want to work with the studio?</p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/services" style={LINK}>What we do →</Link>
            <Link to="/contact" style={{ ...LINK, color: 'var(--muted-foreground)', borderBottomColor: 'var(--bau-red)' }}>
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
