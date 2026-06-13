import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import modernExtensionImage from '../../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.png';

export function ContemporaryConcreteExtension() {
  return (
    <div>
      <section className="max-w-[1440px] mx-auto px-6 py-12 md:px-12 lg:px-16">
        <Link 
          to="/project" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Project
        </Link>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-16 md:px-12 lg:px-16">
        <div className="max-w-4xl">
          <span className="text-xs text-muted-foreground tracking-wider">PROJECT 03</span>
          <h1 className="mt-2 mb-2">Contemporary Concrete Extension</h1>
          <p className="text-lg text-muted-foreground">South East</p>
          <p className="text-sm text-muted-foreground mt-2">September 2025</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16">
        <div className="max-w-5xl">
          <img 
            src={modernExtensionImage} 
            alt="Modern concrete and glass extension to Victorian brick property" 
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">PROJECT TYPE</h4>
              <p className="text-sm">Multi-storey rear extension</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">LOCATION</h4>
              <p className="text-sm">South East England, heritage area</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">COMPLETED</h4>
              <p className="text-sm">September 2025</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">ADDITIONAL AREA</h4>
              <p className="text-sm">62m²</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="mb-6">Project Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Multi-storey rear extension to Victorian brick property within a heritage-sensitive area. 
                The project required careful integration of contemporary architectural language with 
                existing traditional building fabric, addressing complex structural considerations and 
                planning constraints.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The design strategy employed board-marked concrete and large-scale glazing to create 
                a deliberate contrast with the Victorian host building, establishing clear architectural 
                hierarchy while respecting the heritage context through careful massing and material selection.
              </p>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Toolkit Application</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Heritage Context Assessment</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Toolkit regulatory module identified the heritage-sensitive nature of the site location, 
                    prompting detailed research into local planning policy regarding contemporary interventions 
                    within historic contexts. Assessment framework enabled systematic evaluation of design 
                    approach precedents within the local authority area.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Structural Requirements</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Site analysis module highlighted foundation conditions and structural coordination 
                    requirements for the multi-storey addition. Early identification of structural 
                    constraints enabled client understanding of likely engineering consultant requirements 
                    and associated cost implications.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Material Strategy Development</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Design preferences assessment clarified client expectations regarding architectural 
                    expression and material quality. The toolkit process established clear parameters 
                    for contemporary material selection in relation to heritage fabric, informing the 
                    specification of exposed concrete and precision glazing systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Design Approach</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Material Expression</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Board-marked concrete finish specification responds to both aesthetic and technical 
                    requirements, providing thermal mass benefits while establishing material honesty in 
                    the architectural language. Timber formwork texture creates visual refinement 
                    appropriate to the domestic scale.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Heritage Integration</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Deliberate architectural contrast strategy maintains respect for the Victorian host 
                    building through clear differentiation rather than pastiche. Massing setbacks and 
                    material transitions establish legible architectural hierarchy between historic and 
                    contemporary elements.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Spatial Quality</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Large-scale glazing systems provide strong garden connectivity at ground level while 
                    balcony cantilever creates intermediate external space. Upper floor positioning 
                    optimises natural light penetration to interior spaces while maintaining neighbour 
                    privacy considerations.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Outcome</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Planning Approval</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Planning consent achieved following comprehensive pre-application consultation and 
                    submission of detailed design justification. Heritage officer feedback confirmed 
                    appropriate design approach for contemporary intervention within sensitive context.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Technical Coordination</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Building regulations approval secured with coordinated structural engineer and 
                    thermal performance calculations. Toolkit preparation significantly reduced initial 
                    information gathering phase, enabling efficient progression to technical design stage.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Client Understanding</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comprehensive toolkit assessment process enabled client to develop sophisticated 
                    understanding of architectural design considerations prior to commission. This 
                    facilitated more effective dialogue during design development and reduced requirement 
                    for extensive revisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <h3 className="mb-6">Project Scope</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm">Planning</h4>
                <p className="text-sm text-muted-foreground">
                  Full planning application · Heritage area · Pre-application consultation · Design justification
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Structural</h4>
                <p className="text-sm text-muted-foreground">
                  Structural engineer coordination · Foundation design · Steel frame specification
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm">Design Services</h4>
                <p className="text-sm text-muted-foreground">
                  Design Stages 0–4 · Building regulations · Technical specifications · Material specification
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Consultation</h4>
                <p className="text-sm text-muted-foreground">
                  Extended review session (90 minutes) · Pre-design toolkit assessment · Heritage consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-sm text-muted-foreground mb-8">
            Interested in understanding your project requirements before engaging architectural services?
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Explore the Toolkit
          </Link>
        </div>
      </section>
    </div>
  );
}