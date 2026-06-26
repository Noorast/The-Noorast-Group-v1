import { Link } from 'react-router';
import { SEO } from '../components/SEO';

export function Accessibility() {
  return (
    <>
      <SEO
        title="Accessibility · Noorast"
        description="Noorast's commitment to an accessible website, our WCAG 2.1 AA approach, known limitations, and how to report a problem."
        path="/accessibility"
      />

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32 border-b border-border">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">Legal</div>
          <h1 className="mb-6" style={{ fontWeight: 500 }}>Accessibility statement</h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            We want this site to be usable by as many people as possible, including those who rely on assistive technology.
          </p>
          <p className="text-sm text-muted-foreground mt-6">Last reviewed: June 2026</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6" style={{ fontWeight: 500 }}>01, Our standard</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA. These guidelines are the recognised standard for accessible websites and underpin accessibility duties under the Equality Act 2010.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Accessibility is treated as part of the design, not an afterthought. We review it as the site changes rather than only once.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8" style={{ fontWeight: 500 }}>02, What we have done</h2>
          <div className="space-y-0 divide-y divide-border/50">
            {[
              ['Keyboard access', 'Interactive elements can be reached and operated with a keyboard, and focus is shown clearly with a visible outline.'],
              ['Reduced motion', 'Animations are subtle, and we honour the system "reduce motion" setting so content does not move for people who prefer it not to.'],
              ['Readable text', 'Body text uses generous line spacing, and we avoid placing essential information in images alone. Text resizes with your browser settings.'],
              ['Colour and contrast', 'We use a restrained palette and aim for text contrast that meets the AA threshold. The single accent colour is used for emphasis, never as the only way meaning is conveyed. Where you find any text hard to read, please tell us.'],
              ['Labelled forms', 'Form fields have visible labels, and the contact form states clearly what each field is for.'],
              ['Structured pages', 'Pages use real headings in order, descriptive link text, and alt text on meaningful images, so screen readers can move through them sensibly.'],
            ].map(([t, d]) => (
              <div key={t} className="py-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium">{t}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6" style={{ fontWeight: 500 }}>03, Known limitations</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            We are honest about where we are still improving. Some areas we are actively working on:
          </p>
          <ul className="space-y-3">
            {[
              'Some portfolio images are concept visualisations, and their alt text describes the type of study rather than a built place. As real projects are photographed, descriptions will become more specific.',
              'The interactive fee guide and the Property Passport tool are being reviewed against the full AA criteria, and refinements are ongoing.',
              'We have not yet completed a formal third party audit. We intend to commission one as the studio grows.',
            ].map((t, i) => (
              <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                <span className="text-muted-foreground/40 flex-shrink-0">·</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6" style={{ fontWeight: 500 }}>04, Tell us about a problem</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            If you find something difficult to use, or you need information from this site in a different format, please tell us. We take it seriously and will do our best to put it right and to help you directly in the meantime.
          </p>
          <a href="mailto:design@noorast.co.uk?subject=Website%20accessibility"
            style={{ textDecoration: 'none', fontSize: '0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--foreground)', borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px' }}>
            design@noorast.co.uk →
          </a>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-3xl flex flex-wrap items-center justify-between gap-8">
          <p className="text-sm text-muted-foreground">Back to the studio.</p>
          <Link to="/" style={{ textDecoration: 'none', fontSize: '0.625rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--foreground)', borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px' }}>
            Return home →
          </Link>
        </div>
      </section>
    </>
  );
}
