import { useAuth } from '../../lib/auth';
import { SEO } from '../components/SEO';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { AuthModal } from '../components/AuthModal';
import { STRIPE_TOOLKIT_LINK } from '../../config/stripe';

const s = {
  eyebrow: { fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--bau-black)', fontWeight: 700 },
  body: { fontSize: '0.9375rem', lineHeight: 1.82, color: 'var(--muted-foreground)' },
  link: { textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--foreground)', borderBottom: '3px solid var(--bau-red)', paddingBottom: '2px' },
  btn: { background: 'var(--foreground)', color: 'var(--background)', textDecoration: 'none', padding: '0.9375rem 2.25rem', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, cursor: 'pointer', border: 'none', display: 'inline-block' as const },
};

const SECTIONS = [
  ['01', 'Your property in context', 'Planning history, what has been applied for before, and what it tells you.'],
  ['02', 'Permitted development', 'What you can do without a full application, and where the limits sit.'],
  ['03', 'The title register', 'What your deeds say, covenants and restrictions that can catch people out.'],
  ['04', 'Site & survey', 'Levels, drains, boundaries, trees, the practical facts a designer needs.'],
  ['05', 'Constraints', 'Conservation areas, listed status, flood and other designations.'],
  ['06', 'How you live now', 'An honest audit of what works and what does not in the space today.'],
  ['07', 'The brief', 'Turning wants into a written brief a designer can actually price.'],
  ['08', 'Precedent & references', 'Gathering and organising what you are drawn to, and why.'],
  ['09', 'Realistic budgeting', 'The full picture beyond the build, fees, surveys, contingency, finishes.'],
  ['10', 'Programme', 'A realistic sense of how long each stage takes.'],
  ['11', 'Choosing a designer', 'What to ask, what good looks like, how to compare fairly.'],
  ['12', 'Your first meeting', 'Walking in prepared, with the right questions and the right paperwork.'],
];

