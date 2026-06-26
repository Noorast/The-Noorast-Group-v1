import { Link } from 'react-router';
import { SEO } from '../components/SEO';

export function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy — Noorast"
        description="How Noorast uses cookies and browser local storage."
      />

      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32 border-b border-border">
        <div className="max-w-3xl">
          <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">Legal</div>
          <h1 className="mb-6">Cookie Policy</h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            How Noorast uses cookies and browser local storage on noorast.co.uk.
          </p>
          <p className="text-sm text-muted-foreground mt-6">Last updated: 8 April 2025</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">01 — What Are Cookies</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you use them. We also use browser localStorage — a similar technology that stores data locally on your device without transmitting it to servers automatically.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">02 — How We Use Storage</h2>
          <div className="space-y-0 divide-y divide-border/50">

            <div className="py-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8">
              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium mb-2">Essential localStorage</div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-green-200 bg-green-50 text-green-700 text-[9px] tracking-[0.08em] uppercase font-medium">Required</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Used by the Property Passport to save your data locally in your browser. The following keys are used:</p>
                <div className="space-y-1.5">
                  {["np-data", "np-checks", "noorast-current-user", "noorast-users"].map(key => (
                    <div key={key} className="flex items-center gap-3">
                      <code className="bg-muted text-foreground px-2 py-0.5 text-xs font-mono">{key}</code>
                      <span className="text-xs text-muted-foreground">Property Passport data</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">This data never leaves your device unless you export it. You can clear it at any time using the "Reset Data" button or your browser settings.</p>
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8">
              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium mb-2">Server logs</div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-green-200 bg-green-50 text-green-700 text-[9px] tracking-[0.08em] uppercase font-medium">Required</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">Our hosting provider (Netlify) automatically logs IP addresses and request metadata for security and operational purposes. Retained for up to 90 days. This is standard server infrastructure logging, not advertising tracking.</p>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8">
              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium mb-2">Analytics</div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-border bg-muted text-muted-foreground text-[9px] tracking-[0.08em] uppercase font-medium">Not used</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">We do not currently use analytics cookies or any third-party tracking services. No Google Analytics, Facebook Pixel, or similar tools are present on this Website.</p>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8">
              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium mb-2">Advertising</div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-border bg-muted text-muted-foreground text-[9px] tracking-[0.08em] uppercase font-medium">Not used</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">We do not use advertising cookies or allow third-party advertisers to place cookies on our Website. Noorast products are free from advertising.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16 border-b border-border">
        <div className="max-w-3xl">
          <h2 className="mb-6">03 — Managing Your Preferences</h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>You can manage cookies and local storage in several ways:</p>
            <div className="space-y-2">
              {[
                { label: "Browser settings", desc: "Most browsers allow you to view, block, or delete cookies and clear localStorage. See your browser's help documentation for instructions." },
                { label: "Reset Data button", desc: "In the Property Passport tool, the 'Reset Data' button clears all locally stored passport and checklist data from your browser." },
                { label: "Important", desc: "Clearing localStorage will permanently delete your Property Passport data. We cannot recover it. Export your data before clearing if you wish to keep it." },
              ].map(item => (
                <div key={item.label} className="flex gap-4 py-3 border-b border-border/30">
                  <span className="text-[11px] tracking-[0.08em] uppercase text-foreground font-medium shrink-0 w-28 pt-0.5">{item.label}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="max-w-3xl">
          <h2 className="mb-6">04 — Contact</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Questions about our use of cookies or local storage? Contact us at <a href="mailto:design@noorast.com" className="text-foreground underline underline-offset-4">design@noorast.com</a>.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy →</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
