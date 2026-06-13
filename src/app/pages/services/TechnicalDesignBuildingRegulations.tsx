import { Link } from 'react-router';

export function TechnicalDesignBuildingRegulations() {
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
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Design Stage 4</span>
          </div>
          <h1 className="mb-12">Technical Design & Building Regulations Packages</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            The drawings a contractor builds from. Complete, accurate, and specific enough that there are no ambiguities on site.
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
                Planning permission is permission to build in principle. Building regulations approval is confirmation that what you are building is safe, thermally adequate, structurally sound, and accessible. Stage 4 is where the approved design becomes a set of drawings precise enough to price and construct.
              </p>
              <p>
                Every junction detailed. Every structural element sized and positioned. U-values calculated and specified. Fire safety provisions confirmed. Services routes coordinated. The gap between a planning approval and a contractor's quote is the completeness of the technical design. Incomplete information generates expensive variations on site.
              </p>
              <p>
                Building regulations submission is made under either the Full Plans or Building Notice route. For any project of meaningful complexity, Full Plans is the right choice — it identifies compliance issues before construction begins, not during.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-b border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Design Stage 4</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">4–8 weeks</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Technical package</span>
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
          <h2 className="mb-6">Technical Package Components</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Comprehensive construction information addressing all aspects of building delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Technical Drawings</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Detailed construction drawings including dimensioned plans, elevations, sections, and 
              construction details providing complete information for on-site construction.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Construction plans and sections</p>
              <p>• Construction details</p>
              <p>• Foundation and drainage layouts</p>
              <p>• Roof construction drawings</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Building Regulations Submission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Complete building regulations application including compliance documentation, technical 
              specifications, and coordination with building control authorities.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Regulations drawings</p>
              <p>• Compliance calculations</p>
              <p>• SAP assessments coordination</p>
              <p>• Building control liaison</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Construction Specifications</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Written specifications detailing materials, workmanship standards, and performance 
              requirements complementing technical drawings.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Materials specifications</p>
              <p>• Workmanship standards</p>
              <p>• Performance requirements</p>
              <p>• Product selections</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Consultant Coordination</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Integration of structural engineer and specialist consultant information into coordinated 
              construction information packages.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Structural engineer coordination</p>
              <p>• Services engineer liaison</p>
              <p>• Information integration</p>
              <p>• Coordination reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            For technical design enquiries, please provide project address, description of works, 
            and current project status including planning permission details if applicable.
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
