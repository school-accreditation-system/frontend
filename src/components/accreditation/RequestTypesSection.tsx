'use client';

import { CheckCircle } from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { useRouter } from 'next/navigation';

const REQUEST_TYPES = [
  {
    title: 'New School Registration',
    description: 'Start your journey in education by registering a new school. Get guidance on requirements and standards for establishing an educational institution.',
    requestType: 'New School',
  },
  {
    title: 'Submit a Claim',
    description: 'Have concerns about an accredited institution? Submit a formal claim for investigation and resolution.',
    href: '/submit_claim',
  },
  {
    title: 'TVET Trades',
    description: 'Apply for accreditation of specific TVET trades in sectors like Construction, ICT, Agriculture, and more. Expand your institution\'s vocational offerings.',
    requestType: 'TVET Trades',
  },
  {
    title: 'General Combinations',
    description: 'Choose general education combinations to expand your school\'s offerings.',
    requestType: 'General Combinations',
  },
  {
    title: 'Professional Combinations',
    description: 'Opt for professional education paths to enhance your institution\'s curriculum.',
    requestType: 'Professional Combinations',
  },
  {
    title: 'Ordinary Level',
    description: 'Apply to offer or update ordinary level education at your school.',
    requestType: 'Ordinary Level',
  },
  {
    title: 'Primary Level',
    description: 'Start or expand primary level education to build a strong foundation for students.',
    requestType: 'Primary Level',
  },
  {
    title: 'Pre-primary Level',
    description: 'Initiate or enhance pre-primary level education for early childhood development.',
    requestType: 'Pre-primary Level',
  },
  {
    title: 'Boarding Status',
    description: 'Update or apply for boarding status to accommodate students on campus.',
    requestType: 'Boarding Status',
  },
];

export const RequestTypesSection = () => {
  const router = useRouter();

  const startAccreditationFlow = (requestType: string) => {
    // Store the request type in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('accreditationRequestType', requestType);
      // Navigate to school identification
      router.push('/school-identification');
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">Select Your Request Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {REQUEST_TYPES.map((type, index) => (
            <FeatureCard
              key={type.title}
              title={type.title}
              description={type.description}
              icon={<CheckCircle className="w-6 h-6" />}
              actionLabel={type.href ? 'Submit Claim' : `Apply for ${type.title}`}
              href={type.href}
              onClick={type.requestType ? () => startAccreditationFlow(type.requestType) : undefined}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 