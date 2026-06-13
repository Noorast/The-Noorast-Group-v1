import { Link } from 'react-router';

export function WhatWeDo() {
  return (
    <div>
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">What we do</div>
          <h1 className="mb-10">Residential architecture, done thoroughly.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Two things: we design residential projects, and we give homeowners the knowledge
            to prepare for that process properly. Both require the same rigour.
          </p>
        </div>
      </section>

      {/* Architectural Design */}
      <section className="max-w-[1440px] mx-auto px-6 py-20 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-2xl mb-16">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">01</div>
          <h2 className="mb-6">Architectural Design Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            We work to Design Stages 0–4 under the RIBA Plan of Work. Residential only.
            Extensions, loft conversions, new builds. Our work begins before a line is drawn
            and ends with a complete set of technical drawings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border/50">
          {[
            {
              stage: 'Stage 0–1',
              title: 'Strategic Definition & Briefing',
              body: 'Constraint identification, planning history research, permitted development assessment, legal review, site appraisal, and brief development. This stage determines what the project can be before committing to what it should be.',
              link: '/services/pre-architecture-feasibility',
            },
            {
              stage: 'Stage 2',
              title: 'Concept Design',
              body: 'The first design response to the brief. Spatial arrangement, relationship to the existing building, planning strategy, and design intent established at a scale that shows how the project will feel to live in.',
              link: '/services/concept-spatial-design',
            },
            {
              stage: 'Stage 3',
              title: 'Spatial Coordination & Planning',
              body: 'Developed design, coordinated with structure. Planning application drawings, Design and Access Statement, and pre-application strategy. We write the planning application as well as draw it.',
              link: '/services/planning-application-management',
            },
            {
              stage: 'Stage 4',
              title: 'Technical Design',
              body: 'Construction information, building regulations drawings, materials specification, and structural coordination. Complete, accurate, and buildable. A contractor should be able to price and build from these drawings without additional information.',
              link: '/services/technical-design-building-regulations',
            },
          ].map((item, i) => (
            <div key={item.stage} className={`p-10 ${i % 2 === 0 ? 'border-r border-border/50' : ''} ${i < 2 ? 'border-b border-border/50' : ''}`}>
              <div className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground/50 mb-3">{item.stage}</div>
              <h3 className="text-base mb-4 font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.body}</p>
              <Link to={item.link} className="text-[10px] tracking-[0.12em] uppercase border-b border-foreground/30 pb-0.5 hover:border-foreground/40 transition-colors">
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Architecture Intelligence */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-2xl mb-16">
          <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">02</div>
          <h2 className="mb-6">Pre-Architecture Intelligence</h2>
          <p className="text-muted-foreground leading-relaxed">
            Before design begins, there is a body of intelligence that determines what the design
            can be. Planning constraints, legal encumbrances, site conditions, spatial benchmarks,
            cost realities. Most homeowners arrive at the architect's office without it.
            The Property Passport is a structured way to gather it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40">
          {[
            {
              title: 'Property Passport',
              body: 'Twelve sections covering planning, legal, site, environmental, spatial, and financial intelligence. Complete it before appointing an architect. It becomes the most useful document in your project.',
              link: '/toolkit/property-passport',
              cta: 'Start your Passport',
            },
            {
              title: 'Noorast AI',
              body: 'A planning and architecture assistant that knows every GPDO threshold, every relevant planning policy, and the specific constraints of UK residential development. Built into the Property Passport. Gives precise answers.',
              link: '/toolkit/property-passport',
              cta: 'Access via Passport',
            },
            {
              title: 'Design Intelligence Toolkit',
              body: 'The knowledge that architects accumulate over years — about planning, spatial design, materials, structure, and cost — compiled for homeowners in the format most useful before a project begins.',
              link: '/toolkit',
              cta: 'View toolkit',
            },
          ].map(item => (
            <div key={item.title} className="bg-background p-10">
              <h3 className="text-base mb-4 font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.body}</p>
              <Link to={item.link} className="text-[10px] tracking-[0.12em] uppercase border-b border-foreground/30 pb-0.5 hover:border-foreground/40 transition-colors">
                {item.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* The point */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {[
            {
              num: '01',
              title: 'Analysis',
              body: 'What the site allows. What the planning system will accept. What the legal position is. What it will cost. These are facts, not opinions — and they are discoverable before design begins.',
            },
            {
              num: '02',
              title: 'Design',
              body: 'Architecture that responds to the constraints it was given. Not despite them — through them. The best residential work we know was designed within tight constraints by people who understood them precisely.',
            },
            {
              num: '03',
              title: 'Delivery',
              body: 'Complete technical information. Accurate specification. Drawings that a contractor can build from. The gap between planning approval and a built building is the technical design stage. It is where quality is determined.',
            },
          ].map(item => (
            <div key={item.num}>
              <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 mb-4">{item.num}</div>
              <h3 className="text-base mb-4 font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