export function Toolkit() {
  const { user, hasFullAccess, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <SEO
        title="Property Passport Toolkit · Noorast"
        description="A structured workbook for homeowners getting ready to commission a project. Twelve sections covering planning, budget, and how to brief a designer. A paid digital download from the studio."
        path="/toolkit"
      />

      {authOpen && <AuthModal defaultMode="signup" onClose={() => setAuthOpen(false)} />}

      {/* HERO */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7 reveal">
            <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.75rem' }}>The Property Passport</p>
            <h1 style={{ letterSpacing: '-0.026em', marginBottom: '1.75rem', fontWeight: 500 }}>
              Walk in ready.
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '34rem' }}>
              <p style={{ ...s.body, fontSize: '1.0625rem' }}>
                Nine times out of ten, the first conversation with a homeowner is the same one. We wrote it down, with worksheets, so you can do that thinking before you spend a penny on design.
              </p>
              <p style={s.body}>
                It covers the things most people do not think about until it is too late: your property's planning history, what is actually allowed without applying, what your title register says, where the drains run, and what a realistic budget looks like once you count everything beyond the build.
              </p>
              <p style={s.body}>
                By the end you will know what you can and cannot do, you will have a proper written brief, and you will have the right questions for your first meeting. A well-prepared client gets a better result, and usually a better fee.
              </p>
            </div>
          </div>

          {/* PURCHASE PANEL — the only £ on the core site, by design */}
          <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ transitionDelay: '0.1s' }}>
            <div style={{ border: '2px solid var(--bau-black)', padding: '2rem', position: 'sticky', top: '6rem' }}>
              <p style={{ ...s.eyebrow, marginBottom: '1.25rem' }}>Digital download</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--foreground)' }}>£97</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>+ VAT</span>
              </div>
              <p style={{ ...s.body, fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
                Twelve sections, around 120 pages. Yours to keep, fill in on screen or print.
              </p>

              <div style={{ borderTop: '2px solid var(--bau-black)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                {['Complete 12-section workbook', 'Worksheets and checklists', 'Lifetime access to your copy', 'Free updates as it is revised'].map(t => (
                  <div key={t} style={{ display: 'flex', gap: '0.625rem', alignItems: 'baseline', marginBottom: '0.625rem' }}>
                    <span style={{ color: 'var(--muted-foreground)', opacity: 0.4, flexShrink: 0 }}>·</span>
                    <span style={{ ...s.body, fontSize: '0.8125rem' }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* GATED ACTION */}
              {loading ? (
                <div style={{ ...s.btn, opacity: 0.5, textAlign: 'center' }}>Loading…</div>
              ) : hasFullAccess ? (
                <div>
                  <Link to="/account" style={{ ...s.btn, width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                    Open your toolkit →
                  </Link>
                  <p style={{ ...s.body, fontSize: '0.6875rem', marginTop: '0.875rem', textAlign: 'center' }}>
                    You have full access. Find it in your account.
                  </p>
                </div>
              ) : user ? (
                <div>
                  {/* TODO(Aun): Stripe checkout should carry the signed-in user's email/id as
                      client_reference_id so the webhook can grant access on their account.
                      Append ?prefilled_email={user.email} or configure in the Payment Link. */}
                  <a href={`${STRIPE_TOOLKIT_LINK}?prefilled_email=${encodeURIComponent(user.email || '')}`}
                    style={{ ...s.btn, width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                    Buy the toolkit, £97 →
                  </a>
                  <p style={{ ...s.body, fontSize: '0.6875rem', marginTop: '0.875rem', textAlign: 'center' }}>
                    Secure checkout via Stripe. Access is added to your account.
                  </p>
                </div>
              ) : (
                <div>
                  <button onClick={() => setAuthOpen(true)} style={{ ...s.btn, width: '100%', textAlign: 'center' }}>
                    Create an account to buy →
                  </button>
                  <p style={{ ...s.body, fontSize: '0.6875rem', marginTop: '0.875rem', textAlign: 'center' }}>
                    A free account keeps your toolkit and access in one place.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS INSIDE — the twelve sections, so the price is legible */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="reveal" style={{ marginBottom: '3.5rem', maxWidth: '32rem' }}>
            <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.75rem' }}>What is inside</p>
            <h2 style={{ fontWeight: 500 }}>Twelve sections.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {SECTIONS.map(([n, t, d], i) => (
              <div key={n} className="reveal" style={{ borderTop: '2px solid var(--bau-black)', padding: '1.75rem 0', transitionDelay: `${(i % 2) * 0.05}s` }}>
                <div className="grid" style={{ gridTemplateColumns: '2.5rem 1fr', gap: '1rem' }}>
                  <span style={{ ...s.eyebrow, opacity: 0.3, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
                  <div>
                    <h3 style={{ fontWeight: 400, fontSize: '1rem', marginBottom: '0.4rem' }}>{t}</h3>
                    <p style={{ ...s.body, fontSize: '0.8125rem' }}>{d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONEST REASSURANCE — earns the price, closes liability */}
      <section className="joint" style={{ background: 'var(--bau-paper)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 reveal">
              <p className="eyebrow-tick" style={{ ...s.eyebrow, marginBottom: '1.5rem' }}>Worth knowing</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5 reveal" style={{ transitionDelay: '0.08s', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={s.body}>
                The toolkit is a workbook, not professional advice. It helps you prepare and ask better questions, it does not replace a designer, planning consultant, or surveyor looking at your specific project. Where it matters, it tells you who to ask.
              </p>
              <p style={s.body}>
                If you go on to commission the studio for design work, the cost of the toolkit comes off your first fee. It is meant as a way in, not a separate business.
              </p>
              <p style={s.body}>
                Not sure it is for you? Email us first and we will tell you honestly whether it will help in your situation.
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <a href="mailto:design@noorast.co.uk?subject=Property%20Passport%20question" style={s.link}>Ask before you buy →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-LINK */}
      <section className="joint">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16 flex flex-wrap items-center justify-between gap-8 reveal">
          <p style={s.body}>Looking to commission a project rather than go it alone?</p>
          <Link to="/services" style={s.link}>See our services →</Link>
        </div>
      </section>
    </div>
  );
}
