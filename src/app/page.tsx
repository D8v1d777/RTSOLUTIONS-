import { Hero } from '@/components/sections/Hero';
import { StudioManifesto } from '@/components/sections/StudioManifesto';
import { Capabilities } from '@/components/sections/Capabilities';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Process } from '@/components/sections/Process';
import { WhyRTSolutions } from '@/components/sections/WhyRTSolutions';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <StudioManifesto />
        <Capabilities />
        <SelectedWork />
        <Process />
        <WhyRTSolutions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}