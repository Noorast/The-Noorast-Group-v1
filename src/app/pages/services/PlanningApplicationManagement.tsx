import { Link } from 'react-router';

export function PlanningApplicationManagement() {
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
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Design Stage 2-3</span>
          </div>
          <h1 className="mb-12">Full Planning Application Management</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            Planning applications get refused for two reasons: the scheme is wrong, or the submission is wrong. We ensure neither.
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
                A planning application is the moment when months of design work is assessed against policy, and a planning officer decides whether it stands. Most residential applications are straightforward. Some are not. We know the difference.
              </p>
              <p>
                Before submission, we read the relevant policies, check the planning history of comparable properties in the area, and identify likely officer concerns. We design the application to address those concerns directly — not after refusal, but before submission.
              </p>
              <p>
                During the determination period we monitor the application, respond to case officer queries, and address consultee objections where they raise material planning considerations. An eight-week determination should not take longer than it needs to.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-b border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Design Stage 2-3</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">8–13 weeks</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Complete application</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Format</span>
                  <span className="text-right">Digital submission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="max-w-[1440px] mx-auto px-6 pb-32 md:px-12 lg:px-16 border-t border-border pt-32 bg-muted/5">
        <div className="mb-20">
          <h2 className="mb-6">Application Components</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Comprehensive planning application documentation and management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Planning Drawings Package</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Plans, elevations, sections, location plan, block plan — drawn accurately, to scale, and to the standard that makes a case officer's job straightforward. Poor drawings generate queries. Good drawings get approved faster.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Location and block plans</p>
              <p>• Existing and proposed drawings</p>
              <p>• Floor plans, elevations, sections</p>
              <p>• Context and street scene drawings</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Design & Access Statement</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The Design and Access Statement is not a formality. It is the written argument for the scheme — why the design responds to the site, how it complies with the relevant policies, and what the planning officer should give weight to. We write it to be read.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Context appraisal</p>
              <p>• Design evolution</p>
              <p>• Policy compliance demonstration</p>
              <p>• Access arrangements</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Supporting Documentation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Conservation area applications require a heritage statement. Listed building applications require listed building consent. Applications near TPO trees require arboricultural assessment. We identify what is needed and coordinate the production of it.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Heritage statements</p>
              <p>• Planning statements</p>
              <p>• Specialist reports coordination</p>
              <p>• Supporting visualisations</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Authority Liaison & Management</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Neighbour objections are common. Most do not raise valid planning grounds. Where they do, we respond with evidence. Where the case officer identifies a genuine concern, we address it — by amendment if necessary, by argument if not.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Case officer liaison</p>
              <p>• Query responses</p>
              <p>• Consultee comment management</p>
              <p>• Amendment negotiations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Tell us the address, what you want to build, and whether you have been refused before. We'll tell you what we think the application prospects are.
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
