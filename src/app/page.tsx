import { AboutSection } from '@/components/accreditation/AboutSection';
import { HeroSection } from '@/components/accreditation/HeroSection';
import { RequestTypesSection } from '@/components/accreditation/RequestTypesSection';
import { ServicesSection } from '@/components/accreditation/ServicesSection';

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