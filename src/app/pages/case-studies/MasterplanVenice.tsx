import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import veniceImage from '../../../assets/fd485c30db969be36e00beb80f2ac31e3eea017e.png';

export function MasterplanVenice() {
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
          <span className="text-xs text-muted-foreground tracking-wider">PROJECT 04</span>
          <h1 className="mt-2 mb-2">Masterplan Venice Large-Scale Housing</h1>
          <p className="text-lg text-muted-foreground">Venice, Italy</p>
          <p className="text-sm text-muted-foreground mt-2">December 2025</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-24 md:px-12 lg:px-16">
        <div className="max-w-5xl">
          <img 
            src={veniceImage} 
            alt="Large-scale residential masterplan along Venice waterway with contemporary housing blocks" 
            className="w-full h-auto"
          />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">PROJECT TYPE</h4>
              <p className="text-sm">Urban masterplan · Multi-residential</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">LOCATION</h4>
              <p className="text-sm">Venice, Italy · UNESCO heritage site</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">COMPLETED</h4>
              <p className="text-sm">December 2025</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs tracking-wider text-muted-foreground">SCALE</h4>
              <p className="text-sm">Large-scale waterfront development</p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="mb-6">Project Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Large-scale residential masterplan development situated along a historic waterway in Venice, 
                addressing the complex challenge of integrating contemporary housing within a UNESCO World 
                Heritage Site context. The project required rigorous analysis of heritage constraints, urban 
                morphology, and waterfront development regulations.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The design approach balanced respect for Venice's unique architectural character with the 
                requirement for contemporary residential development that responds to present-day housing 
                needs whilst maintaining the city's distinctive relationship between built form and water.
              </p>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Design Intelligence Framework</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Heritage Context Analysis</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Comprehensive assessment of Venice's architectural typologies, material palette, and 
                    urban fabric established the framework for contemporary intervention. Analysis identified 
                    critical heritage considerations including building heights, massing strategies, and 
                    traditional construction methodologies that informed the design approach.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Urban Morphology</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Detailed study of Venice's characteristic urban patterns revealed essential principles 
                    governing the relationship between buildings, water, and public space. This analysis 
                    informed the masterplan's organisational strategy and the articulation of individual 
                    housing blocks within the larger composition.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Waterfront Integration</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Assessment of waterfront development requirements addressed flood risk management, 
                    public access considerations, and the complex regulatory framework governing development 
                    adjacent to Venice's canal network. This established design parameters for building 
                    setbacks, ground floor levels, and water-edge treatment.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Material Strategy</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Material analysis identified contemporary approaches to traditional Venetian construction 
                    materials, balancing authentic heritage response with contemporary performance requirements. 
                    The palette references local stone, brick, and timber whilst employing modern fabrication 
                    and assembly methods.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Design Response</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Architectural Language</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The architectural language employs restrained contemporary forms that reference Venetian 
                    proportions and rhythms without resorting to pastiche. Building massing responds to local 
                    height limits whilst the facade composition acknowledges traditional Venetian fenestration 
                    patterns through a contemporary structural expression.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Public Realm</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Masterplan prioritises pedestrian connectivity and public waterfront access, extending 
                    Venice's characteristic system of campi and calli into the new development. Landscaping 
                    strategy incorporates traditional Venetian garden typologies adapted to contemporary 
                    waterfront conditions.
                  </p>
                </div>

                <div className="border-l-2 border-border pl-6">
                  <h4 className="mb-3">Sustainability Integration</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Contemporary environmental performance requirements addressed through passive design 
                    strategies that build upon traditional Venetian approaches to thermal mass, natural 
                    ventilation, and solar control. Building services integrated discretely to preserve 
                    architectural clarity.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="mb-6">Research Methodology</h3>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This case study demonstrates the application of Pre-Architecture Design Intelligence 
                  principles at urban scale. The research-led approach prioritised comprehensive understanding 
                  of site, context, and regulatory framework before design development commenced.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Methodology involved systematic analysis of heritage designations, precedent studies, 
                  material investigations, and stakeholder requirements. This established a rigorous foundation 
                  for design decision-making that balanced competing priorities and reconciled contemporary 
                  housing needs with heritage preservation obligations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-5xl">
          <h3 className="mb-8">Masterplan Documentation</h3>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1721244653727-02424b850233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZHJhd2luZ3MlMjB1cmJhbiUyMHBsYW5uaW5nJTIwYmx1ZXByaW50fGVufDF8fHx8MTc3MTY1NTI1MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Urban masterplan drawings showing site layout and building configurations"
            className="w-full h-auto"
          />
          <p className="text-xs text-muted-foreground mt-6">
            Masterplan documentation illustrating urban layout, building massing, and waterfront integration strategy
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <h3 className="mb-6">Project Scope</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm">Urban Planning</h4>
                <p className="text-sm text-muted-foreground">
                  Masterplan development · Heritage impact assessment · Urban design approach
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Heritage Considerations</h4>
                <p className="text-sm text-muted-foreground">
                  UNESCO World Heritage Site · Conservation area analysis · Precedent studies
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Regulatory Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Italian planning regulations · Waterfront development controls · Height restrictions
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 text-sm">Design Services</h4>
                <p className="text-sm text-muted-foreground">
                  Conceptual design · 3D visualisation · Material specification
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Research</h4>
                <p className="text-sm text-muted-foreground">
                  Architectural typology analysis · Material investigations · Context studies
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm">Sustainability</h4>
                <p className="text-sm text-muted-foreground">
                  Passive design strategies · Environmental performance · Flood risk management
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <h3 className="mb-6">Design Principles</h3>
          <div className="space-y-6">
            <div className="border-l-2 border-border pl-6">
              <h4 className="mb-3">Contextual Response</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Contemporary architectural language that acknowledges Venetian heritage without resorting 
                to historical pastiche. Building forms, proportions, and material strategies informed by 
                rigorous analysis of local architectural traditions.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <h4 className="mb-3">Urban Continuity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Masterplan extends Venice's characteristic urban patterns into new development. Public 
                spaces, pedestrian routes, and waterfront access maintain continuity with surrounding 
                historic fabric whilst accommodating contemporary residential requirements.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <h4 className="mb-3">Material Authenticity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Material strategy balances reference to traditional Venetian construction with contemporary 
                performance requirements. Authentic materials employed through modern fabrication methods 
                that acknowledge both heritage context and present-day technical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-2xl text-center mx-auto">
          <p className="text-sm text-muted-foreground mb-8">
            Interested in research-led design intelligence for complex architectural projects?
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Discuss Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}