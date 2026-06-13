import { BrowserRouter, Routes, Route } from 'react-router';
import { ScrollToTop } from './components/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '@/app/components/Layout';
import { Home } from '@/app/pages/Home';
import { WhatWeDo } from '@/app/pages/WhatWeDo';
import { Services } from '@/app/pages/Services';
import { Projects } from '@/app/pages/Projects';
import { Practice } from '@/app/pages/Practice';
import { Careers } from './pages/Careers';
import { FeeCalculator } from '@/app/pages/FeeCalculator';
import { Toolkit } from '@/app/pages/Toolkit';
import { Contact } from '@/app/pages/Contact';
import { NoorastAI } from '@/app/pages/NoorastAI';
import { PlanningReport } from '@/app/pages/PlanningReport';
import { PrePurchase } from '@/app/pages/PrePurchase';
import { PreArchitectureFeasibility } from '@/app/pages/services/PreArchitectureFeasibility';
import { PlanningApplicationManagement } from '@/app/pages/services/PlanningApplicationManagement';
import { ConceptSpatialDesign } from '@/app/pages/services/ConceptSpatialDesign';
import { ResidentialExtensionLoftConversion } from '@/app/pages/services/ResidentialExtensionLoftConversion';
import { TechnicalDesignBuildingRegulations } from '@/app/pages/services/TechnicalDesignBuildingRegulations';
import { TenderContractorCoordination } from '@/app/pages/services/TenderContractorCoordination';
import { PlanningAppealService } from '@/app/pages/services/PlanningAppealService';
import { VictorianSemiDetached } from '@/app/pages/case-studies/VictorianSemiDetached';
import { VictorianTerrace } from '@/app/pages/case-studies/VictorianTerrace';
import { ContemporaryConcreteExtension } from '@/app/pages/case-studies/ContemporaryConcreteExtension';
import { MasterplanVenice } from '@/app/pages/case-studies/MasterplanVenice';
import { NotFound } from '@/app/pages/NotFound';
import { PrivacyPolicy } from '@/app/pages/PrivacyPolicy';
import { TermsOfService } from '@/app/pages/TermsOfService';
import { CookiePolicy } from '@/app/pages/CookiePolicy';
import { Account } from '@/app/pages/Account';
import { International } from '@/app/pages/International';
import { Architectural } from '@/app/pages/Architectural';
import { Interiors } from '@/app/pages/Interiors';
import { Landscape } from '@/app/pages/Landscape';
import { AuthProvider } from '../lib/auth';

export default function App() {
  return (
    <AuthProvider>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="what-we-do" element={<WhatWeDo />} />
            <Route path="services" element={<Services />} />
            <Route path="services/pre-architecture-feasibility" element={<PreArchitectureFeasibility />} />
            <Route path="services/planning-application-management" element={<PlanningApplicationManagement />} />
            <Route path="services/concept-spatial-design" element={<ConceptSpatialDesign />} />
            <Route path="services/residential-extension-loft-conversion" element={<ResidentialExtensionLoftConversion />} />
            <Route path="services/technical-design-building-regulations" element={<TechnicalDesignBuildingRegulations />} />
            <Route path="services/tender-contractor-coordination" element={<TenderContractorCoordination />} />
            <Route path="services/planning-appeal-review" element={<PlanningAppealService />} />
            <Route path="ai" element={<NoorastAI />} />
            <Route path="planning-intelligence" element={<NoorastAI />} />
            <Route path="planning-report" element={<PlanningReport />} />
            <Route path="pre-purchase" element={<PrePurchase />} />
            <Route path="project" element={<Projects />} />
            <Route path="work" element={<Projects />} />
            <Route path="project/victorian-semi-detached-rear-extension" element={<VictorianSemiDetached />} />
            <Route path="project/victorian-terrace-extension" element={<VictorianTerrace />} />
            <Route path="project/contemporary-concrete-extension" element={<ContemporaryConcreteExtension />} />
            <Route path="project/masterplan-venice-housing" element={<MasterplanVenice />} />
            <Route path="practice" element={<Practice />} />
            <Route path="international" element={<International />} />
            <Route path="architectural" element={<Architectural />} />
            <Route path="interiors" element={<Interiors />} />
            <Route path="landscape" element={<Landscape />} />
            <Route path="studio" element={<Practice />} />
            <Route path="contact" element={<Contact />} />
            <Route path="careers" element={<Careers />} />
            <Route path="fee-guide" element={<FeeCalculator />} />
            <Route path="fee-calculator" element={<FeeCalculator />} />
            <Route path="toolkit" element={<Toolkit />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="cookies" element={<CookiePolicy />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Property Passport - Full-screen app without site navigation */}
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
    </AuthProvider>
  );
}