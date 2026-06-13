import { Link } from 'react-router';

export function PreArchitectureFeasibility() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32">
        <div className="max-w-4xl">
          <div className="mb-6">
            <Link 
              to="/services" 
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <span>←</span> Back to Services
            </Link>
          </div>
          <div className="mb-8">
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Design Stage 0</span>
          </div>
          <h1 className="mb-12">Pre-Architecture Feasibility Assessment</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            What can the site accommodate? What will planning approve? What are the legal constraints? These questions have answers — and they should be found before any design work begins.
          </p>
        </div>
      </section>

      {/* Service Overview */}
      <section className="max-w-[1440px] mx-auto px-6 pb-32 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-8">
            <h2 className="mb-8">Service Overview</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Most residential projects go wrong because the wrong assumptions were made at the start. The planning constraint that was never checked. The restrictive covenant on the title that nobody read. The drainage run under the proposed footprint that only emerged during construction.
              </p>
              <p>
                Feasibility work maps all of it before design begins. Planning history, permitted development status, legal encumbrances, site constraints, structural considerations, and preliminary cost assessment. The output is a clear picture of what the project can be — and what stands in the way.
              </p>
              <p>
                Undertaken as a standalone service or as the opening stage of a full architectural commission. Either way, it produces the foundation that every subsequent decision is built on.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-b border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Design Stage 0</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">1–2 weeks</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Feasibility report</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Format</span>
                  <span className="text-right">Digital documentation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="max-w-[1440px] mx-auto px-6 pb-32 md:px-12 lg:px-16 border-t border-border pt-32 bg-muted/5">
        <div className="mb-20">
          <h2 className="mb-6">Assessment Components</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Structured analysis across four principal areas of feasibility investigation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Site Analysis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Measurements, boundary verification, drainage layout, utility positions, access for construction, tree surveys where relevant. The physical reality of the site as it is.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Site surveys and measurements</p>
              <p>• Boundary and ownership verification</p>
              <p>• Context and character analysis</p>
              <p>• Services and utilities assessment</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Constraint Mapping</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Full planning history research. Permitted development limits by dwelling type. Conservation area and Article 4 status. Flood risk. Title register review for restrictive covenants and easements. TPO trees. Every constraint that will shape the design.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Planning designations review</p>
              <p>• Conservation and heritage constraints</p>
              <p>• Easements and covenants</p>
              <p>• Technical and environmental factors</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Viability Studies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              What the project can realistically achieve, at what cost, and with what probability of planning consent. Not optimism — analysis.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Development options analysis</p>
              <p>• Planning probability assessment</p>
              <p>• Preliminary cost implications</p>
              <p>• Risk identification</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Strategic Brief Development</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              A brief that reflects what the client wants and what the constraints will allow. The document that makes the first design meeting productive.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Requirements capture</p>
              <p>• Opportunities and constraints synthesis</p>
              <p>• Strategic recommendations</p>
              <p>• Project brief documentation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="mb-20">
          <h2 className="mb-6">Service Process</h2>
        </div>

        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Week 1</span>
            </div>
            <div className="lg:col-span-10 border-l-2 border-border pl-8">
              <h4 className="mb-3">Initial Assessment & Data Gathering</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Site visit, measurement survey, desk-based research, planning policy review, and constraint identification.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Week 2</span>
            </div>
            <div className="lg:col-span-10 border-l-2 border-border pl-8">
              <h4 className="mb-3">Analysis & Report Preparation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Viability analysis, options assessment, strategic brief development, and comprehensive feasibility report production.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Conclusion</span>
            </div>
            <div className="lg:col-span-10 border-l-2 border-border pl-8">
              <h4 className="mb-3">Findings Presentation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Structured presentation of findings, recommendations discussion, and strategic next steps confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Tell us your address, what you want to build, and where you are in the process. We'll take it from there.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-12 py-4 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Contact us
            <span className="text-lg transition-transform duration-300">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
