import heroImage from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.png';
import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';
import { ProcessTimeline } from '../components/ProcessTimeline';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.45 },
  body: { fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function Architectural() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="Architectural Design — Noorast"
        description="Planning drawings and building regulations for extensions, loft conversions, and new builds. Fixed fees. We handle the drawings, submit the application, and deal with the council."
      />

      <section className="w-full overflow-hidden" style={{ height: '70vh', minHeight: 380 }}>
        <img src={heroImage} alt="Architectural design — Noorast"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 38%' }} />
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-3xl reveal">
          <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Architectural design</p>
          <h1 style={{ letterSpacing: '-0.03em' }}>
            Planning drawings, building regs, and design for your home.
          </h1>
        </div>
      </section>

      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <div className="max-w-2xl reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={s.body}>
              The studio works on extensions, loft conversions, garage conversions, and new houses. For most projects that means drawing up the design, lodging the planning application, and seeing it through the council to a decision. Once permission is granted, we prepare the technical drawings that building control need before work can begin.
            </p>
            <p style={s.body}>
              If you are not sure whether you even need planning permission, we can look at it first — a short written assessment of what is possible on your site before you spend anything on a full scheme.
            </p>
            <p style={s.body}>
              And if an application has already been refused, we read the decision notice properly, work out whether the council's reasoning holds up, and tell you honestly whether it is worth appealing or whether a different design is the wiser route.
            </p>

          </div>
        </div>
      </section>


      <ProcessTimeline stages={[
        { n: '01', title: 'Conversation', duration: '30 min · free', deliverable: "An honest view on whether the project's right for the studio." },
        { n: '02', title: 'Brief & site', duration: 'Weeks 1–2', deliverable: 'A written brief and a site conditions note.' },
        { n: '03', title: 'Concept', duration: 'Weeks 3–6', deliverable: 'Design options, sketches, indicative cost ranges.' },
        { n: '04', title: 'Planning', duration: 'Weeks 7–12', deliverable: 'Full planning application, drawn and submitted.' },
        { n: '05', title: 'Council', duration: 'Weeks 13–20', deliverable: 'The back-and-forth, managed end to end.' },
        { n: '06', title: 'Building regs', duration: 'Weeks 21–26', deliverable: 'Technical drawings your builder prices from.' },
        { n: '07', title: 'On site', duration: 'As needed', deliverable: 'Site visits and contractor coordination.' },
      ]} />
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8">
          <p style={s.body}>Ready to discuss your project?</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/services" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '1px solid rgba(40,30,20,0.1)' }}>About our fees</Link>
            <Link to="/contact" style={s.link}>Get in touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
