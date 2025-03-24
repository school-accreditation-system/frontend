import { motion } from "framer-motion";

interface AuthStep {
  number: number;
  title: string;
  description: string;
}

const SCHOOL_AUTH_STEPS: AuthStep[] = [
  {
    number: 1,
    title: "Search School",
    description: "Enter your school name to find it in our database"
  },
  {
    number: 2,
    title: "Verify Email",
    description: "We'll send a code to the registered school email"
  },
  {
    number: 3,
    title: "Enter a Code",
    description: "Input the code received in your school email"
  }
];

const STAFF_AUTH_STEPS: AuthStep[] = [
  {
    number: 1,
    title: "Enter Email",
    description: "Provide your staff email address"
  },
  {
    number: 2,
    title: "Verify Email",
    description: "We'll send a code to your email if you're registered"
  },
  {
    number: 3,
    title: "Enter Code",
    description: "Input the code received in your email"
  },
];

interface AuthStepsProps {
  type: 'school' | 'staff';
}

export const AuthSteps = ({ type }: AuthStepsProps) => {
  const steps = type === 'school' ? SCHOOL_AUTH_STEPS : STAFF_AUTH_STEPS;

  return (
    <div className="h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:px-12 xl:px-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center lg:text-left mb-12 md:mb-16">
        {type === 'school' ? 'School Authentication' : 'Staff Authentication'}
      </h2>
      
      {/* Mobile horizontal steps */}
      <div className="lg:hidden">
        <div className="flex justify-between mb-10 relative max-w-sm mx-auto">
          {/* Horizontal connecting line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20 -z-10"></div>
          
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center z-10">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="cursor-pointer mb-3"
              >
                <div 
                  className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-semibold"
                  style={{
                    boxShadow: '0 0 0 3px rgba(255,255,255,0.2), 0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {step.number}
                </div>
              </motion.div>
              <h3 className="font-semibold text-white text-sm text-center">{step.title}</h3>
            </div>
          ))}
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 max-w-sm mx-auto">
          {steps.map((step, index) => (
            <div 
              key={`desc-${step.number}`} 
              className={`${index === 0 ? 'block' : 'hidden'}`}
            >
              <p className="text-white/90 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop vertical steps with improved alignment */}
      <div className="hidden lg:block lg:ml-10 xl:ml-20">
        {steps.map((step, index) => (
          <div key={step.number} className="flex mb-12 relative">
            {/* Vertical line */}
            {index < steps.length - 1 && (
              <div className="absolute top-12 left-6 w-0.5 h-full bg-white/20 -z-10"></div>
            )}
            
            <div className="flex items-center">
              {/* Number circle */}
              <div className="flex-shrink-0 mr-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="cursor-pointer"
                >
                  <div 
                    className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center text-lg font-bold"
                    style={{
                      boxShadow: '0 0 0 3px rgba(255,255,255,0.2), 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {step.number}
                  </div>
                </motion.div>
              </div>
              
              <div>
                <h3 className="font-semibold text-white text-lg">
                  {step.title}
                </h3>
                <p className="text-white/80 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 