'use client';

import { CheckCircle } from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { useRouter } from 'next/navigation';
import { REQUEST_TYPES } from '../../../utils/RequestTypes';



export const RequestTypesSection = () => {
  const router = useRouter();

  const startAccreditationFlow = (requestType: string) => {
    // Store the request type in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('accreditationRequestType', requestType);
      // Navigate to school identification
      router.push('/'+requestType);
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