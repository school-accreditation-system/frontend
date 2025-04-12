import { HeroSection } from '@/components/accreditation/HeroSection';
import { ProcessStepsSection } from '@/components/accreditation/ProcessStepsSection';
import { RequestTypesSection } from '@/components/accreditation/RequestTypesSection';
import { ServicesSection } from '@/components/accreditation/ServicesSection';
import { AboutSection } from '@/components/accreditation/AboutSection';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <ProcessStepsSection />
      <RequestTypesSection />
      <ServicesSection />
      <AboutSection />
    </main>
  );
}
