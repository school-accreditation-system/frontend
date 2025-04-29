"use client";

import { SchoolFinderDialog } from "@/components/school-finder";
import ErrorPopover from "@/components/ui/ErrorPopover";
import { RequestCard } from "@/components/ui/RequestCard";
import { FeaturedCardSkeleton } from "@/components/ui/FeaturedCardSkeleton";
import { Combination, useGetCombinations } from "@/hooks/useCombination";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSchool } from "@/components/auth/SchoolContext.tsx";
import { School } from "@/types/school";
import { ProcessStepsSection } from "@/components/accreditation/ProcessStepsSection";

export default function NewPage() {
  const router = useRouter();
  const {
    data: combinations,
    isLoading: isCombinationsLoading,
    error: combinationsError,
  } = useGetCombinations();
  const [selectedRequestType, setSelectedRequestType] = useState<string | null>(
    null
  );

  const {
    school,
    setSchool,
    schoolDialogOpen,
    openSchoolDialog,
    closeSchoolDialog,
  } = useSchool();

  const startAccreditationFlow = (requestType: Combination) => {
    localStorage.setItem("requestType", JSON.stringify(requestType));
    setSelectedRequestType(requestType.fullName);
    if (!school) {
      openSchoolDialog();
    } else {
      router.push(`/applyfor/${requestType.id}`);
    }
  };

  const handleSchoolSelect = (schoolObj: School) => {
    setSchool(schoolObj);
    if (selectedRequestType) {
      if (window.location.pathname.includes("/applyfor/")) {
        const matches = window.location.pathname.match(/\/applyfor\/([^\/]+)/);
        const requestTypeId = matches ? matches[1] : null;
        if (requestTypeId) {
          router.push(`/applyfor/${requestTypeId}`);
        }
      }
    }
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@qamis.gov.rw";
  };

  return (
    <section className="bg-white p-4 flex flex-col gap-8">
      {combinationsError && (
        <ErrorPopover
          message="Technical difficulties. Please contact the site administrator for support."
          onContactSupport={handleContactSupport}
        />
      )}
      <ProcessStepsSection />
      <div className="flex flex-col gap-14 max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
            Request Accreditation in the following categories
          </h2>
          <p className="text-center text-gray-600">
            Your school is registered and you are ready to apply for
            accreditation. Choose from the following categories to get started.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isCombinationsLoading || combinationsError
            ? Array.from({ length: 8 }).map((_, index) => (
                <FeaturedCardSkeleton key={index} />
              ))
            : combinations?.map((combination, index) => (
                <RequestCard
                  key={combination.id}
                  title={combination.fullName}
                  description={combination.description}
                  className="bg-primary/10 border-gray-200"
                  icon={<CheckCircle className="w-6 h-6" />}
                  actionLabel={`Apply for ${combination.fullName?.toLocaleLowerCase()}`}
                  onClick={() => startAccreditationFlow(combination)}
                  index={index}
                />
              ))}
        </div>
      </div>

      <SchoolFinderDialog
        isOpen={schoolDialogOpen}
        onOpenChange={(open) =>
          open ? openSchoolDialog() : closeSchoolDialog()
        }
        onSchoolSelect={handleSchoolSelect}
        title={`${selectedRequestType?.toUpperCase()?.replace("-", " ")}`}
        description={`We need to know which school you are applying for.`}
      />
    </section>
  );
}
