import heroImage    from '../../assets/7a0b078181e2beafc5cb9b6f72678896e6381750.webp';
import rearImage    from '../../assets/d349c2e1b0a0adb43813b52e67d9047ecc52f575.webp';
import modernImage  from '../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.webp';
import projectImage from '../../assets/e947385c703c8e3c623a4d1f62c7deeba551bd6e.webp';
import veniceImage  from '../../assets/fd485c30db969be36e00beb80f2ac31e3eea017e.webp';
import studioImage  from '../../assets/289ed8ade673ae4b005ad0444e26a0ecdcbdce85.webp';
import { Link } from 'react-router';
import { SEO } from '@/app/components/SEO';
import { useEffect, useState, useCallback, useRef } from 'react';

const SLIDES = [heroImage, rearImage, modernImage, veniceImage];

const RAIL = [
  { fig: '01', img: rearImage,    cat: 'Loft conversion, study' },
  { fig: '02', img: modernImage,  cat: 'Side extension, concept' },
  { fig: '03', img: heroImage,    cat: 'Victorian terrace, study', pos: 'center 38%' },
  { fig: '04', img: projectImage, cat: 'New build, concept' },
  { fig: '05', img: veniceImage,  cat: 'International, concept' },
  { fig: '06', img: studioImage,  cat: 'Garden studio, drawing' },
];

