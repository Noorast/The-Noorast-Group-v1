import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import projectImage from '../../../assets/d349c2e1b0a0adb43813b52e67d9047ecc52f575.png';
import technicalDrawings from '../../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.png';

export function VictorianTerrace() {
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
          <span className="text-xs text-muted-foreground tracking-wider">PROJECT 02</span>
          <h1 className="mt-2 mb-2">Victorian Terrace Extension</h1>
          <p className="text-lg text-muted-foreground">London</p>
          <p className="text-sm text-muted-foreground mt-2">June 2025</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16">
        <div className="max-w-5xl">
          <img 
            src={projectImage} 
            alt="Victorian terrace extension with contemporary rear addition" 
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">PROJECT TYPE</h4>
              <p className="text-sm">Rear extension</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">LOCATION</h4>
              <p className="text-sm">London, conservation area</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">COMPLETED</h4>
              <p className="text-sm">June 2025</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">ADDITIONAL AREA</h4>
              <p className="text-sm">45m²</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="mb-6">Project Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Rear extension to mid-terrace Victorian property within a designated conservation area 
                in London. The project required sensitive design approach balancing heritage considerations 
                with contemporary spatial requirements.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The client sought to improve ground floor living accommodation and establish stronger 
                connections with the rear garden whilst maintaining the character of the existing property.
              </p>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Toolkit Application</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Heritage Considerations</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Toolkit analysis revealed detailed heritage considerations and conservation area 
                    requirements not previously identified by the client. The regulatory module provided 
                    comprehensive overview of local planning policy requirements for development within 
                    the conservation area.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Party Wall Implications</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Assessment identified party wall implications affecting both adjoining properties 
                    within the terrace. The toolkit clarified statutory notice requirements and 
                    recommended early engagement with neighbours regarding proposed works.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Spatial Planning</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Spatial requirements module assisted the client in articulating specific functional 
                    requirements and prioritising competing design objectives. This provided clear 
                    foundation for subsequent architectural design development.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Outcome</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Pre-Application Process</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pre-application advice obtained from local authority informed by comprehensive 
                    brief documentation. Planning officer feedback addressed early in design development, 
                    reducing likelihood of objections at formal application stage.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Neighbour Consultation</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Early identification of party wall requirements enabled proactive neighbour 
                    consultation. This approach fostered positive relationships and avoided potential 
                    disputes during construction phase.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Design Development</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Design development proceeded with clear understanding of constraints and client 
                    requirements. The architect noted that the toolkit provided unusually comprehensive 
                    brief material for a domestic project, facilitating efficient design process.
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
            Section and plan drawings showing integration of new extension with existing building fabric
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
                  Householder planning application · Conservation area · Design and access statement
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Party Wall</h4>
                <p className="text-sm text-muted-foreground">
                  Notices served to adjoining owners · Schedule of condition · Surveyor coordination
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm">Design Services</h4>
                <p className="text-sm text-muted-foreground">
                  Design Stages 0–3 · Planning drawings · Building regulations coordination
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Consultation</h4>
                <p className="text-sm text-muted-foreground">
                  Initial consultation (60 minutes) · Pre-design toolkit assessment
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