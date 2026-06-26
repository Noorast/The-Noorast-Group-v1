import { ServiceDetail, type ServiceData } from '../../components/ServiceDetail';
import heroImg from '../../../assets/e947385c703c8e3c623a4d1f62c7deeba551bd6e.webp';

const data: ServiceData = {
  path: '/services/new-build',
  seoTitle: 'New Build House Design · Noorast',
  seoDescription: 'New build house design for infill plots and replacement dwellings. A single house designed from the ground up, led from concept through planning to construction.',
  eyebrow: 'New build houses',
  title: <>A house from<br />the ground up.</>,
  lede: 'A single house on its own plot. Whether an infill site, a replacement dwelling, or a self-build, designed from first principles for the site and the people who will live there.',
  heroImg,
  heroAlt: 'New build house concept study on an urban plot',
  covers: [
    { t: 'Infill & backland plots', d: 'Making a considered house work on a tight or awkward urban site, where the constraints are half the design.' },
    { t: 'Replacement dwellings', d: 'Replacing an existing house with something better suited to how you want to live, within what the site and policy allow.' },
    { t: 'Self-build support', d: 'Leading the design and the planning so a self-build starts from a properly resolved scheme, not a sketch.' },
    { t: 'Through to construction', d: 'From concept and planning to the technical drawings and building control package the build runs on.' },
  ],
  questions: [
    { q: 'Is my plot even viable?', a: 'That is the first thing to find out, and the cheapest mistake to avoid. We look at the site, the local planning policy, and precedent nearby, and give you an honest read before you commit to a full design.' },
    { q: 'How hard is planning for a new house?', a: 'Harder than an extension, generally, and very site dependent. A new dwelling is judged on its own merits against local policy. We are candid about the odds for your specific plot rather than optimistic by default.' },
    { q: 'Can you take it all the way to build?', a: 'Yes. We lead from concept through planning and into the technical drawings and building control package, and stay involved as the house goes up.' },
    { q: 'What will it cost?', a: 'Our design fee is staged and fixed, agreed in writing before each stage. Construction cost is separate and significant for a whole house, we are clear about the design fee and never present it as the build cost.' },
  ],
  stages: [
    { n: '01', t: 'Feasibility', d: 'An honest read on whether the plot will carry the house you want.' },
    { n: '02', t: 'Concept', d: 'The house designed from the site up, developed with you.' },
    { n: '03', t: 'Planning', d: 'A full application prepared, lodged, and seen through.' },
    { n: '04', t: 'Delivery', d: 'Technical and building control drawings, then support through the build.' },
  ],
  planningNote: 'A new dwelling is assessed on its own merits against local planning policy, and approval is never certain. We give a candid view of the prospects for your specific plot and will say so early if we think it is a difficult one.',
};

export function NewBuild() { return <ServiceDetail data={data} />; }
