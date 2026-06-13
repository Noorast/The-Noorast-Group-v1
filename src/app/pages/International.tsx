import veniceImage from '../../assets/fd485c30db969be36e00beb80f2ac31e3eea017e.png';
import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)' },
  eyebrowLight: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.45 },
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function International() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.05 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="International Projects — Noorast"
        description="We design homes for clients anywhere in the world. Managed from London, delivered with a trusted local partner on the ground. Fixed fees per stage."
      />

      {/* HERO — dark */}
      <section className="w-full overflow-hidden" style={{ height: '85vh', minHeight: 480, position: 'relative', background: '#1c1c1c' }}>
        <img src={veniceImage} alt="International residential project"
          className="w-full h-full object-cover block"
          style={{ objectPosition: 'center', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '4rem 5rem' }}>
          <div style={{ maxWidth: '44rem' }}>
            <p style={{ ...s.eyebrow, marginBottom: '2rem' }}>International projects</p>
            <h1 style={{ letterSpacing: '-0.03em', lineHeight: 1.02, color: '#f0ede8' }}>
              We design homes for clients anywhere in the world.
            </h1>
          </div>
        </div>
      </section>

      {/* THE OPPORTUNITY — prose only */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="max-w-3xl reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ ...s.eyebrowLight, marginBottom: '1.5rem' }}>How we work abroad</p>
          <h2 style={{ letterSpacing: '-0.025em', marginBottom: '1rem' }}>
            UK-quality design, wherever your project is.
          </h2>
          <p style={s.body}>
            A growing share of the studio's work is for clients with property outside the UK. Most of them have run into the same problem — British practices that say they can work internationally but can't actually manage it on the ground, or local practices that don't quite deliver to the standard the client wants. We sit between the two.
          </p>
          <p style={s.body}>
            The studio has worked on projects across Europe, the Middle East, and South Asia. The design is led from London. Delivery is handled by a trusted in-country partner who knows the contractors, the local rules, and the way things actually get built. You have one point of contact in the UK and another on the ground.
          </p>
          <p style={s.body}>
            If you have a plot or a property somewhere in the world and aren't sure where to start, get in touch. The first conversation costs nothing, and we'll give you an honest view of what's involved before you commit to anything.
          </p>
        </div>
      </section>

      {/* HOW WE WORK — kept the dark 3-col but with longer prose, no labels reading like spec sheets */}
      <section style={{ borderTop: '1px solid rgba(40,30,20,0.07)', background: '#1c1c1c' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
          <p style={{ ...s.eyebrow, marginBottom: '3rem' }}>How it works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                n: '01', title: 'You brief us from the UK',
                body: "We start with a video call. You tell us about the plot, the building, and what you're trying to achieve. We can work in different languages — just let us know what works for you and your family.",
              },
              {
                n: '02', title: 'We design, you review',
                body: "Floor plans, layouts, and elevations come to you online for review with whoever else is involved. Changes are included at each stage. Nothing gets finalised until you're happy.",
              },
              {
                n: '03', title: 'Our local partner takes over',
                body: "Our partner on the ground handles contractors, site visits, and any local approvals. You've got one point of contact here in the UK and one there. Everyone speaks the same language about your project.",
              },
            ].map((step, i) => (
              <div key={step.n} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>{step.n}</p>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 300, color: '#f0ede8', marginBottom: '1rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.45)' }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PARTNER MODEL */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 reveal">
              <p style={{ ...s.eyebrowLight, marginBottom: '1.5rem' }}>The partner model</p>
              <p style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.4, color: 'var(--foreground)' }}>
                One structure,<br />every territory.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 reveal" style={{ transitionDelay: '0.1s', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={s.body}>
                The studio appoints a trusted partner on the ground for every international project. Partners are contracted directly by us, selected for their familiarity with local contractors, regulations, and building culture. You speak to one point of contact at the studio. We speak to one point of contact in-country. The structure is the same in every territory.
              </p>
              <p style={s.body}>
                The studio has worked on projects across Europe, the Middle East, and South Asia. New international commissions are accepted on a case-by-case basis — the first conversation costs nothing, and we'll tell you honestly whether the project is one we can deliver well.
              </p>
              <p style={{ ...s.body, fontSize: '0.875rem', opacity: 0.75 }}>
                International work carries a coordination cost that UK work doesn't — time zones, document translation, partner management. Our fees reflect that honestly rather than hiding it in extras later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEES — prose */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
          <div className="max-w-3xl reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ ...s.eyebrowLight, marginBottom: '1.5rem' }}>On fees</p>
            <p style={s.body}>
              International work is quoted on its own terms once we understand the site, the scope, and how the project will be run on the ground. There is a coordination cost to working across borders, and we are upfront about it rather than burying it in extras later.
            </p>
            <p style={s.body}>
              The first conversation is free. Tell us where the project is and what you have in mind, and we will tell you honestly whether it is one the studio can deliver well.
            </p>
            <p style={s.body}>
              Every project gets a fixed fee per stage, written down before any work begins.
            </p>
          </div>
        </div>
      </section>

      {/* WE UNDERSTAND — prose only */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32">
          <div className="max-w-3xl reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ letterSpacing: '-0.025em', marginBottom: '1rem' }}>We understand the complications.</h2>
            <p style={s.body}>
              International projects bring their own headaches — coordinating across time zones, trusting people you haven't met, navigating local rules you might not know, and explaining decisions to family members in three different countries. We've been through all of that and we know how to handle it.
            </p>
            <p style={s.body}>
              The clients we typically work with include people in the UK with land abroad who don't know where to start, families commissioning a home overseas who want British design standards, expats renovating property in their home country, and anyone who's tried to manage a project from a distance before and decided they need a professional to hold it together this time.
            </p>
            <p style={s.body}>
              Whatever the situation, we keep things simple. One point of contact here. A clear fee. Regular updates. A local partner who knows the ground.
            </p>
          </div>
        </div>
      </section>

      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 flex flex-wrap items-center justify-between gap-8 reveal">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 300, marginBottom: '0.75rem' }}>Tell us about your project.</h3>
            <p style={s.body}>Let us know where the property is and what you have in mind. We'll come back within two working days.</p>
          </div>
          <Link to="/contact" style={s.link}>Get in touch →</Link>
        </div>
      </section>
    </div>
  );
}
