type Stage = { n: string; title: string; duration: string; deliverable: string };

export function ProcessTimeline({ stages, eyebrow = 'How a project runs' }: { stages: Stage[]; eyebrow?: string }) {
  return (
    <section className="joint">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 measure-lg">
        <div className="reveal" style={{ marginBottom: '3.25rem', maxWidth: '32rem' }}>
          <p className="eyebrow-tick" style={{ fontSize: '0.625rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.45, marginBottom: '1.25rem' }}>
            {eyebrow}
          </p>
          <p style={{ fontSize: 'clamp(1.0625rem, 1.5vw, 1.3125rem)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--foreground)' }}>
            A clear sequence, agreed at the outset, so you always know what happens next, and what you will have in hand at each stage.
          </p>
        </div>
        <div className="timeline reveal">
          {stages.map(st => (
            <div key={st.n} className="timeline-stage">
              <span className="timeline-n index-mark">{st.n}</span>
              <span className="timeline-t">{st.title}</span>
              <span className="timeline-d">{st.duration}</span>
              <span className="timeline-r">{st.deliverable}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
