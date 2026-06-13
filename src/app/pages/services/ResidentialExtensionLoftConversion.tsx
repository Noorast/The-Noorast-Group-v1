import { Link } from 'react-router';

export function ResidentialExtensionLoftConversion() {
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
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Design Stage 2-4</span>
          </div>
          <h1 className="mb-12">Residential Extension & Loft Conversion Design</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            Extensions and loft conversions make up the majority of UK residential architecture. Done well, they transform houses. Done poorly, they create problems that last the life of the building.
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
                Extensions are not straightforward. Every project involves an existing building with its own structural arrangement, planning history, and legal context. What can be built under permitted development. Whether the 45-degree rule passes. Whether the neighbour's habitable room window is affected. Whether there is a drain under the proposed footprint.
              </p>
              <p>
                We begin every extension project with a measured survey and constraint review. We do not begin designing until we know what the site will accommodate, what planning will approve, and whether the legal position is clear. This is not caution — it is how projects avoid abortive work.
              </p>
              <p>
                Rear extensions, side extensions, loft conversions with dormers, wraparounds. Each project type has its own planning considerations, structural approach, and typical cost range. We work across all of them, on pre-war and post-war houses, in conservation areas and standard residential streets.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-b border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Design Stage 2-4</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">8–16 weeks</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Full design package</span>
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

      {/* Extension Types */}
      <section className="max-w-[1440px] mx-auto px-6 pb-32 md:px-12 lg:px-16 border-t border-border pt-32 bg-muted/5">
        <div className="mb-20">
          <h2 className="mb-6">Extension Typologies</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Specialist design services across principal residential extension types
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Rear Extensions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Single and double-storey rear extensions providing additional ground floor and first floor 
              accommodation with careful consideration of neighbour amenity and garden relationships.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Single-storey extensions</p>
              <p>• Two-storey extensions</p>
              <p>• Kitchen and living space extensions</p>
              <p>• Light and glazing strategies</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Loft Conversions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Roofspace conversions creating additional bedroom and bathroom accommodation within existing 
              dwelling envelope, including dormer and mansard roof alterations.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Rear dormers</p>
              <p>• Hip-to-gable conversions</p>
              <p>• Mansard roofs</p>
              <p>• Structural and staircase design</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Side & Wraparound Extensions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Side extensions and wraparound configurations maximising available site area whilst respecting 
              street scene character and maintaining adequate separation distances.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Single-storey side extensions</p>
              <p>• Two-storey side additions</p>
              <p>• Wraparound configurations</p>
              <p>• Street scene integration</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Basement Excavations</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Basement construction beneath existing dwellings creating additional accommodation with 
              careful consideration of structural, waterproofing, and party wall implications.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Under-house excavations</p>
              <p>• Structural design coordination</p>
              <p>• Waterproofing strategies</p>
              <p>• Party wall considerations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            For extension or loft conversion enquiries, please provide property address, existing dwelling type, 
            and description of additional accommodation requirements.
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
