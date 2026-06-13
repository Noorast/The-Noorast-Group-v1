import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { STRIPE_CONSULTATION_LINK } from '../../config/stripe';

export function PrePurchase() {
  return (
    <div>
      <SEO
        title="Pre-Purchase Extension Report — £197 | Noorast"
        description="Buying a house to extend? Know before exchange: title covenants, planning history, permitted development status, Article 4 directions, and structural feasibility. £197 + VAT."
        keywords="pre-purchase extension check UK, can I extend this house, planning permission before buying, house extension potential report, title covenant check before buying"
      />

      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32">
        <div className="max-w-4xl">
          <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-6">Intelligence Products · £197 + VAT</div>
          <h1 className="mb-12">Pre-Purchase<br className="hidden md:block" /> Extension Report</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            You're buying a house to extend. Before you exchange, know exactly what the planning system, title register, and site conditions will and won't allow.
          </p>
        </div>
      </section>

      {/* Who this is for */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16 border-t border-border pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="mb-8">Buying a property specifically because you want to extend it is the riskiest decision most homeowners make.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You're making a decision of hundreds of thousands of pounds based on an assumption — that the extension you're imagining is actually possible. Most buyers never verify that assumption before exchange.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The information that would tell you whether your extension is feasible is publicly available. Title register: £3 from the Land Registry. Planning history: free on the council's portal. Article 4 Direction: free, 10-minute check. Permitted development status: can be established in an afternoon.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do all of this for you, interpret what it means for your specific project, and deliver a clear report before you exchange contracts — when you can still walk away, renegotiate, or plan properly.
            </p>
          </div>
          <div>
            <div className="border border-border p-8 mb-6">
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-4">A typical scenario we see</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Buyers purchase a 1968 semi-detached. Side garden, plenty of space. Mentally they've already designed the two-storey extension. They commission an architect after moving in.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The architect reviews the title and finds a covenant from 1968 prohibiting any structure within 2 metres of the south-east boundary. The planned extension extends to within 1 metre.
              </p>
              <p className="text-sm text-foreground leading-relaxed font-light">
                Cost to resolve: £19,100. All of it avoidable with a £3 title register read before exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16 border-t border-border pt-24 bg-muted/5">
        <div className="mb-16">
          <h2 className="mb-6">What the report covers</h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Six dimensions of extension feasibility, established before you commit to the purchase.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
          {[
            {
              n: '01',
              title: 'Title register analysis',
              desc: 'Section A (property description), Section B (ownership and charges), Section C (restrictive covenants, easements, rights of way) — interpreted in plain English with specific implications for your project.',
            },
            {
              n: '02',
              title: 'Planning history',
              desc: 'Previous planning applications, decisions, conditions, and refusals on the specific property — including any conditions that remove permitted development rights.',
            },
            {
              n: '03',
              title: 'Permitted development status',
              desc: 'Whether PD rights are intact, reduced, or removed — and what extensions you can build without planning permission right now.',
            },
            {
              n: '04',
              title: 'Article 4 and conservation area check',
              desc: "Whether the property sits within an Article 4 Direction area, conservation area, flood zone, or other overlay that affects what you can build.",
            },
            {
              n: '05',
              title: 'Local planning intelligence',
              desc: "What's been approved and refused for similar projects within 500m. Whether the principle of your extension type is established or untested.",
            },
            {
              n: '06',
              title: 'Structural and site flags',
              desc: 'Property type, construction era, and any publicly visible structural constraints that could affect extension feasibility or cost.',
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
            <h2 className="mb-8">Commission your report</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The report is delivered before exchange — typically within 3–5 working days of commissioning. It includes a written summary of all six dimensions, a plain-English risk assessment, and a 30-minute call to discuss findings and next steps.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'Written report across all six dimensions',
                'Plain-English risk assessment — what to proceed on, what to negotiate, what to walk away from',
                '30-minute findings call with Noorast',
                'Delivered within 3–5 working days',
                'Applies against full Toolkit or Design Services fees if you proceed',
              ].map(f => (
                <div key={f} className="flex gap-3 items-start">
                  <span className="text-muted-foreground/40 mt-0.5">—</span>
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="border border-border/40 p-5 bg-muted/10">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">Important:</strong> This report is for due diligence purposes. It does not constitute legal advice. You should have your solicitor review the title register as part of the standard conveyancing process. The Noorast report gives you the spatial and planning interpretation — your solicitor handles the legal position.
              </p>
            </div>
          </div>
          <div className="border border-border p-8">
            <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Pre-Purchase Extension Report</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-light tracking-tight">£197</span>
              <span className="text-sm text-muted-foreground">+ VAT</span>
            </div>
            <p className="text-xs text-muted-foreground mb-8 leading-relaxed">
              One-time fee. Written report + 30-minute call. Delivered within 3–5 working days.
            </p>
            <a
              href={STRIPE_CONSULTATION_LINK}
              className="block w-full text-center px-6 py-4 bg-foreground text-background text-xs tracking-[0.12em] uppercase hover:bg-foreground/85 transition-colors mb-4"
              style={{ textDecoration: 'none' }}
            >
              Commission report — £197 + VAT
            </a>
            <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
              After payment you'll receive a short briefing form to complete. We'll confirm within one working day.
            </p>
            <div className="mt-6 pt-6 border-t border-border/40 space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-medium">Already bought?</strong> The Property Passport walks you through all six of these checks as a self-serve tool — free.
              </p>
              <Link to="/contact" className="inline-block text-[10px] tracking-[0.12em] uppercase border-b border-foreground/30 pb-0.5 hover:border-foreground/40 transition-colors">
                Start Property Passport — free →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
