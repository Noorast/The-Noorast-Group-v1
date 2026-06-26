import heroImage from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.webp';
import detailImage from '../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.webp';
import secondImage from '../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.webp';
import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useEffect } from 'react';
import { ProcessTimeline } from '../components/ProcessTimeline';

const s = {
  eyebrow: { fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--bau-black)', fontWeight: 700 },
  body: { fontSize: '0.9375rem', lineHeight: 1.82, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px' },
};

export function Architectural() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.01, rootMargin: '0px 0px -4% 0px' });
    els.forEach(el => io.observe(el));
    const fb = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2000);
    return () => { io.disconnect(); window.clearTimeout(fb); };
  }, []);

  return (
    <div>
      <SEO
        title="Architectural Design · Noorast"
        description="Planning drawings and building regulations for extensions, loft conversions, and new builds. We handle the drawings, submit the application, and deal with the council."
        path="/architectural"
      />

      {/* HERO */}
      <section className="w-full overflow-hidden" style={{ height: '64vh', minHeight: 360 }}>
        <img src={heroImage} alt="Architectural design · Noorast"
          className="w-full h-full object-cover" style={{ objectPosition: 'center 38%' }} />
      </section>

      {/* TITLE */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end reveal">
          <div className="lg:col-span-8">
            <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.75rem' }}>Architectural design</p>
            <h1 style={{ letterSpacing: '-0.02em' }}>
              Drawings, permissions,<br />and the design itself.
            </h1>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p style={{ ...s.body, fontSize: '0.875rem' }}>
              Extensions, loft conversions, and new houses, taken from first sketch to the set your builder works from.
            </p>
          </div>
        </div>
      </section>

      {/* STANZA 1 — text + image */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5 reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={{ ...s.eyebrow, marginBottom: '0.5rem' }}>What we do</p>
              <p style={s.body}>
                The studio works on extensions, loft conversions, garage conversions, and new houses. For most projects that means drawing up the design, lodging the planning application, and seeing it through the council to a decision. Once permission is granted, we prepare the technical drawings that building control need before work can begin.
              </p>
              <p style={s.body}>
                If you are not sure whether you even need planning permission, we can look at it first, a short written assessment of what is possible on your site before you spend anything on a full scheme.
              </p>
              <p style={s.body}>
                And if an application has already been refused, we read the decision notice properly, work out whether the council's reasoning holds up, and tell you honestly whether to appeal or whether a different design is the wiser route.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="overflow-hidden" style={{ aspectRatio: '4/5', background: 'var(--bau-paper)' }}>
                <img src={detailImage} alt="" loading="lazy" decoding="async"
                  className="w-full h-full object-cover" />
              </div>
              <p className="masonry-label">Section &amp; plan · drawing</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessTimeline stages={[
        { n: '01', title: 'Conversation', duration: '30 min · free', deliverable: "An honest view on whether the project's right for the studio." },
        { n: '02', title: 'Brief & site', duration: 'Weeks 1 to 2', deliverable: 'A written brief and a site conditions note.' },
        { n: '03', title: 'Concept', duration: 'Weeks 3 to 6', deliverable: 'Design options drawn up, with sketches to react to.' },
        { n: '04', title: 'Planning', duration: 'Weeks 7 to 12', deliverable: 'Full planning application, drawn and submitted.' },
        { n: '05', title: 'Council', duration: 'Weeks 13 to 20', deliverable: 'The back and forth, managed end to end.' },
        { n: '06', title: 'Building regs', duration: 'Weeks 21 to 26', deliverable: 'Technical drawings your builder works from.' },
        { n: '07', title: 'On site', duration: 'As needed', deliverable: 'Site visits and contractor coordination.' },
      ]} />

      {/* WIDE IMAGE BREAK */}
      <section className="reveal">
        <div className="overflow-hidden" style={{ aspectRatio: '21/9', background: 'var(--bau-paper)' }}>
          <img src={secondImage} alt="" loading="lazy" decoding="async"
            className="w-full h-full object-cover" style={{ objectPosition: 'center 45%' }} />
        </div>
      </section>

      {/* CTA */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={s.body}>Ready to discuss your project?</p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/services" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '2px solid var(--bau-black)' }}>About our fees</Link>
            <Link to="/contact" style={s.link}>Get in touch →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
