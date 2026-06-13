import { Link } from 'react-router';
import { SEO } from '../components/SEO';

export function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service — Noorast"
        description="Terms and conditions governing use of Noorast's website and services."
      />

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32 border-b border-border">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">Legal</div>
          <h1 className="mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            The terms and conditions governing your use of noorast.co.uk and all associated services.
          </p>
          <p className="text-sm text-muted-foreground mt-6">Last updated: 8 April 2025</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-12 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <div className="border-l-2 border-foreground pl-6 py-2 space-y-4">
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium mb-2">Important — Status of Noorast</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Noorast Group Limited is a residential design studio offering architectural design, interior design, and landscape design services. Where projects require sign-off by an architect registered with the Architects Registration Board (ARB), we engage registered architects as part of the project team. We do not hold ourselves out as architects unless an ARB-registered member of the team is responsible for that work.
              </p>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-foreground font-medium mb-2">Important — Nature of Information</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The information and AI-generated content provided through our services is for general informational purposes only. It does not constitute professional planning, structural, legal, or financial advice. Always consult an appropriately qualified professional — including, where relevant, a structural engineer, surveyor, or solicitor — before making decisions about your property.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">01 — Agreement to Terms</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>By accessing or using noorast.co.uk and any services offered through it (the "Services"), you agree to be bound by these Terms of Service ("Terms") and our Privacy Policy. If you do not agree, please do not use our Services.</p>
            <p>These Terms constitute a legally binding agreement between you ("User", "you") and Noorast, a company registered in England and Wales ("Noorast", "we", "us"). These Terms are governed by the laws of England and Wales.</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">02 — Services</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">Noorast Group Limited provides the following services through its core team and a wider network of architects, designers, and specialists engaged on a per-project basis:</p>
          <div className="space-y-2">
            {[
              "The Property Passport — a digital tool for documenting property intelligence before commissioning architectural design services",
              "Planning Intelligence AI — an AI assistant providing information on UK planning law, building regulations, and property matters",
              "Planning data search — retrieval of publicly available UK government planning constraint data",
              "Architectural design services — concept design, planning submissions, design drawings, technical drawings to Building Regulations standard, on a non-statutory basis",
              "Consultation services — paid 45-minute reviews of completed Property Passports and project guidance",
              "General information and educational content about UK planning and design",
            ].map(item => (
              <div key={item} className="flex gap-4 py-3 border-b border-border/30">
                <span className="text-muted-foreground/30 shrink-0">—</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">03 — Status of Noorast and Disclaimer of Professional Advice</h2>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">Architectural designers, not architects</h3>
              <p>Noorast Group Limited operates as a residential design studio. Where projects require an architect registered with the Architects Registration Board (ARB), we engage one as part of the project team and identify them as the responsible architect for that work. Other work is delivered by the studio in its capacity as designers and consultants.</p>
            </div>
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">Not professional advice</h3>
              <p>Nothing on this Website or generated by our AI constitutes professional planning advice, structural engineering advice, legal advice, or financial advice. The Planning Intelligence AI is an informational tool, not a substitute for a qualified surveyor, structural engineer, planning consultant, or solicitor.</p>
            </div>
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">AI limitations</h3>
              <p>Our AI may produce inaccurate, incomplete, or outdated information. Planning law and policy changes frequently. Always verify AI-generated information with primary sources and qualified professionals before acting on it.</p>
            </div>
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">No professional relationship from website use</h3>
              <p>Use of our free Services (the Website, the Property Passport, the Planning Intelligence AI) does not create a professional-client relationship between you and Noorast Group Limited or any individual associated with us. A professional engagement only arises where you and Noorast Group Limited enter into a separate written letter of appointment for specific architectural design services.</p>
            </div>
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">Toolkit and Consultation services</h3>
              <p>Purchase of our paid Toolkit (£97 + VAT) provides access to digital intelligence tools and the Property Passport workbook — it is not an architectural design service and does not constitute professional advice on your specific project. Purchase of the Toolkit + Consultation service (£197 + VAT) includes a 45-minute consultation reviewing your completed Property Passport and providing general guidance — this is general guidance only and does not constitute formal architectural, planning, structural, or legal advice on your project.</p>
            </div>
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">Building Safety Act 2022 — Higher-Risk Buildings</h3>
              <p>Noorast Group Limited does not undertake the role of Principal Designer under the Building Safety Act 2022 for higher-risk buildings (HRBs). Our services exclude HRB work as defined in the Act. Projects involving residential buildings of 18 metres or more, care homes, or hospitals must engage a competent person registered for that role.</p>
            </div>
            <div>
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">Third-party data accuracy</h3>
              <p>Planning constraint data is sourced from third-party government APIs. We do not guarantee its accuracy, completeness, or currency. Always verify planning constraints directly with the relevant Local Planning Authority.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">04 — Acceptable Use</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">You agree not to use our Services to:</p>
          <div className="space-y-2">
            {[
              "Violate any applicable law or regulation",
              "Submit false, misleading, or fraudulent information",
              "Attempt to gain unauthorised access to any part of our systems",
              "Scrape, crawl, or use automated means to access our Services without written permission",
              "Use AI outputs for commercial resale without our written permission",
              "Harass, abuse, or harm any person",
              "Infringe the intellectual property rights of Noorast or any third party",
              "Circumvent any security or access controls",
            ].map(item => (
              <div key={item} className="flex gap-4 py-3 border-b border-border/30">
                <span className="text-muted-foreground/30 shrink-0">—</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">05 — Intellectual Property</h2>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">Our content</h3>
              <p>All content on the Website — including text, graphics, logos, design, and software — is owned by or licensed to Noorast and protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
            </div>
            <div className="border-b border-border/50 pb-6">
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">Your content</h3>
              <p>You retain ownership of data you enter into the Property Passport. By using our Services, you grant us a limited, non-exclusive licence to process your content solely to provide the Services to you.</p>
            </div>
            <div>
              <h3 className="text-foreground font-medium text-sm mb-2 tracking-wide">AI outputs</h3>
              <p>AI-generated responses are provided for your personal use. You must not present AI outputs as professional advice or as your own original research without appropriate disclosure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">06 — Limitation of Liability</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">To the fullest extent permitted by English law, Noorast Group Limited shall not be liable for:</p>
          <div className="space-y-2 mb-8">
            {[
              "Any loss arising from your reliance on information or AI outputs provided through our Services",
              "Planning application refusals, appeals, enforcement action, or other planning outcomes",
              "Any indirect, consequential, special, incidental, or punitive damages",
              "Loss of profits, revenue, data, goodwill, or other intangible losses",
              "Damages arising from your failure to obtain independent professional advice from a registered architect, surveyor, structural engineer, planning consultant, or solicitor",
              "The accuracy of third-party planning data or government API responses",
              "Service interruptions, technical failures, or loss of data",
              "Any loss arising from works carried out by third-party contractors, builders, or other professionals appointed by you",
              "Any loss arising from decisions made by Local Planning Authorities, Building Control bodies, or other regulatory authorities",
            ].map(item => (
              <div key={item} className="flex gap-4 py-3 border-b border-border/30">
                <span className="text-muted-foreground/30 shrink-0">—</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <h3 className="text-foreground font-medium text-sm mb-3 mt-8 tracking-wide">Liability Cap — Website Use &amp; Free Tools</h3>
          <div className="p-5 border border-border mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">For free use of our Website, the Property Passport, the Planning Intelligence AI, or any other free tool, our total aggregate liability to you shall not exceed £100.</p>
          </div>

          <h3 className="text-foreground font-medium text-sm mb-3 tracking-wide">Liability Cap — Paid Toolkit &amp; Consultation</h3>
          <div className="p-5 border border-border mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">For paid services purchased through the Website (including the £97 Toolkit and £197 Toolkit + Consultation tiers), our total aggregate liability to you arising from or in connection with that purchase shall not exceed three (3) times the fees paid to us for that service in the 12 months preceding the claim.</p>
          </div>

          <h3 className="text-foreground font-medium text-sm mb-3 tracking-wide">Liability Cap — Architectural Design Services</h3>
          <div className="p-5 border border-border mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">Where you engage Noorast Group Limited under a separate written letter of appointment for architectural design services (concept design, planning submissions, technical drawings, or related services), the limitation of liability set out in that letter of appointment shall apply. Where no such written agreement exists, our total aggregate liability shall not exceed the lesser of (a) the fees paid to us for the project, or (b) £100,000.</p>
          </div>

          <h3 className="text-foreground font-medium text-sm mb-3 tracking-wide">Net Contribution</h3>
          <div className="p-5 border border-border mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">Where loss or damage is caused or contributed to by any other party (including but not limited to architects, structural engineers, contractors, surveyors, or planning consultants engaged by you), our liability shall be limited to that proportion of the loss which it is reasonable for us to pay, having regard to the extent of our responsibility.</p>
          </div>

          <h3 className="text-foreground font-medium text-sm mb-3 tracking-wide">Limitation Period</h3>
          <div className="p-5 border border-border mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">No claim may be brought against Noorast Group Limited more than six (6) years after the date on which the work giving rise to the claim was completed, regardless of when the cause of action arose. This contractual limitation period applies in addition to any statutory limitation periods under the Limitation Act 1980.</p>
          </div>

          <div className="p-5 border-2 border-foreground">
            <p className="text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground font-medium">Statutory exceptions.</strong> Nothing in these Terms limits or excludes liability for: (a) death or personal injury caused by negligence; (b) fraud or fraudulent misrepresentation; (c) breach of consumer rights that cannot be excluded by English law (including under the Consumer Rights Act 2015); or (d) any other liability that cannot be limited or excluded under applicable law.</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">07 — Indemnification</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">You agree to indemnify and hold harmless Noorast and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) your reliance on AI-generated content without independent professional verification.</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">08 — Changes to Services</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Our core Services including the Property Passport and Planning Intelligence AI are currently provided free of charge. We reserve the right to introduce paid tiers, modify features, restrict access, or discontinue any part of the Services at any time with reasonable notice where practical. Noorast will not be liable for any modification, suspension, or discontinuance of Services.</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">09 — Governing Law</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">These Terms are governed by the laws of England and Wales. Any dispute arising from these Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts of England and Wales. We encourage you to contact us in the first instance to resolve disputes informally before initiating legal proceedings.</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">10 — Changes to Terms</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">We may update these Terms from time to time. We will post the updated Terms on this page with a revised date. Your continued use of the Services after changes are posted constitutes acceptance of the updated Terms. If you do not agree to the revised Terms, you must stop using our Services.</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <h2 className="mb-6">11 — Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">Questions about these Terms? Contact us at:</p>
          <div className="border-l-2 border-border pl-6 space-y-1 text-sm text-muted-foreground">
            <p className="text-foreground font-medium">Noorast</p>
            <p>[INSERT_REGISTERED_OFFICE_ADDRESS]</p>
            <a href="mailto:design@noorast.com" className="text-foreground underline underline-offset-4">design@noorast.com</a>
          </div>
          <div className="mt-8 flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy →</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
