import { Link } from 'react-router';

export function PlanningRefusalAppealStrategy() {
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
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Post-Decision</span>
          </div>
          <h1 className="mb-12">Planning Refusal & Appeal Strategy</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            A refusal is information. Read correctly, it tells you what needs to change — or whether the officer got it wrong.
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
                Most residential planning refusals are recoverable. The reasons for refusal identify, with precision, what the planning officer found unacceptable. Some reasons are remediable by design amendment. Some are matters of policy interpretation where a Planning Inspector might disagree.
              </p>
              <p>
                We read every refusal the same way: what policy is cited, whether it has been correctly applied, whether the officer's assessment is consistent with comparable decisions in the same authority, and what a revised scheme would need to look like to succeed.
              </p>
              <p>
                Where the refusal is on policy grounds and the officer's assessment is sound, we redesign. Where the refusal involves a misapplication of policy, or an interpretation that prior appeal decisions contradict, we appeal. The route depends on the specific refusal — not on a general preference.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/50 p-8 bg-muted/5">
              <h4 className="mb-6 pb-4 border-b border-border/30">Service Details</h4>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Stage</span>
                  <span className="text-right">Post-Decision</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="text-right">3–8 weeks</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-muted-foreground">Deliverables</span>
                  <span className="text-right">Strategy & documentation</span>
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
          <h2 className="mb-6">Strategy Development</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Structured approach to addressing planning refusals and preparing appeals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">01</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Refusal Analysis</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Detailed examination of planning officer reports, committee minutes, and formal refusal reasons 
              identifying specific concerns and policy grounds for refusal.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Refusal reasons analysis</p>
              <p>• Officer report review</p>
              <p>• Policy grounds assessment</p>
              <p>• Technical objections evaluation</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">02</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Strategic Options Assessment</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Evaluation of available routes forward including design amendments for resubmission, appeal 
              prospects, and alternative development strategies.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Resubmission viability</p>
              <p>• Appeal prospects evaluation</p>
              <p>• Design modification options</p>
              <p>• Alternative strategies</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">03</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Design Response Development</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Preparation of design amendments addressing identified concerns whilst maintaining project 
              viability and client requirements where resubmission is appropriate route.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Design refinements</p>
              <p>• Concern mitigation</p>
              <p>• Policy compliance improvements</p>
              <p>• Revised documentation</p>
            </div>
          </div>

          <div className="group">
            <div className="mb-6 pb-4 border-b border-border/50">
              <span className="text-4xl font-light text-muted-foreground/40">04</span>
            </div>
            <h3 className="mb-4 group-hover:text-muted-foreground transition-colors duration-300">Appeal Documentation Support</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Preparation of architectural drawings, design statements, and technical documentation supporting 
              planning appeal submissions coordinated with planning consultants.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Appeal drawings</p>
              <p>• Design justification statements</p>
              <p>• Technical evidence</p>
              <p>• Consultant coordination</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="mb-20">
          <h2 className="mb-6">Typical Process</h2>
        </div>

        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Week 1</span>
            </div>
            <div className="lg:col-span-10 border-l-2 border-border pl-8">
              <h4 className="mb-3">Initial Assessment</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Review of refusal documentation, planning file examination, and preliminary strategic assessment 
                of available routes forward.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Week 2-3</span>
            </div>
            <div className="lg:col-span-10 border-l-2 border-border pl-8">
              <h4 className="mb-3">Strategy Development</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Detailed strategy preparation including design modifications if appropriate, consultation with 
                specialists, and documentation preparation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground">Week 4+</span>
            </div>
            <div className="lg:col-span-10 border-l-2 border-border pl-8">
              <h4 className="mb-3">Implementation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Resubmission or appeal preparation, documentation finalization, and coordination with planning 
                consultants or appeal specialists as required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40 md:px-12 lg:px-16 border-t border-border pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8">Discuss your project</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            For planning refusal enquiries, please provide project address, copy of refusal notice, 
            and planning officer report if available.
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
