import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import rearExtensionImage from '../../../assets/e947385c703c8e3c623a4d1f62c7deeba551bd6e.png';
import technicalDrawings from '../../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.png';

export function VictorianSemiDetached() {
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
          <span className="text-xs text-muted-foreground tracking-wider">PROJECT 01</span>
          <h1 className="mt-2 mb-2">Victorian Semi-Detached Rear Extension</h1>
          <p className="text-lg text-muted-foreground">London</p>
          <p className="text-sm text-muted-foreground mt-2">March 2025</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16">
        <div className="max-w-5xl">
          <img 
            src={rearExtensionImage} 
            alt="Contemporary white rear extension with timber-framed glazing to Victorian property" 
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">PROJECT TYPE</h4>
              <p className="text-sm">Single-storey rear extension</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">LOCATION</h4>
              <p className="text-sm">London, conservation area</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">COMPLETED</h4>
              <p className="text-sm">March 2025</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">ADDITIONAL AREA</h4>
              <p className="text-sm">38m²</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="mb-6">Project Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Single-storey rear extension to Victorian semi-detached property located within a 
                conservation area. The project required careful consideration of heritage constraints, 
                party wall legislation, and neighbour relationships.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The contemporary design approach balanced respect for the property's heritage character 
                with the client's requirement for contemporary living spaces with strong garden connections.
              </p>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Toolkit Application</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Party Wall Identification</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Toolkit assessment identified critical party wall requirements for works affecting 
                    the shared boundary with the adjoining property. The regulatory module highlighted 
                    the need for statutory notices under the Party Wall Act 1996, which had not been 
                    previously considered by the client.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Site Analysis</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Site analysis module highlighted boundary conditions, overlooking considerations, 
                    and the relationship between existing building fabric and proposed extension. 
                    Assessment established clear spatial priorities and material preferences.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Conservation Area Requirements</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Regulatory assessment clarified conservation area planning requirements and 
                    identified precedent decisions for similar extension proposals within the area. 
                    This informed the design strategy and pre-application consultation approach.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Outcome</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Planning Success</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Successful planning approval achieved following pre-application consultation. 
                    The comprehensive brief documentation prepared through the toolkit process 
                    significantly enhanced client-architect communication from project inception.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Design Development</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Architectural design process commenced with comprehensive understanding of site 
                    constraints, client requirements, and regulatory framework. The architect reported 
                    substantially reduced time required for initial information gathering compared to 
                    typical projects of similar scale.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Party Wall Process</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Party wall procedures successfully completed with adjoining owner consent obtained. 
                    Early identification of these requirements through the toolkit prevented potential 
                    delays to the construction programme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-5xl">
          <h3 className="mb-8">Technical Documentation</h3>
          <img 
            src={technicalDrawings} 
            alt="Technical section and floor plan drawings" 
            className="w-full h-auto"
          />
          <p className="text-xs text-muted-foreground mt-6">
            Section and plan drawings demonstrating spatial relationships and construction approach
          </p>
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
                  Householder planning application · Conservation area · Pre-application consultation
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Party Wall</h4>
                <p className="text-sm text-muted-foreground">
                  Party Structure Notice · Schedule of condition · Party Wall Award
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm">Design Services</h4>
                <p className="text-sm text-muted-foreground">
                  Design Stages 0–4 · Building regulations approval · Construction detailing
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Consultation</h4>
                <p className="text-sm text-muted-foreground">
                  Extended review session (90 minutes) · Pre-design toolkit assessment
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