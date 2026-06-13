import { Link } from 'react-router';

export function TenderContractorCoordination() {
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
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Design Stage 4-5</span>
          </div>
          <h1 className="mb-12">Tender & Contractor Coordination</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            Management of competitive tendering processes, contractor appointment support, and construction 
            stage coordination ensuring design intent delivery.
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
                Tender and Contractor Coordination services bridge the critical transition between design 
                completion and construction commencement, ensuring competitive procurement, appropriate 
                contractor selection, and effective construction stage management.
              </p>
              <p>
                The service encompasses preparation of tender documentation, management of competitive 
                tendering processes, tender analysis and recommendation, contract administration support, 
                and ongoing construction stage coordination including site inspections and design query resolution.
              </p>
              <p>
                We maintain active involvement during construction to ensure design intent is properly 
                understood and implemented, providing timely responses to contractor queries and undertaking 
                regular site inspections to monitor progress and quality.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-b border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Design Stage 4-5</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">Project dependent</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Tender pack & coordination</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Format</span>
                  <span className="text-right">Documentation & site visits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="max-w-[1440px] mx-auto px-6 pb-32 md:px-12 lg:px-16 border-t border-border pt-32 bg-muted/5">
        <div className="mb-20">
          <h2 className="mb-6">Service Components</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Comprehensive tendering and construction stage coordination services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Tender Documentation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Preparation of comprehensive tender packages including construction drawings, specifications, 
              preliminaries, and tender instructions for competitive pricing.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Tender drawing packages</p>
              <p>• Specification documentation</p>
              <p>• Preliminaries and instructions</p>
              <p>• Contractor prequalification</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Tender Analysis & Recommendation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Detailed analysis of competitive tenders, contractor assessment, and professional recommendation 
              regarding contractor selection and contract award.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Tender return analysis</p>
              <p>• Pricing comparison</p>
              <p>• Contractor assessment</p>
              <p>• Selection recommendations</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Construction Query Resolution</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Ongoing technical support during construction addressing contractor queries, reviewing 
              proposed substitutions, and clarifying design intent.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Technical query responses</p>
              <p>• Design clarifications</p>
              <p>• Material substitution reviews</p>
              <p>• Detail refinements</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Site Inspections</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Regular site visits monitoring construction progress, quality, and compliance with design 
              intent and approved documentation.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Progress monitoring visits</p>
              <p>• Quality inspections</p>
              <p>• Design compliance checks</p>
              <p>• Snagging inspections</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            For tender coordination enquiries, please provide project details, current design status, 
            and anticipated construction commencement timescales.
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
