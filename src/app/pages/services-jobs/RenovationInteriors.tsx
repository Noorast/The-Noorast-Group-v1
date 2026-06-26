import { ServiceDetail, type ServiceData } from '../../components/ServiceDetail';
import heroImg from '../../../assets/e58b5efe29e6b030b0baff045b305e756b3d587b.webp';

const data: ServiceData = {
  path: '/services/renovation-interiors',
  seoTitle: 'Renovation & Interior Design · Noorast',
  seoDescription: 'Whole-house renovation and interior design for London homes. Reworking how a house lives, room by room, with the inside considered as carefully as the structure.',
  eyebrow: 'Renovation & interiors',
  title: <>Make the house<br />work for you.</>,
  lede: 'Sometimes the answer is not more space but better space. Reworking how a house lives, the plan, the light, the materials, the joinery, so the place fits the life in it.',
  heroImg,
  heroAlt: 'Interior renovation concept study',
  covers: [
    { t: 'Whole-house renovation', d: 'Reworking the plan of an existing house, opening up or dividing, so it suits how you actually live rather than how it was built.' },
    { t: 'Interior design', d: 'Materials, light, and joinery resolved properly, the inside thought about with the same care as the structure.' },
    { t: 'Kitchens & key rooms', d: 'The rooms that carry the day, designed in detail, from layout through to the fittings and finishes.' },
    { t: 'Working with period homes', d: 'Older houses handled with respect for what is worth keeping and clarity about what is not.' },
  ],
  questions: [
    { q: 'Can you do interiors without an extension?', a: 'Yes. Interiors work perfectly well on their own. Plenty of houses do not need to get bigger, they need the existing space to work harder and feel considered.' },
    { q: 'Do renovations need planning permission?', a: 'Internal work usually does not, though listed buildings and conservation areas have their own rules. We check your property\u2019s position before any work is planned and tell you where consents are needed.' },
    { q: 'Will it be disruptive?', a: 'Renovation is disruptive, there is no honest way around that. What we can do is plan it so the disruption is contained and sequenced, and so you know what to expect before it starts.' },
    { q: 'What will it cost?', a: 'Our design fee is fixed and agreed in writing up front. Construction and finishes are separate and depend on scope and your choices. We are clear about the design fee from the start.' },
  ],
  stages: [
    { n: '01', t: 'First look', d: 'A free conversation about the house and how you want it to work.' },
    { n: '02', t: 'Design', d: 'The reworked plan and the interior developed with you in detail.' },
    { n: '03', t: 'Specification', d: 'Materials, finishes, and joinery drawn and specified properly.' },
    { n: '04', t: 'On site', d: 'Drawings your builder works from, with us involved as work goes on.' },
  ],
  planningNote: 'Where a project touches a listed building or sits in a conservation area, additional consents apply. We identify these early and are honest about what they mean for time and feasibility.',
};

export function RenovationInteriors() { return <ServiceDetail data={data} />; }
