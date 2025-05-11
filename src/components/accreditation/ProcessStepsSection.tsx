"use client";

import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    number: 1,
    title: "School Identification",
    description:
      "Register your school's basic information, staff details, and infrastructure data.",
  },
  {
    number: 2,
    title: "Self Assessment",
    description:
      "Evaluate your institution against standard criteria covering infrastructure, teaching resources, and management.",
  },
  {
    number: 3,
    title: "Accreditation Application",
    description:
      "Submit your formal accreditation request with supporting documentation.",
  },
  {
    number: 4,
    title: "Inspection",
    description:
      "On-site inspection by an evaluation team to assess compliance with standards.",
  },
  {
    number: 5,
    title: "Review & Decision",
    description:
      "Assessment of inspection reports and final decision by accreditation authorities.",
  },
  {
    number: 6,
    title: "Certification",
    description:
      "Issuance of official accreditation certificate for approved applications.",
  },
];

export const ProcessStepsSection = () => {
  return (
    <section className="mx-auto flex flex-col gap-12 cursor-default p-4 max-w-[1400px]">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
        Accreditation Process
      </h2>

      {/* Desktop/Tablet View */}
      <div className="hidden md:block relative w-full">
        {/* Horizontal connecting line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-primary z-0 w-[80%] mx-auto"></div>

        {/* Steps */}
        <div className="grid grid-cols-6 w-full">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-4 items-center">
              {/* Number circle */}
              <div className="relative z-10">
                {/* Circle background with white border */}
                <motion.div
                  className="mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div
                    className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold"
                    style={{
                      boxShadow:
                        "0 0 0 3px white, 0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {step.number}
                  </div>
                </motion.div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-center text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-center text-sm text-gray-600 px-2">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative flex flex-col gap-8">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary z-0 h-[90%]"></div>
        {PROCESS_STEPS.map((step, index) => (
          <div key={step.number} className="flex relative">
            {/* Vertical line */}
            {index < PROCESS_STEPS.length - 1 && (
              <div className="absolute top-12 left-6 w-0.5 h-full bg-primary -z-10"></div>
            )}

            <div className="flex items-start gap-4">
              {/* Number circle */}
              <div className="z-10">
                <div
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold"
                  style={{
                    boxShadow: "0 0 0 3px white, 0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {step.number}
                </div>
              </div>

              <div className="flex flex-col gap-2 min-h-[70px]">
                <h3 className="font-semibold text-base">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
