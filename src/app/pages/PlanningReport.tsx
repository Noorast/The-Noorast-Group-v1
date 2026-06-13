import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { STRIPE_PLANNING_REPORT_LINK } from '../../config/stripe';

export function PlanningReport() {
  return (
    <div>
      <SEO
        title="Local Planning Intelligence Report — £9 | Noorast"
        description="Approval probability for your specific property and project type. The 5 nearest comparable planning decisions. Most common refusal reasons at your council. A concrete action plan. £9 + VAT."
        keywords="planning permission approval chances UK, planning decision history postcode, will my extension get planning permission, planning refusal reasons UK council"
      />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32">
        <div className="max-w-4xl">
          <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-6">Intelligence Products · £9 + VAT</div>
          <h1 className="mb-12">Local Planning<br className="hidden md:block" /> Intelligence Report</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            Before you brief an architect, know exactly what your council approves and refuses — for your project type, on your street.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16 border-t border-border pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="mb-8">17,600 planning applications are refused every year.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Most of those refusals were foreseeable. The same refusal reasons appear repeatedly at each council: overlooking, overshadowing, out-of-character design, boundary distances, design precedent. The data is public. Most homeowners never look at it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A typical refused application costs the homeowner £3,000–£6,000 in wasted architect fees, months of delay, and in many cases a complete redesign from scratch.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ten minutes of research before commissioning any design work can tell you whether your idea has precedent nearby, whether similar proposals have been refused, and whether the council you're dealing with is permissive or strict. That research costs £9.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { n: '17,600', label: 'Householder applications refused per year in England' },
              { n: '£3–6k', label: 'Typical cost of a refused application in wasted architect fees' },
              { n: '240', label: 'UK councils with searchable planning decision data' },
              { n: '£9', label: 'Cost of knowing your odds before you commission anyone' },
            ].map(s => (
              <div key={s.n} className="flex gap-6 items-baseline border-b border-border/30 pb-6 last:border-0">
                <span className="text-3xl font-light text-foreground min-w-[80px]">{s.n}</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's in the report */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16 border-t border-border pt-24 bg-muted/5">
        <div className="mb-16">
          <h2 className="mb-6">What's in the report</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            A personalised planning intelligence report generated from real government planning data for your specific postcode and project type.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
          {[
            {
              n: '01',
              title: 'Approval probability',
              desc: 'A personalised approval probability for your specific property and project type, based on real recent decisions nearby.',
            },
            {
              n: '02',
              title: 'Nearest comparable decisions',
              desc: 'The 5 most comparable planning decisions within 500m — approved and refused — for your project type.',
            },
            {
              n: '03',
              title: 'Refusal pattern analysis',
              desc: "The most common refusal reasons at your council for your project type, drawn from the last 3 years of decisions.",
            },
            {
              n: '04',
              title: 'Concrete action plan',
              desc: "Specific steps to improve your approval chances before briefing a designer — based on what the data shows.",
            },
          ].map(item => (
            <div key={item.n} className="bg-background p-8">
              <div className="text-4xl font-light text-muted-foreground/30 mb-6">{item.n}</div>
              <h3 className="text-base mb-4">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Purchase */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16 border-t border-border pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="mb-8">Get your report</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Delivered within 24 hours of purchase. Postcode-specific, project-specific, council-specific. Generated from government planning portal data — not guesswork.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'Immediate payment — report delivered within 24 hours',
                'PDF format — shareable with an architect or planner',
                'Specific to your postcode and project type',
                'Data drawn from government planning portals',
                'Includes action plan with specific design guidance',
              ].map(f => (
                <div key={f} className="flex gap-3 items-start">
                  <span className="text-muted-foreground/40 mt-0.5">—</span>
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border p-8">
            <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Local Planning Intelligence Report</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-light tracking-tight">£9</span>
              <span className="text-sm text-muted-foreground">+ VAT</span>
            </div>
            <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
              One-time purchase. Delivered within 24 hours. Specific to your postcode and project type.
            </p>
            <a
              href={STRIPE_PLANNING_REPORT_LINK}
              className="block w-full text-center px-6 py-4 bg-foreground text-background text-xs tracking-[0.12em] uppercase hover:bg-foreground/85 transition-colors mb-4"
              style={{ textDecoration: 'none' }}
            >
              Get my report — £9 + VAT
            </a>
            <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
              After payment you'll be asked to provide your postcode and project type. Report delivered within 24 hours.
            </p>
            <div className="mt-6 pt-6 border-t border-border/40">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">Or get it free</strong> with the £97 Intelligence Toolkit, which includes this report alongside the full Property Passport workbook, AI assistant, and planning constraint lookup.
              </p>
              <Link to="/contact" className="inline-block mt-3 text-[10px] tracking-[0.12em] uppercase border-b border-foreground/30 pb-0.5 hover:border-foreground/40 transition-colors">
                View the Toolkit →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