export function Home() {
  const [slide, setSlide] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const next = useCallback(() => setSlide(s => (s + 1) % SLIDES.length), []);
  const prev = useCallback(() => setSlide(s => (s - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => { const t = setInterval(next, 7000); return () => clearInterval(t); }, [next]);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.04 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const rail = railRef.current; if (!rail) return;
    let down = false, sx = 0, sl = 0;
    const md = (e: MouseEvent) => { down = true; sx = e.pageX - rail.offsetLeft; sl = rail.scrollLeft; rail.style.cursor = 'grabbing'; };
    const mu = () => { down = false; rail.style.cursor = 'grab'; };
    const mm = (e: MouseEvent) => { if (!down) return; e.preventDefault(); rail.scrollLeft = sl - (e.pageX - rail.offsetLeft - sx) * 1.4; };
    rail.addEventListener('mousedown', md); rail.addEventListener('mouseleave', mu); rail.addEventListener('mouseup', mu); rail.addEventListener('mousemove', mm);
    return () => { rail.removeEventListener('mousedown', md); rail.removeEventListener('mouseleave', mu); rail.removeEventListener('mouseup', mu); rail.removeEventListener('mousemove', mm); };
  }, []);

  return (
    <div>
      <SEO
        title="Noorast, a London design studio"
        description="A London studio designing houses, interiors, and the ground between them. Residential work, in the UK and internationally."
        path="/"
      />

      {/* ══ HERO — split block: type panel | image, divided by the grid ══ */}
      <section className="rule-strong-b" style={{ borderTop: 'none' }}>
        <div className="frame">
          <div className="hero-split" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', minHeight: 'min(78vh, 760px)', borderLeft: '1px solid var(--line-soft)', borderRight: '1px solid var(--line-soft)' }}>
            {/* Type panel */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'clamp(1.5rem,3vw,3rem)', borderRight: '1.5px solid var(--ink)' }}>
              <p className="label reveal">Architecture, interiors, landscape</p>
              <div className="reveal" style={{ transitionDelay: '0.08s' }}>
                <h1 style={{ marginBottom: '1.5rem' }}>Houses,<br />and the life<br />inside them.</h1>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '26rem' }}>
                  A London studio working on a few residential projects at a time, in the UK and abroad. We design the building, the rooms, and the ground between them as one problem.
                </p>
              </div>
              <div className="reveal" style={{ transitionDelay: '0.16s', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/work" className="btn btn-solid">See the work</Link>
                <Link to="/services" className="btn btn-line">What we do</Link>
              </div>
            </div>
            {/* Image panel */}
            <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--paper-2)' }}>
              {SLIDES.map((img, i) => (
                <img key={i} src={img} alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async"
                  className={i === slide ? 'hero-slide-active' : ''}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', opacity: i === slide ? 1 : 0, transition: 'opacity 1.4s ease-out' }} />
              ))}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: 'linear-gradient(transparent, rgba(26,25,22,0.5))' }}>
                <span style={{ fontSize: '0.6875rem', fontVariantNumeric: 'tabular-nums', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>
                  {String(slide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <button onClick={prev} aria-label="Previous" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontSize: '0.6875rem', fontWeight: 500, padding: 0 }}>Prev</button>
                  <button onClick={next} aria-label="Next" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontSize: '0.6875rem', fontWeight: 500, padding: 0 }}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATEMENT ROW ════════════════════════════════════ */}
      <section className="frame" style={{ paddingTop: 'clamp(3rem,5vw,4.5rem)', paddingBottom: 'clamp(3rem,5vw,4.5rem)' }}>
        <div className="grid12">
          <p className="label reveal" style={{ gridColumn: 'span 3' }}>Selected work</p>
          <div className="reveal" style={{ gridColumn: '4 / span 8', transitionDelay: '0.06s' }}>
            <p style={{ fontSize: 'clamp(1.25rem,2.4vw,2rem)', fontWeight: 500, lineHeight: 1.18, letterSpacing: '-0.02em', maxWidth: '34rem' }}>
              We are two years old. What follows is concept work and projects in progress, each shown at the stage it has reached.
            </p>
          </div>
        </div>
      </section>

      {/* ══ WORK RAIL ════════════════════════════════════════ */}
      <section className="rule-strong-t rule-b">
        <div ref={railRef} className="rail">
          {RAIL.map((r, i) => (
            <Link key={r.fig} to="/work" className="rail-cell group" style={{ width: 'clamp(240px, 26vw, 340px)', textDecoration: 'none', borderRight: '1px solid var(--line-soft)' }}>
              <div className="imgblock" style={{ aspectRatio: '4/5' }}>
                <img src={r.img} alt={r.cat} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: r.pos || 'center' }} />
              </div>
              <div style={{ padding: '0.875rem 1rem 1.25rem', display: 'flex', alignItems: 'baseline', gap: '0.875rem' }}>
                <span className="index" style={{ fontSize: '0.625rem' }}>{r.fig}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--ink-2)' }}>{r.cat}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="frame" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.875rem', paddingBottom: '0.875rem', borderTop: '1px solid var(--line-soft)' }}>
          <span className="label">Drag to browse</span>
          <Link to="/work" className="tlink">All work</Link>
        </div>
      </section>

      {/* ══ EDITORIAL GRID — three large blocks on the 12-col ══ */}
      <section className="frame" style={{ paddingTop: 'clamp(3rem,6vw,5rem)', paddingBottom: 'clamp(3rem,6vw,5rem)' }}>
        <div className="grid12" style={{ rowGap: '2.5rem' }}>
          <Link to="/work" className="group reveal" style={{ gridColumn: 'span 7', textDecoration: 'none' }}>
            <div className="imgblock" style={{ aspectRatio: '16/11' }}>
              <img src={heroImage} alt="Victorian terrace study" loading="lazy" style={{ objectPosition: 'center 38%' }} />
            </div>
            <div className="fig"><span className="fig-n">fig. 01</span><span className="fig-t">Victorian terrace, rear, study</span></div>
          </Link>
          <Link to="/work" className="group reveal home-block-r" style={{ gridColumn: '9 / span 4', textDecoration: 'none', transitionDelay: '0.08s', alignSelf: 'end' }}>
            <div className="imgblock" style={{ aspectRatio: '3/4' }}>
              <img src={rearImage} alt="Loft conversion study" loading="lazy" />
            </div>
            <div className="fig"><span className="fig-n">fig. 02</span><span className="fig-t">Loft conversion, study</span></div>
          </Link>
          <Link to="/work" className="group reveal home-block-l" style={{ gridColumn: 'span 4', textDecoration: 'none' }}>
            <div className="imgblock" style={{ aspectRatio: '3/4' }}>
              <img src={modernImage} alt="Side extension concept" loading="lazy" />
            </div>
            <div className="fig"><span className="fig-n">fig. 03</span><span className="fig-t">Side extension, concept</span></div>
          </Link>
          <Link to="/work" className="group reveal" style={{ gridColumn: '6 / span 7', textDecoration: 'none', alignSelf: 'end' }}>
            <div className="imgblock" style={{ aspectRatio: '16/10' }}>
              <img src={veniceImage} alt="International concept" loading="lazy" />
            </div>
            <div className="fig"><span className="fig-n">fig. 05</span><span className="fig-t">International, concept</span></div>
          </Link>
        </div>
      </section>

      {/* ══ FOUNDING IDEA — stark type block, no ornament ════ */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="frame" style={{ paddingTop: 'clamp(4rem,8vw,7rem)', paddingBottom: 'clamp(4rem,8vw,7rem)' }}>
          <div className="grid12">
            <p className="label reveal" style={{ gridColumn: 'span 12', color: 'rgba(243,240,233,0.45)', marginBottom: '3rem' }}>The idea the studio is built on</p>
            <blockquote className="reveal founding-q" style={{ gridColumn: 'span 9', margin: 0, fontSize: 'clamp(1.5rem,3.4vw,3rem)', fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.025em', color: 'var(--paper)' }}>
              A building becomes architecture through the life that fills it, not the photograph taken the day it is finished.
            </blockquote>
            <div className="reveal founding-side" style={{ gridColumn: '5 / span 7', marginTop: '3rem', transitionDelay: '0.1s' }}>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'rgba(243,240,233,0.6)', maxWidth: '34rem', marginBottom: '1.5rem' }}>
                So we design for use before image. Where the morning light lands, how a hallway holds coats and bikes and noise, which wall a family actually gathers against. The drawings serve that, not the other way round. After Aldo Rossi, who argued a city is made by the people who inhabit it.
              </p>
              <Link to="/studio" style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--paper)', textDecoration: 'none', borderBottom: '1.5px solid var(--paper)', paddingBottom: '1px' }}>About the studio</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DISCIPLINES — ruled modular list ═════════════════ */}
      <section className="frame" style={{ paddingTop: 'clamp(3rem,6vw,5rem)', paddingBottom: 'clamp(2rem,4vw,3rem)' }}>
        <div className="grid12" style={{ marginBottom: '2.5rem' }}>
          <p className="label reveal" style={{ gridColumn: 'span 3' }}>Three disciplines</p>
          <h2 className="reveal" style={{ gridColumn: '4 / span 8', transitionDelay: '0.06s', maxWidth: '20ch' }}>One studio for the whole house and its ground.</h2>
        </div>
        {[
          { n: '01', t: 'Architecture', to: '/architectural', d: 'Extensions, loft conversions, and new houses, from the first sketch through planning and building control to the set your builder works from on site.' },
          { n: '02', t: 'Interiors', to: '/interiors', d: 'Plan, light, materials, and joinery, resolved with the same care as the structure. Designed around how you live, not how a photograph reads.' },
          { n: '03', t: 'Landscape', to: '/landscape', d: 'The garden, the threshold, the approach. The outside designed as part of the same idea as the inside, not added once the house is done.' },
        ].map((d, i) => (
          <Link key={d.n} to={d.to} className="reveal disc-row" style={{ display: 'grid', gridTemplateColumns: '1fr 4fr 6fr 1fr', columnGap: 'clamp(1rem,2vw,2rem)', alignItems: 'start', padding: '2rem 0', borderTop: '1px solid var(--line-soft)', textDecoration: 'none', transitionDelay: `${i * 0.05}s` }}>
            <span className="index-lg">{d.n}</span>
            <h3 style={{ alignSelf: 'center' }}>{d.t}</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--ink-2)', alignSelf: 'center' }}>{d.d}</p>
            <span className="disc-arrow" style={{ justifySelf: 'end', alignSelf: 'center', fontSize: '0.875rem', color: 'var(--ink-3)' }}>→</span>
          </Link>
        ))}
      </section>

      {/* ══ PROCESS ══════════════════════════════════════════ */}
      <section className="frame" style={{ paddingTop: 'clamp(3rem,6vw,5rem)', paddingBottom: 'clamp(3rem,6vw,5rem)' }}>
        <div className="grid12" style={{ marginBottom: '2.5rem' }}>
          <p className="label reveal" style={{ gridColumn: 'span 3' }}>How a project runs</p>
          <h2 className="reveal" style={{ gridColumn: '4 / span 8', transitionDelay: '0.06s', maxWidth: '18ch' }}>The same four stages, every time.</h2>
        </div>
        <div className="timeline reveal">
          {[
            { n: '01', t: 'Brief', r: 'Stage 0 to 1', d: 'We work out what you actually need, what the site and planning allow, and agree a fixed scope in writing.' },
            { n: '02', t: 'Research', r: 'Stage 1 to 2', d: 'Planning policy, local precedent, and the constraints that decide what is worth drawing.' },
            { n: '03', t: 'Design', r: 'Stage 2 to 3', d: 'The scheme, developed with you and tested against light, use, and budget at each step.' },
            { n: '04', t: 'Delivery', r: 'Stage 4', d: 'Technical drawings, building control, and support on site through to completion.' },
          ].map(p => (
            <div key={p.n} className="timeline-stage">
              <span className="timeline-n">{p.n}</span>
              <span className="timeline-t">{p.t}</span>
              <span className="timeline-d">{p.r}</span>
              <span className="timeline-r">{p.d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CLOSING ══════════════════════════════════════════ */}
      <section className="frame rule-strong-t" style={{ paddingTop: 'clamp(3rem,5vw,4rem)', paddingBottom: 'clamp(3rem,5vw,4rem)' }}>
        <div className="grid12" style={{ alignItems: 'end' }}>
          <h2 className="reveal" style={{ gridColumn: 'span 7' }}>The first conversation costs nothing.</h2>
          <div className="reveal closing-side" style={{ gridColumn: '9 / span 4', transitionDelay: '0.08s' }}>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: '1.25rem' }}>
              Tell us what you are thinking of and we will give you an honest view, and a fixed fee if you want to go ahead.
            </p>
            <Link to="/contact" className="tlink">Start a conversation</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
