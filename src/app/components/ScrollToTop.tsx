import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Resets scroll to the very top on every route change.
// Fires immediately and again after layout settles, so reveal animations
// can't leave a residual offset.
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    toTop();
    const r1 = requestAnimationFrame(() => {
      toTop();
      requestAnimationFrame(toTop);
    });
    return () => cancelAnimationFrame(r1);
  }, [pathname]);
  return null;
}
