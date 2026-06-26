import { Link, Outlet, useLocation } from 'react-router';
import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import { AuthModal } from './AuthModal';

/* Aperture mark, the studio "N" as a threshold: two jambs + reveal */
const MARK = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none"><g stroke="currentColor" stroke-width="1.8" stroke-linecap="square"><line x1="11" y1="9" x2="11" y2="31"/><line x1="29" y1="9" x2="29" y2="31"/><line x1="11" y1="9" x2="29" y2="31"/></g></svg>`;

export function Layout() {
  const location = useLocation();
  const [mob, setMob]   = useState(false);
  const { user }        = useAuth();
  const [auth, setAuth] = useState<'signin'|'signup'|null>(null);

  useEffect(() => { setMob(false); }, [location.pathname]);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.04, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach(el => io.observe(el));
    const fb = setTimeout(() => els.forEach(el => el.classList.add('visible')), 2500);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, [location.pathname]);

  const active = (p: string) => location.pathname === p || location.pathname.startsWith(p + '/');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--paper)' }}>

      {/* ══ HEADER ════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50" style={{ background: 'var(--paper)', borderBottom: '1.5px solid var(--ink)' }}>
        <div className="frame">
          <div className="flex items-center justify-between" style={{ height: '4.25rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }} aria-label="Noorast">
              <span aria-hidden style={{ color: 'var(--ink)', width: 16, height: 16, display: 'inline-flex', flexShrink: 0 }}
                dangerouslySetInnerHTML={{ __html: MARK }} />
              <span style={{ fontSize: '13px', letterSpacing: '0.34em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
                NOORAST
              </span>
            </Link>

            <nav className="hidden md:flex items-center" style={{ gap: '2rem' }}>
              {[['/work','Work'],['/services','Services'],['/studio','Studio'],['/contact','Contact']].map(([p, l]) => (
                <Link key={p} to={p}
                  className={`nav-link${active(p) || (p === '/services' && (active('/architectural') || active('/interiors') || active('/landscape'))) || (p === '/studio' && active('/practice')) ? ' active' : ''}`}>
                  {l}
                </Link>
              ))}
              <span style={{ width: 1, height: 14, background: 'var(--line-soft)' }} />
              {user ? (
                <Link to="/account" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={11} /> Account
                </Link>
              ) : (
                <button onClick={() => setAuth('signin')} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={11} /> Sign in
                </button>
              )}
            </nav>

            <button onClick={() => setMob(!mob)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', padding: 4 }}>
              {mob ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {auth && <AuthModal defaultMode={auth} onClose={() => setAuth(null)} />}

        {mob && (
          <div className="md:hidden" style={{ borderTop: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
            <div className="frame" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
              {[['/work','Work'],['/services','Services'],['/international','International'],['/studio','Studio'],['/contact','Contact']].map(([p, l]) => (
                <Link key={p} to={p}
                  style={{ display: 'block', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)', padding: '0.625rem 0', borderBottom: '1px solid var(--line-soft)' }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      {/* ══ CONTACT PLANE — the single accent block ═══════════ */}
      <section className="plane">
        <div className="frame" style={{ paddingTop: 'clamp(3rem,6vw,5rem)', paddingBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div className="grid12">
            <div style={{ gridColumn: 'span 8' }}>
              <p className="label" style={{ marginBottom: '1.25rem' }}>Start a project</p>
              <a href="mailto:design@noorast.co.uk"
                style={{ display: 'block', fontSize: 'clamp(1.75rem,4vw,3.25rem)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--on-accent)', textDecoration: 'none' }}>
                design@noorast.co.uk
              </a>
            </div>
            <div className="contact-plane-side" style={{ gridColumn: '10 / span 3', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1rem' }}>
              <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>
                London, UK<br />Online studio, working across the UK and abroad
              </p>
              <Link to="/contact" style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--on-accent)', textDecoration: 'none', borderBottom: '1.5px solid var(--on-accent)', paddingBottom: '1px', width: 'fit-content' }}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="frame" style={{ paddingTop: 'clamp(3rem,5vw,4.5rem)', paddingBottom: '2.5rem' }}>
          <div className="grid12" style={{ rowGap: '2.5rem', marginBottom: '3rem' }}>
            <div style={{ gridColumn: 'span 4' }} className="footer-brand">
              <p style={{ fontSize: '13px', letterSpacing: '0.34em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem' }}>NOORAST</p>
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: 'rgba(243,240,233,0.6)', maxWidth: '20rem' }}>
                Architecture, interiors, and landscape for considered houses. London and internationally.
              </p>
            </div>
            <div style={{ gridColumn: 'span 4' }} className="footer-col">
              <p className="label" style={{ color: 'rgba(243,240,233,0.5)', marginBottom: '1.125rem' }}>Services</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[['/services/extensions-loft','Extensions & Loft'],['/services/renovation-interiors','Renovation & Interiors'],['/services/new-build','New Build Houses'],['/international','International'],['/services','All services']].map(([h,l]) => (
                  <Link key={h} to={h} className="footer-link" style={{ textDecoration: 'none', fontSize: '0.8125rem', color: 'rgba(243,240,233,0.7)' }}>{l}</Link>
                ))}
              </div>
            </div>
            <div style={{ gridColumn: 'span 4' }} className="footer-col">
              <p className="label" style={{ color: 'rgba(243,240,233,0.5)', marginBottom: '1.125rem' }}>Studio</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[['/work','Work'],['/studio','About'],['/careers','Careers'],['/fee-guide','Fee guide'],['/toolkit','Property Passport'],['/contact','Contact']].map(([h,l]) => (
                  <Link key={h} to={h} className="footer-link" style={{ textDecoration: 'none', fontSize: '0.8125rem', color: 'rgba(243,240,233,0.7)' }}>{l}</Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(243,240,233,0.14)', paddingTop: '1.75rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {/* TODO(Aun): insert Companies House registration number. */}
              <p style={{ fontSize: '0.6875rem', color: 'rgba(243,240,233,0.4)', letterSpacing: '0.02em' }}>
                © {new Date().getFullYear()} Noorast Group Limited. Registered in England and Wales, company no. [TODO].
              </p>
              <p style={{ fontSize: '0.6875rem', color: 'rgba(243,240,233,0.32)', letterSpacing: '0.02em', maxWidth: '34rem' }}>
                An architectural design studio. Where a project needs a registered architect, one is engaged on the team.
              </p>
            </div>
            <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[['/privacy','Privacy'],['/terms','Terms'],['/cookies','Cookies'],['/accessibility','Accessibility']].map(([h,l]) => (
                <Link key={h} to={h} style={{ textDecoration: 'none', fontSize: '0.6875rem', color: 'rgba(243,240,233,0.4)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{l}</Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
