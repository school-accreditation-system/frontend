'use client';

import { useState } from 'react';
import { CheckCircle, School, Award, HomeIcon } from 'lucide-react';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { useRouter } from 'next/navigation';
import { SchoolFinderDialog, School as SchoolType } from '@/components/school-finder';
import REQUEST_TYPES from '@/constants/RequestTypes';

export const RequestTypesSection = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState("");

  const startAccreditationFlow = (requestType: string) => {
    if (requestType === 'new-school-registration') {
      router.push('/register-school');
      return;
    }
    setSelectedRequestType(requestType);
    setIsDialogOpen(true);
  };

  const handleSchoolSelect = (school: SchoolType) => {
    // Store the school and request type in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSchoolId', school.id.toString());
      localStorage.setItem('accreditationRequestType', selectedRequestType);
      router.push(`/${selectedRequestType}?schoolId=${school.id}`);
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
              icon={type.icon || <CheckCircle className="w-6 h-6" />}
              actionLabel={`Apply for ${type.title}`}
              onClick={() => startAccreditationFlow(type.requestType)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* School Finder Dialog - only shown for non-direct requests */}
      <SchoolFinderDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSchoolSelect={handleSchoolSelect}
        title={`${selectedRequestType?.toUpperCase().replace('-', ' ')}`}
        description={`We need to know which school you are applying for.`}
      />
    </section>
  );
}; 