import { BrowserRouter, Routes, Route } from 'react-router';
import { ScrollToTop } from './components/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from '@/app/components/Layout';
import { Home } from '@/app/pages/Home';
import { Services } from '@/app/pages/Services';
import { Projects } from '@/app/pages/Projects';
import { Practice } from '@/app/pages/Practice';
import { Careers } from './pages/Careers';
import { FeeCalculator } from '@/app/pages/FeeCalculator';
import { Toolkit } from '@/app/pages/Toolkit';
import { Contact } from '@/app/pages/Contact';
import { NotFound } from '@/app/pages/NotFound';
import { PrivacyPolicy } from '@/app/pages/PrivacyPolicy';
import { TermsOfService } from '@/app/pages/TermsOfService';
import { CookiePolicy } from '@/app/pages/CookiePolicy';
import { Accessibility } from '@/app/pages/Accessibility';
import { Account } from '@/app/pages/Account';
import { International } from '@/app/pages/International';
import { Architectural } from '@/app/pages/Architectural';
import { Interiors } from '@/app/pages/Interiors';
import { Landscape } from '@/app/pages/Landscape';
import { ExtensionsLoft } from '@/app/pages/services-jobs/ExtensionsLoft';
import { RenovationInteriors } from '@/app/pages/services-jobs/RenovationInteriors';
import { NewBuild } from '@/app/pages/services-jobs/NewBuild';
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
            <Route path="services" element={<Services />} />
            <Route path="services/extensions-loft" element={<ExtensionsLoft />} />
            <Route path="services/renovation-interiors" element={<RenovationInteriors />} />
            <Route path="services/new-build" element={<NewBuild />} />
            <Route path="project" element={<Projects />} />
            <Route path="work" element={<Projects />} />
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
            <Route path="accessibility" element={<Accessibility />} />
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