import { Link } from 'react-router';

export function PlanningAppealService() {
  return (
    <div>
      <section className="max-w-[1440px] mx-auto px-6 py-24 md:px-12 lg:px-16 md:py-32">
        <div className="max-w-4xl">
          <div className="mb-6">
            <Link
              to="/services"
              className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <span>←</span> Back to Services
            </Link>
          </div>
          <div className="mb-8">
            <span className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Post-Decision · Fixed Fee</span>
          </div>
          <h1 className="mb-10">Planning Refusal Review & Appeal Preparation</h1>
          <p className="text-2xl text-foreground leading-relaxed font-light">
            A refusal notice is a document with precise reasons. Most of those reasons are either remediable by design change or challengeable on policy grounds. We establish which, and prepare accordingly.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-20 md:px-12 lg:px-16 border-t border-border pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          <div className="lg:col-span-8">
            <h2 className="mb-8">What the service covers</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Around 17,600 householder planning applications are refused in England every year. Most of those refusals are recoverable — either by a revised application that addresses the officer's specific concerns, or by an appeal where the officer's interpretation of policy is incorrect or inconsistent with comparable decisions.
              </p>
              <p>
                The problem is the 12-week appeal window. That is how long you have from the date of the decision notice to submit a householder appeal to the Planning Inspectorate. Many homeowners spend the first four weeks trying to understand the refusal before looking for help. By then, the window is closing. And around 50% of all appeals submitted in England are invalid at the point of submission — wrong forms, missing documents, or weak grounds.
              </p>
              <p>
                This service exists to prevent that. We read your refusal notice and officer's report on day one. We tell you whether to appeal or resubmit — and which gives the better chance of the outcome you want. If you appeal, we prepare the grounds. If you resubmit, we redesign.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            {[
              { tier: 'Refusal review', price: '£350', desc: 'We read the refusal, assess the grounds, and give you a clear recommendation: appeal or resubmit, and why. Written report within 5 working days.' },
              { tier: 'Appeal preparation', price: '£850', desc: 'Full appeal grounds prepared for written representations. Includes refusal review, grounds of appeal, statement of case, and supporting drawings where required.' },
              { tier: 'Resubmission', price: 'From £1,200', desc: 'Revised design addressing the refusal reasons, with new application drawings and supporting statement. Priced per project.' },
            ].map(t => (
              <div key={t.tier} className="border border-border/50 p-6">
                <div className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground/50 mb-2">{t.tier}</div>
                <div className="text-2xl font-light mb-3">{t.price}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-20 md:px-12 lg:px-16 border-t border-border bg-muted/5">
        <div className="max-w-3xl mb-16">
          <h2 className="mb-6">What we look at</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border/50">
          {[
            { num: '01', title: 'The policy cited', body: 'Every refusal cites a policy. We check whether that policy applies to your project, whether it has been correctly interpreted, and whether the authority has refused similar applications on the same grounds before — or approved them.' },
            { num: '02', title: 'Comparable decisions', body: 'We look at how your local planning authority has decided comparable applications. If there is an inconsistency — extensions of the same scale approved nearby, or appeal decisions that contradict the officer\'s reasoning — that is grounds for challenge.' },
            { num: '03', title: 'Design remediability', body: 'Where the refusal is on design grounds — height, depth, materials, relationship to neighbours — we assess whether a modified scheme would satisfy the concern or whether the officer\'s interpretation of the policy is the problem.' },
            { num: '04', title: 'Appeal validity', body: 'Around 50% of householder appeals are invalid at submission. We ensure every document is in place, the correct form is used, and the grounds are specific and evidence-based before anything is submitted.' },
          ].map((item, i) => (
            <div key={item.num} className={`p-10 ${i % 2 === 0 ? 'border-r border-border/50' : ''} ${i < 2 ? 'border-b border-border/50' : ''}`}>
              <div className="text-[9px] tracking-[0.18em] uppercase text-muted-foreground/50 mb-3">{item.num}</div>
              <h3 className="text-base font-medium mb-4">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 py-20 md:px-12 lg:px-16 border-t border-border">
        <div className="max-w-3xl">
          <h2 className="mb-8">The numbers</h2>
          <div className="grid grid-cols-3 gap-0 border border-border/50 mb-12">
            {[
              { num: '17,600', label: 'Householder refusals per year in England' },
              { num: '34%', label: 'Householder appeal success rate (2024/25)' },
              { num: '12 weeks', label: 'Window to appeal from decision notice' },
            ].map((s, i) => (
              <div key={s.label} className={`p-8 text-center ${i < 2 ? 'border-r border-border/50' : ''}`}>
                <div className="text-3xl font-light mb-2">{s.num}</div>
                <div className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground/60 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A 34% householder appeal success rate means roughly one in three appeals is allowed. The ones that fail do so because the officer was right, or because the appeal was prepared poorly. The ones that succeed do so because the planning policy was misapplied, the officer's reasoning was inconsistent, or the design was modified to remove the legitimate concern. Knowing which situation you are in is the first question this service answers.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 pb-32 md:px-12 lg:px-16 border-t border-border pt-24">
        <div className="max-w-3xl">
          <h2 className="mb-6">Get started</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Send us the decision notice, the officer's report (downloadable from the planning portal), and the address. We will respond within two working days with an initial assessment.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background text-xs tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors"
          >
            Send your refusal notice →
          </Link>
        </div>
      </section>
    </div>
  );
}
