import { ServiceDetail, type ServiceData } from '../../components/ServiceDetail';
import heroImg from '../../../assets/d349c2e1b0a0adb43813b52e67d9047ecc52f575.webp';

const data: ServiceData = {
  path: '/services/extensions-loft',
  seoTitle: 'Extension & Loft Conversion Design · Noorast',
  seoDescription: 'Design and planning for rear extensions, side returns, and loft conversions on London homes. Fixed design fee, honest planning advice, drawings your builder can work from.',
  eyebrow: 'Extensions & loft conversions',
  title: <>More space,<br />done properly.</>,
  lede: 'The work most homeowners come to us for. A rear extension, a side return, a loft. We design it, take it through planning, and draw it up so it can actually be built.',
  heroImg,
  heroAlt: 'Loft conversion concept study, dormer against existing roofline',
  covers: [
    { t: 'Rear & side return extensions', d: 'Single and double storey additions, kitchen and living space, the line where the new work meets the old handled with care.' },
    { t: 'Loft conversions', d: 'Dormers, hip to gable, rooflights. Worked through for headroom, stairs, and how the new floor sits under the existing ridge.' },
    { t: 'Planning & permitted development', d: 'We work out honestly whether you need full planning or whether it falls under permitted development, before you spend on anything.' },
    { t: 'Building control drawings', d: 'Once the design is agreed, the technical set your builder and building control need, so the thing gets built as drawn.' },
  ],
  questions: [
    { q: 'Do I even need planning permission?', a: 'Often not. A lot of extensions and lofts fall under permitted development, which means no full application. We check your property\u2019s planning history and the current rules first, and tell you plainly which route yours takes.' },
    { q: 'How long does it take before I can build?', a: 'Design and a planning decision usually run over a few months, depending on the council and the complexity. We set out a realistic timeline at the start rather than an optimistic one.' },
    { q: 'Will you be there once the builder starts?', a: 'Yes. We prepare the drawings your builder works from and stay involved through construction, so questions on site come back to the person who designed it.' },
    { q: 'What will it cost?', a: 'Our design fee is a fixed figure, agreed in writing before we start. Construction cost is separate and depends on your builder and your choices. The fee guide gives an honest indication of the design fee only.' },
  ],
  stages: [
    { n: '01', t: 'First look', d: 'A free conversation, then an honest view on what is possible and likely.' },
    { n: '02', t: 'Design', d: 'Concept worked up with you, tested for light, space, and planning.' },
    { n: '03', t: 'Planning', d: 'Application prepared, lodged, and seen through to a decision.' },
    { n: '04', t: 'Build drawings', d: 'Technical set for building control and your builder, then support on site.' },
  ],
  planningNote: 'We assess the likelihood of planning success honestly and explain the risks. We do not guarantee approvals, no one credible can, and we will tell you early if we think a scheme is unlikely to pass.',
};

export function ExtensionsLoft() { return <ServiceDetail data={data} />; }
