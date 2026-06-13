import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';

const s = {
  eyebrow: { fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase' as const, color: 'var(--muted-foreground)', opacity: 0.5 },
  body: { fontSize: '0.9375rem', lineHeight: 1.85, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: '2px' },
};

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.01, rootMargin: '0px 0px -4% 0px' }
    );
    els.forEach(el => io.observe(el));
    const fallback = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2000);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setSent(true);
    } catch {
      window.location.href = `mailto:design@noorast.co.uk?subject=Project enquiry&body=${encodeURIComponent(String(data.get('message') || ''))}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <SEO
        title="Contact — Noorast"
        description="Start a conversation about your project. Architectural design, interiors, landscape, or international work. We reply within two working days."
      />

      {/* HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-2xl reveal">
          <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Contact<span className="brand-dot" />London</p>
          <h1 style={{ letterSpacing: '-0.03em' }}>Tell us about your project.</h1>
        </div>
      </section>

      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* LEFT — prose + direct details */}
            <div className="lg:col-span-5 reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p style={s.body}>
                The best way to start is to tell us a little about what you're working on. We reply to every enquiry within two working days with an honest view on whether we're the right people to help.
              </p>
              <p style={s.body}>
                We're based in London and work remotely as standard — most client meetings happen over video call. We visit sites when it's genuinely useful.
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ ...s.eyebrow, marginBottom: '0.5rem' }}>Email</p>
                <a href="mailto:design@noorast.co.uk"
                  style={{ fontSize: '1rem', color: 'var(--foreground)', textDecoration: 'none', borderBottom: '1px solid rgba(40,30,20,0.2)', paddingBottom: 2 }}>
                  design@noorast.co.uk
                </a>
              </div>

            </div>

            {/* RIGHT — structured form */}
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ transitionDelay: '0.1s' }}>
              {sent ? (
                <div style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid rgba(40,30,20,0.1)' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 300, color: 'var(--foreground)', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>Received — thank you.</p>
                  <p style={s.body}>We'll come back to you within two working days. If it's urgent, email <a href="mailto:design@noorast.co.uk" style={{ color: 'var(--foreground)' }}>design@noorast.co.uk</a> directly.</p>
                </div>
              ) : (
                <form name="enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="hidden" name="form-name" value="enquiry" />
                  <p hidden><label>Don't fill this out: <input name="bot-field" /></label></p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ ...s.eyebrow, display: 'block', marginBottom: '0.5rem' }}>Your name</label>
                      <input className="enquiry-field" type="text" name="name" required />
                    </div>
                    <div>
                      <label style={{ ...s.eyebrow, display: 'block', marginBottom: '0.5rem' }}>Email</label>
                      <input className="enquiry-field" type="email" name="email" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label style={{ ...s.eyebrow, display: 'block', marginBottom: '0.5rem' }}>Where's the project?</label>
                      <input className="enquiry-field" type="text" name="location" placeholder="Town or city" />
                    </div>
                    <div>
                      <label style={{ ...s.eyebrow, display: 'block', marginBottom: '0.5rem' }}>Project type</label>
                      <select className="enquiry-field" name="type" defaultValue="">
                        <option value="" disabled>Select one</option>
                        <option>Extension</option>
                        <option>Renovation</option>
                        <option>New build</option>
                        <option>Interior</option>
                        <option>Garden</option>
                        <option>International</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ ...s.eyebrow, display: 'block', marginBottom: '0.5rem' }}>Tell us about it</label>
                    <textarea className="enquiry-field" name="message" rows={4} placeholder="A few lines is plenty — what you're hoping to do, and roughly when." />
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.75rem', marginTop: '0.5rem' }}>
                    <button type="submit" disabled={sending}
                      style={{ background: 'var(--foreground)', color: 'var(--background)', border: 'none', cursor: sending ? 'wait' : 'pointer', padding: '0.9375rem 2.5rem', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: sending ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                      {sending ? 'Sending…' : 'Send →'}
                    </button>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', opacity: 0.6 }}>
                      We reply within two working days.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NOT READY */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={s.body}>Not ready to commit? See what we do, or get a sense of fees first.</p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/services" style={s.link}>What we do →</Link>
            <Link to="/fee-guide" style={{ ...s.link, color: 'var(--muted-foreground)', borderBottom: '1px solid rgba(40,30,20,0.1)' }}>Fee guide →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
