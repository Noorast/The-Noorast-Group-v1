import { Link, Outlet, useLocation } from 'react-router';
import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import { AuthModal } from './AuthModal';

const ACCENT = '#FF671F'; // Pantone 165

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
      { threshold: 0.01, rootMargin: '0px 0px -4% 0px' }
    );
    els.forEach(el => io.observe(el));
    // Robustness: nothing may remain hidden if the observer misfires
    const fallback = window.setTimeout(() => els.forEach(el => el.classList.add('visible')), 2500);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');



  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', overflowX: 'hidden' }}>

      {/* ── HEADER — original Noorast identity ───────────── */}
      <header className="sticky top-0 z-50 transition-all duration-300"
        style={{ background: '#ffffff', borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0,0,0,0.03)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between" style={{ height: '5rem' }}>

            {/* Wordmark — original tracked Aktiv Grotesk */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '15px', letterSpacing: '0.42em', textTransform: 'uppercase', fontWeight: 400, color: 'var(--foreground)' }}>
                NOORAST
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              <Link to="/work" className={`nav-link${isActive('/work') || isActive('/project') ? ' active' : ''}`}>Work</Link>
              <Link to="/services" className={`nav-link${isActive('/services') || isActive('/architectural') || isActive('/interiors') || isActive('/landscape') ? ' active' : ''}`}>Services</Link>
              <Link to="/studio" className={`nav-link${isActive('/studio') || isActive('/practice') ? ' active' : ''}`}>Studio</Link>
              <Link to="/contact" className={`nav-link${isActive('/contact') ? ' active' : ''}`}>Contact</Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-5">
              {user ? (
                <Link to="/account" className="hidden md:flex items-center gap-1.5"
                  style={{ textDecoration: 'none', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                  <User size={11} /> Account
                </Link>
              ) : (
                <button onClick={() => setAuthModal('signin')}
                  className="hidden md:flex items-center gap-1.5"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                  <User size={11} /> Sign in
                </button>
              )}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground)', padding: 4 }}>
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {authModal && <AuthModal defaultMode={authModal} onClose={() => setAuthModal(null)} />}

          {/* Mobile nav */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-10 pt-6" style={{ borderTop: '1px solid rgba(40,30,20,0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  ['/work', 'Work'],
                  ['/services', 'Services'],
                  ['/international', 'International'],
                  ['/studio', 'Studio'],
                  ['/contact', 'Contact'],
                ].map(([path, label]) => (
                  <Link key={path} to={path}
                    style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 300, color: 'var(--foreground)', padding: '1rem 0', borderBottom: '1px solid rgba(40,30,20,0.06)', letterSpacing: '-0.01em' }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1"><Outlet /></main>

      {/* ── NAVY CONTACT BAND ────────────────────────────── */}
      <section style={{ background: ACCENT }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <a href="mailto:design@noorast.co.uk"
                style={{ fontSize: '1.0625rem', color: '#ffffff', textDecoration: 'none', display: 'block', marginBottom: '0.5rem' }}>
                design@noorast.co.uk
              </a>
              <p style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginTop: '1.25rem' }}>
                London, United Kingdom<span className="brand-dot" />Online-first studio
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                Studio enquiries<br />welcome
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER — original Noorast ghosted wordmark ───── */}
      <footer style={{ borderTop: '1px solid rgba(40,30,20,0.07)', background: 'var(--background)' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-10 md:pt-20 md:pb-12">

          <div style={{ marginBottom: '3rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, color: 'rgba(40,30,20,0.06)' }}>
                NOORAST
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1rem', maxWidth: 240 }}>
                A design studio working across architecture, interiors, and landscape. London and internationally.
              </p>
              <a href="mailto:design@noorast.co.uk"
                style={{ fontSize: '0.75rem', color: 'var(--foreground)', textDecoration: 'none', borderBottom: '1px solid rgba(40,30,20,0.15)', paddingBottom: 1 }}>
                design@noorast.co.uk
              </a>
            </div>
            <div>
              <p style={{ fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.5, marginBottom: '0.875rem' }}>Services</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[['/architectural', 'Architectural Design'], ['/interiors', 'Interior Design'], ['/landscape', 'Landscape Design'], ['/international', 'International Projects']].map(([href, label]) => (
                  <Link key={href} to={href} style={{ textDecoration: 'none', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.5, marginBottom: '0.875rem' }}>Studio</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[['/work', 'Work'], ['/studio', 'About'], ['/careers', 'Careers'], ['/fee-guide', 'Fee guide'], ['/toolkit', 'Property Passport'], ['/contact', 'Contact'], ['/services', 'Services']].map(([href, label]) => (
                  <Link key={href} to={href} style={{ textDecoration: 'none', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{label}</Link>
                ))}
              </div>
            </div>
            
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(40,30,20,0.07)' }}>
            <p style={{ fontSize: '0.625rem', color: 'var(--muted-foreground)', opacity: 0.45, letterSpacing: '0.03em', lineHeight: 1.7 }}>
              © {new Date().getFullYear()} Noorast Group Limited<span className="brand-dot" />Registered in England and Wales
            </p>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {[['/privacy', 'Privacy'], ['/terms', 'Terms'], ['/cookies', 'Cookies']].map(([href, label]) => (
                <Link key={href} to={href}
                  style={{ textDecoration: 'none', fontSize: '0.625rem', color: 'var(--muted-foreground)', opacity: 0.4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
