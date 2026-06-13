import { Link } from 'react-router';

export function ConceptSpatialDesign() {
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
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Design Stage 2</span>
          </div>
          <h1 className="mb-12">Concept & Spatial Design</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            The design stage where the project takes shape. Floor plans that actually work. Spaces that earn their area. A scheme that a planning officer can approve and a contractor can build.
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
                Stage 2 is where the design is made. The layout of rooms. The height of ceilings. The position of windows and what they look at. The relationship between the extension and the garden, between the old part of the house and the new.
              </p>
              <p>
                Most of the decisions that determine whether a project succeeds are made at Stage 2. By the time the planning application is submitted, the footprint, the height, the spatial arrangement, and the material character are all committed. Changing any of them after planning approval is expensive.
              </p>
              <p>
                Stage 2 concludes with drawings ready for planning submission and a brief clear enough to develop further. We do not present one option and ask for approval. We explain what we designed and why.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-b border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Design Stage 2</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">3–6 weeks</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Concept drawings</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Format</span>
                  <span className="text-right">Digital & presentation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="max-w-[1440px] mx-auto px-6 pb-32 md:px-12 lg:px-16 border-t border-border pt-32 bg-muted/5">
        <div className="mb-20">
          <h2 className="mb-6">Design Development</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Structured design exploration across four principal considerations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Spatial Planning Studies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              How the rooms connect. How people move through the house. Where natural light enters and at what time of day. Whether the dining table fits next to the kitchen without the door hitting a chair. Spatial design is these decisions, made precisely.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Layout options exploration</p>
              <p>• Circulation and flow analysis</p>
              <p>• Spatial relationships</p>
              <p>• Functional zoning</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Form & Massing Development</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              What the extension looks like from the street, from the garden, from the neighbouring property. Whether its height is right relative to the existing house. Whether its form makes sense in the context of the street it's on.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Massing studies</p>
              <p>• Contextual response</p>
              <p>• Roofscape consideration</p>
              <p>• Scale and proportion</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Material Strategies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Material choice affects planning consent, construction cost, maintenance, and how a building ages. Brick, render, timber, zinc — each has different planning implications, different costs, different lifespans. We specify on the basis of all four.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Material palette development</p>
              <p>• Contextual material analysis</p>
              <p>• Construction approach</p>
              <p>• Detailing principles</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Design Option Analysis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Where there is a genuine choice — between two layouts, two structural approaches, two material strategies — we present the options with the implications of each clearly stated. Not a preference list. An informed decision.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Options comparison</p>
              <p>• Performance evaluation</p>
              <p>• Cost implications</p>
              <p>• Recommendation development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Send us the address and what you are trying to build. If you have completed a Property Passport, attach it.
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
