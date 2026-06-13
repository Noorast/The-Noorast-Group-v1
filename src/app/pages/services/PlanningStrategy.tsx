import { Link } from 'react-router';

export function PlanningStrategy() {
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
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Design Stage 0-1</span>
          </div>
          <h1 className="mb-12">Planning Strategy & Permitted Development Review</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            Before you design anything, you need to know what the planning system will allow. That is a question with a specific answer — one that depends on your dwelling type, your planning history, and your local authority.
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
                The planning question most homeowners ask is the wrong one. "Can I get planning permission?" is less useful than "What will the planning authority approve, at what scale, and with what probability?" The second question has an evidence-based answer.
              </p>
              <p>
                We read the GPDO against the specific characteristics of your property. We check whether PD rights are intact or have been removed by condition. We look at the planning history of comparable properties in your street. Where a pre-application meeting with the planning authority would add value, we arrange and lead it.
              </p>
              <p>
                The output is a clear planning strategy: what route to use, what the design will need to demonstrate, and what the realistic prospects of consent are. Before a single drawing is produced.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Design Stage 0-1</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">1–3 weeks</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Strategy report</span>
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
          <h2 className="mb-6">Strategy Components</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Comprehensive planning strategy assessment across four principal areas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Permitted Development Assessment</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Detailed evaluation of permitted development rights under current legislation, identifying whether 
              proposed works can proceed without full planning permission.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• GPDO compliance assessment</p>
              <p>• Article 4 direction verification</p>
              <p>• Prior approval requirements</p>
              <p>• Permitted development limitations</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Policy Compliance Review</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Assessment of proposed development against local and national planning policy frameworks, 
              identifying areas of compliance and potential policy challenges.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Local plan policy analysis</p>
              <p>• Design guide compliance</p>
              <p>• Conservation area considerations</p>
              <p>• Supplementary planning documents</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Pre-Application Advice Coordination</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Management of pre-application consultation processes with local planning authorities to secure 
              formal guidance on development proposals.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Pre-app submission preparation</p>
              <p>• Authority coordination</p>
              <p>• Feedback documentation</p>
              <p>• Design refinement guidance</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Application Route Strategy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Strategic recommendations on optimal application routes, submission timing, and supporting 
              documentation requirements for maximum approval probability.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Application type recommendation</p>
              <p>• Submission timing strategy</p>
              <p>• Supporting documentation requirements</p>
              <p>• Risk mitigation measures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            For planning strategy enquiries, please provide project address, description of proposed works, 
            and any planning concerns or previous planning history.
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
