'use client';

import { FeatureCard } from '@/components/ui/FeatureCard';
import { 
  Building2, 
  ClipboardCheck, 
  FileText, 
  CheckCircle, 
  Award, 
  History 
} from 'lucide-react';

const SERVICES = [
  // {
  //   title: 'School Identification',
  //   description: 'Provide essential information about your institution. This step is crucial for accurate assessment and personalized accreditation guidance.',
  //   icon: <Building2 className="w-6 h-6" />,
  //   href: '/school-identification',
  //   actionLabel: 'Fill School Information',
  // },
  // {
  //   title: 'Self-Assessment',
  //   description: 'Empower your institution\'s growth! Our comprehensive self-assessment is your first step towards excellence. Discover your strengths, uncover opportunities, and pave the way for successful accreditation.',
  //   icon: <ClipboardCheck className="w-6 h-6" />,
  //   href: '/self-assessment',
  //   actionLabel: 'Start Self-Assessment',
  // },
  // {
  //   title: 'Accreditation Application',
  //   description: 'Begin your journey towards educational excellence by applying for NESA accreditation. Our streamlined process ensures a smooth experience.',
  //   icon: <FileText className="w-6 h-6" />,
  //   href: '/accreditation_application',
  //   actionLabel: 'Apply Now',
  // },
  {
    title: 'Accredited Schools',
    description: 'View your school\'s past assessments and accreditation requests. Track your progress over time.',
    icon: <History className="w-6 h-6" />,
    href: '/accredited-schools',
    actionLabel: 'View accredited schools',
  },
  {
    title: 'Application Status',
    description: 'Stay informed about your accreditation progress. Track your application status in real-time and receive timely updates.',
    icon: <CheckCircle className="w-6 h-6" />,
    href: '/application-status',
    actionLabel: 'Check Status',
  },
  {
    title: 'Verify Certificate',
    description: 'Ensure the authenticity of accreditation certificates. Our verification system provides quick and reliable results.',
    icon: <Award className="w-6 h-6" />,
    href: '/verify-certificate',
    actionLabel: 'Verify Now',
  },

];

export const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, index) => (
            <FeatureCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              actionLabel={service.actionLabel}
              href={service.href}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 