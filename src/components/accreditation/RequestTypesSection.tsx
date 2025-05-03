"use client";

// import { useSchool } from "@/components/auth/SchoolContext.tsx";
import { FeatureCard } from "@/components/ui/FeatureCard";
import REQUEST_TYPES from "@/constants/RequestTypes";
// import { useGetCombinations } from "@/hooks/useCombination";
import { CheckCircle } from "lucide-react";
// import { useState } from "react";

export const RequestTypesSection = () => {
  //TODO: Implement the logic to handle the selected request type and school
  // const { data: combinations, isLoading: isCombinationsLoading, error: combinationsError } = useGetCombinations();
  // const [selectedRequestType, setSelectedRequestType] = useState<string | null>(null);

  // const { school, setSchool, schoolDialogOpen, openSchoolDialog, closeSchoolDialog } = useSchool();

  const cardColors = [
    "bg-blue-50 border-blue-200",
    "bg-green-50 border-green-200",
    "bg-purple-50 border-purple-200",
    "bg-amber-50 border-amber-200",
    "bg-teal-50 border-teal-200",
    "bg-rose-50 border-rose-200",
    "bg-indigo-50 border-indigo-200",
    "bg-orange-50 border-orange-200",
  ];

  return (
    <section className="bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-full mx-auto">
        {REQUEST_TYPES.map((type, index) => (
          <FeatureCard
            key={type.title}
            title={type.title}
            description={type.description}
            icon={type.icon || <CheckCircle className="w-6 h-6" />}
            href={type.href}
            actionLabel={type.actionLabel}
            onClick={() => startPreAccreditationFlowStatic(type.requestType)}
            index={index}
            className={cardColors[index % cardColors.length]}
          />
        ))}
      </div>
      {/* <SchoolFinderDialog
        isOpen={schoolDialogOpen}
        onOpenChange={open => (open ? openSchoolDialog() : closeSchoolDialog())}
        onSchoolSelect={handleSchoolSelect}
        title={`${selectedRequestType?.toUpperCase()?.replace("-", " ")}`}
        description={`We need to know which school you are applying for.`}
      /> */}
    </section>
  );
};
