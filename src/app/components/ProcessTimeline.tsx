type Stage = { n: string; title: string; duration: string; deliverable: string };

export function ProcessTimeline({ stages, eyebrow = 'How a project runs' }: { stages: Stage[]; eyebrow?: string }) {
  return (
    <section style={{ borderTop: '1px solid rgba(40,30,20,0.07)' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <p className="reveal" style={{ fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted-foreground)', opacity: 0.5, marginBottom: '3rem' }}>
          {eyebrow}
        </p>
        <div className="timeline reveal">
          {stages.map(s => (
            <div key={s.n} className="timeline-stage">
              <span className="timeline-n">{s.n}</span>
              <span className="timeline-t">{s.title}</span>
              <span className="timeline-d">{s.duration}</span>
              <span className="timeline-r">{s.deliverable}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
