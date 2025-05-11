import { HeroSection } from '@/components/accreditation/HeroSection';
import { ProcessStepsSection } from '@/components/accreditation/ProcessStepsSection';
import { RequestTypesSection } from '@/components/accreditation/RequestTypesSection';
import { ServicesSection } from '@/components/accreditation/ServicesSection';
import { AboutSection } from '@/components/accreditation/AboutSection';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RequestTypesSection />
      <ServicesSection />
      <AboutSection />
    </main>
  );
}
