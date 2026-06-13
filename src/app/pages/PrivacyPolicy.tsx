import { Link } from 'react-router';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy — Noorast"
        description="How Noorast collects, uses, and protects your personal data in accordance with UK GDPR."
      />

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32 border-b border-border">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">Legal</div>
          <h1 className="mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            How Noorast collects, uses, and protects your personal data — in full compliance with UK GDPR and the Data Protection Act 2018.
          </p>
          <p className="text-sm text-muted-foreground mt-6">Last updated: 8 April 2025</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">01 — Who We Are</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Noorast Group Limited ("we", "us", "our") is a company registered in England and Wales operating a property intelligence platform for UK homeowners. Our registered office is at [INSERT_REGISTERED_OFFICE_ADDRESS]. You can contact us at <a href="mailto:design@noorast.com" className="text-foreground underline underline-offset-4">design@noorast.com</a>.</p>
            <p><strong className="text-foreground font-medium">Status:</strong> Noorast Group Limited is a residential design studio offering architectural, interior, and landscape design services. The studio engages ARB-registered architects on the project team where the scope of work requires it.</p>
            <p>This Privacy Policy explains how we collect, use, and safeguard your personal data when you use noorast.co.uk and our services, including the Property Passport, Planning Intelligence tools, and any consultation services purchased through the Website.</p>
            <p>Noorast Group Limited is the data controller for personal data processed through our Website and is responsible for compliance with UK GDPR and the Data Protection Act 2018.</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">02 — Data We Collect</h2>
          <div className="divide-y divide-border/50">
            {[
              { title: "Account data", desc: "Username and password when you create a Property Passport account. Passwords are hashed — never stored in plain text." },
              { title: "Property data", desc: "Information entered into the Property Passport tool, including addresses, planning history, and legal constraints. Stored locally in your browser only." },
              { title: "Usage data", desc: "IP address, browser type, pages visited, and time on site. Collected automatically via server logs." },
              { title: "AI conversation data", desc: "Messages sent to Planning Intelligence. Transmitted to Anthropic's API to generate responses. Not stored on our servers." },
              { title: "Contact data", desc: "Name, email address, and message content if you contact us directly." },
              { title: "Address search data", desc: "UK addresses searched in Planning Intelligence. Sent to OpenStreetMap Nominatim and planning.data.gov.uk to retrieve constraint data." },
            ].map(item => (
              <div key={item.title} className="py-5 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-8">
                <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium pt-0.5">{item.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">03 — Legal Basis for Processing</h2>
          <div className="divide-y divide-border/50">
            {[
              { basis: "Contract", article: "Art. 6(1)(b)", desc: "Processing necessary to provide the services you have requested." },
              { basis: "Legitimate interests", article: "Art. 6(1)(f)", desc: "Improving services, preventing fraud, and ensuring website security." },
              { basis: "Legal obligation", article: "Art. 6(1)(c)", desc: "Complying with UK laws including HMRC requirements." },
              { basis: "Consent", article: "Art. 6(1)(a)", desc: "For marketing communications, where explicitly requested. Withdrawable at any time." },
            ].map(item => (
              <div key={item.basis} className="py-5 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-8">
                <div>
                  <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium">{item.basis}</div>
                  <div className="text-[10px] text-muted-foreground/50 mt-1 font-mono">{item.article}</div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">04 — How We Use Your Data</h2>
          <div className="space-y-2 mb-8">
            {[
              "Provide and operate the Website and services",
              "Process and respond to contact form enquiries",
              "Generate AI planning advice via Anthropic's Claude API",
              "Retrieve planning constraint data from UK government APIs",
              "Improve and develop our services",
              "Detect and prevent fraud and security incidents",
              "Comply with legal obligations",
              "Send service-related communications",
            ].map(item => (
              <div key={item} className="flex gap-4 py-2 border-b border-border/30">
                <span className="text-muted-foreground/30 shrink-0">—</span>
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-5 border border-border bg-muted/20">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">We do not sell your personal data</span> to third parties, and we do not use your data for automated profiling or decision-making that has legal or significant effects on you.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-2">05 — GDPR Compliance</h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">Our full obligations and measures under UK GDPR and the Data Protection Act 2018.</p>

          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-medium tracking-wide mb-3 pb-3 border-b border-border/50">Data Controller</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Noorast acts as the <strong className="text-foreground font-medium">data controller</strong> for all personal data collected through our Website and services. As data controller, we determine the purposes and means of processing and are responsible for ensuring compliance with UK GDPR.</p>
            </div>

            <div>
              <h3 className="text-sm font-medium tracking-wide mb-4 pb-3 border-b border-border/50">UK GDPR Article 5 Principles</h3>
              <div className="divide-y divide-border/40">
                {[
                  { p: "Lawfulness, fairness & transparency", d: "We process data on a lawful basis and are transparent about how it is used through this policy." },
                  { p: "Purpose limitation", d: "Data is collected for specified, explicit, and legitimate purposes and not further processed incompatibly with those purposes." },
                  { p: "Data minimisation", d: "We collect only what is necessary for the stated purposes. Property Passport data stays on your device by design." },
                  { p: "Accuracy", d: "We take reasonable steps to ensure data we hold is accurate and kept up to date." },
                  { p: "Storage limitation", d: "Personal data is retained only as long as necessary. See Section 07 for retention periods." },
                  { p: "Integrity & confidentiality", d: "We apply appropriate security measures to protect data against unauthorised access, loss, or destruction." },
                ].map(item => (
                  <div key={item.p} className="py-4 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 md:gap-6">
                    <div className="text-[11px] tracking-[0.06em] uppercase text-foreground font-medium leading-relaxed">{item.p}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium tracking-wide mb-3 pb-3 border-b border-border/50">Data Protection by Design</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">In accordance with UK GDPR Article 25, we embed data protection into the design of our services from the outset. Property Passport data is stored in your browser's localStorage by default — it does not leave your device unless you choose to export it. This minimises our data exposure and gives you direct control over your information.</p>
            </div>

            <div>
              <h3 className="text-sm font-medium tracking-wide mb-3 pb-3 border-b border-border/50">International Data Transfers</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Some third-party processors operate outside the UK and EEA, including in the United States (Anthropic, Netlify). Where we transfer personal data internationally, we ensure appropriate safeguards are in place in accordance with UK GDPR Chapter V, including Standard Contractual Clauses (SCCs) or reliance on adequacy regulations.</p>
            </div>

            <div>
              <h3 className="text-sm font-medium tracking-wide mb-3 pb-3 border-b border-border/50">Data Breach Procedures</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">In the event of a personal data breach likely to result in risk to your rights and freedoms, Noorast will notify the ICO within 72 hours of becoming aware, in accordance with UK GDPR Article 33. Where the breach poses a high risk to you personally, we will notify you directly without undue delay under Article 34.</p>
            </div>

            <div>
              <h3 className="text-sm font-medium tracking-wide mb-3 pb-3 border-b border-border/50">ICO Registration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Noorast is registered with the Information Commissioner's Office as required under the Data Protection Act 2018. You have the right to lodge a complaint with the ICO at <a href="https://ico.org.uk" className="text-foreground underline underline-offset-4" target="_blank" rel="noopener noreferrer">ico.org.uk</a> or 0303 123 1113.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">06 — Third-Party Services</h2>
          <div className="divide-y divide-border/50">
            {[
              { name: "Anthropic", role: "AI processing", location: "United States", desc: "Processes AI conversation messages to generate Planning Intelligence responses. Subject to Anthropic's DPA and Standard Contractual Clauses." },
              { name: "Netlify", role: "Hosting & infrastructure", location: "United States", desc: "Website hosting and serverless functions. Processes request data including IP addresses. Subject to Netlify's DPA." },
              { name: "OpenStreetMap / Nominatim", role: "Geocoding", location: "Germany", desc: "Geocoding service. UK addresses sent to retrieve geographic coordinates for planning searches." },
              { name: "planning.data.gov.uk", role: "Planning data", location: "United Kingdom", desc: "UK Government API. Geographic coordinates sent to retrieve planning designation data." },
            ].map(item => (
              <div key={item.name} className="py-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8">
                <div>
                  <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium mb-1">{item.name}</div>
                  <div className="text-[10px] text-muted-foreground/60 mb-1">{item.role}</div>
                  <div className="text-[10px] text-muted-foreground/40">{item.location}</div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">07 — Data Retention</h2>
          <div className="divide-y divide-border/50">
            {[
              { type: "Property Passport data", period: "Your control", desc: "Stored in your browser only. We hold no copy. Cleared via 'Reset Data' or browser settings." },
              { type: "Account data", period: "Account lifetime + 30 days", desc: "Deleted within 30 days of account closure on request." },
              { type: "Server logs", period: "Up to 90 days", desc: "Retained for security and debugging, then automatically deleted." },
              { type: "Contact enquiries", period: "Up to 2 years", desc: "Retained until fully resolved, then deleted." },
              { type: "Financial records", period: "7 years", desc: "Required by HMRC and UK accounting regulations." },
            ].map(item => (
              <div key={item.type} className="py-5 grid grid-cols-1 md:grid-cols-[160px_140px_1fr] gap-3 md:gap-6">
                <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium">{item.type}</div>
                <div className="text-[11px] text-muted-foreground font-mono">{item.period}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-4">08 — Your Rights Under UK GDPR</h2>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">To exercise any right, contact us at design@noorast.com. We will respond within one calendar month.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-border/50">
            {[
              { right: "Right of access", article: "Art. 15", desc: "Request a copy of the personal data we hold about you." },
              { right: "Right to rectification", article: "Art. 16", desc: "Request correction of inaccurate or incomplete data." },
              { right: "Right to erasure", article: "Art. 17", desc: "Request deletion of your data where no legitimate reason exists to retain it." },
              { right: "Right to restrict processing", article: "Art. 18", desc: "Request that we limit processing in certain circumstances." },
              { right: "Right to data portability", article: "Art. 20", desc: "Receive your data in a structured, machine-readable format." },
              { right: "Right to object", article: "Art. 21", desc: "Object to processing based on legitimate interests or for direct marketing." },
            ].map(item => (
              <div key={item.right} className="border-b border-r border-border/50 p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium">{item.right}</div>
                  <div className="text-[10px] font-mono text-muted-foreground/40">{item.article}</div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">You also have the right to lodge a complaint with the <strong className="text-foreground font-medium">Information Commissioner's Office (ICO)</strong> at <a href="https://ico.org.uk" className="text-foreground underline underline-offset-4" target="_blank" rel="noopener noreferrer">ico.org.uk</a> or 0303 123 1113.</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">09 — Security</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>We implement appropriate technical and organisational measures to protect your personal data. All transmission occurs over HTTPS. Passwords are hashed using industry-standard algorithms before storage.</p>
            <p>Property Passport data is stored locally in your browser by design — minimising our data exposure and giving you direct control over your information.</p>
            <p>No internet transmission is completely secure. While we use commercially reasonable measures to protect your data, we cannot guarantee its absolute security.</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">10 — Changes to This Policy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">We may update this Privacy Policy from time to time. We will post the updated policy on this page with a revised date. For significant changes, we will provide notice via our Website or email. We encourage you to review this policy periodically.</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <h2 className="mb-6">11 — Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">For any questions about this Privacy Policy, to exercise your data rights, or to raise a data protection concern:</p>
          <div className="border-l-2 border-border pl-6 space-y-1 text-sm text-muted-foreground">
            <p className="text-foreground font-medium">Noorast</p>
            <p>[INSERT_REGISTERED_OFFICE_ADDRESS]</p>
            <a href="mailto:design@noorast.com" className="text-foreground underline underline-offset-4">design@noorast.com</a>
          </div>
          <div className="mt-8 flex gap-6">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service →</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
