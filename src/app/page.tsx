import { HeroSection } from '@/components/accreditation/HeroSection';
import { ProcessStepsSection } from '@/components/accreditation/ProcessStepsSection';
import { RequestTypesSection } from '@/components/accreditation/RequestTypesSection';
import { ServicesSection } from '@/components/accreditation/ServicesSection';
import { AboutSection } from '@/components/accreditation/AboutSection';
import Header from '@/components/Header';
import Link from 'next/link';
import { ArrowRight, ListChecks } from 'lucide-react';

const SERVICES = [{
  title: 'Accredited Schools',
  description: 'View your school\'s past assessments and accreditation requests. Track your progress over time and learn from successful accreditation examples.',
  icon: <ListChecks className="w-8 h-8 text-primary" />,
  href: '/accredited-schools',
  actionLabel: 'View accredited schools',
  bgColor: 'bg-blue-100',
  iconColor: 'text-primary',
  topColor: 'bg-primary',
  hoverColor: 'hover:text-primary',
  linkColor: 'text-primary',
},]

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <ProcessStepsSection />
      <div className="flex-col items-center justify-center  py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-4">Verify school's accreditation </h1>
           <div className="flex items-center justify-center gap-8 mt-10">
            {SERVICES.map((service, index) => (
              <div 
                key={service.title} 
                className="flex flex-col h-full rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg relative w-[30vw]"
              >
                {/* Top color bar */}
                <div className={service.topColor + " h-2 w-full"}></div>
                
                {/* Card content */}
                <div className="flex-1 p-8 bg-white">
                  <div className={`${service.bgColor} p-3 rounded-full inline-flex mb-5 w-16 h-16 items-center justify-center`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  
                  <Link 
                    href={service.href}
                    className={`inline-flex items-center font-medium ${service.linkColor} ${service.hoverColor}`}
                  >
                    {service.actionLabel}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
      </div>
      <RequestTypesSection />
      <ServicesSection />
      <AboutSection />
    </main>
  );
}
