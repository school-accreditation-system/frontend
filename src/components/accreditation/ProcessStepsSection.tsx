'use client';

import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    number: 1,
    title: 'School Identification',
    description: 'Register your school\'s basic information, staff details, and infrastructure data.',
  },
  {
    number: 2,
    title: 'Self Assessment',
    description: 'Evaluate your institution against standard criteria covering infrastructure, teaching resources, and management.',
  },
  {
    number: 3,
    title: 'Accreditation Application',
    description: 'Submit your formal accreditation request with supporting documentation.',
  },
  {
    number: 4,
    title: 'Inspection',
    description: 'On-site inspection by an evaluation team to assess compliance with standards.',
  },
  {
    number: 5,
    title: 'Review & Decision',
    description: 'Assessment of inspection reports and final decision by accreditation authorities.',
  },
  {
    number: 6,
    title: 'Certification',
    description: 'Issuance of official accreditation certificate for approved applications.',
  },
];

export const ProcessStepsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">Accreditation Process</h2>
        
        {/* Desktop/Tablet View */}
        <div className="hidden md:block relative mb-16">
          {/* Horizontal connecting line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-primary z-0"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-6 gap-0">
            {PROCESS_STEPS.map((step) => (
              <div 
                key={step.number} 
                className="flex flex-col items-center"
              >
                {/* Number circle */}
                <div className="relative z-10 mb-6">
                  {/* Circle background with white border */}
                   <motion.div 
            className="mx-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
                  <div 
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold"
                    style={{
                      boxShadow: '0 0 0 3px white, 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {step.number}
                    </div>
                    </motion.div>
                </div>
                
                <h3 className="text-center font-semibold mb-2">{step.title}</h3>
                <p className="text-center text-sm text-muted-foreground px-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden">
          {PROCESS_STEPS.map((step, index) => (
            <div 
              key={step.number} 
              className="flex mb-12 relative"
            >
              {/* Vertical line */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="absolute top-12 left-6 w-0.5 h-full bg-primary -z-10"></div>
              )}
              
              <div className="flex items-start">
                {/* Number circle */}
                <div className="mr-4 z-10">
                  <div 
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold"
                    style={{
                      boxShadow: '0 0 0 3px white, 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {step.number}
                  </div>
                </div>
                
                <div className="ml-2 pt-2">
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};