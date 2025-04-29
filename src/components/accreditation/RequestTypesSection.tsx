"use client";

import {
  SchoolFinderDialog,
  School as SchoolType,
} from "@/components/school-finder";
import ErrorPopover from "@/components/ui/ErrorPopover";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FeaturedCardSkeleton } from "@/components/ui/FeaturedCardSkeleton";
import REQUEST_TYPES from "@/constants/RequestTypes";
import { Combination, useGetCombinations } from "@/hooks/useCombination";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSchool } from "@/components/auth/SchoolContext.tsx";

export const RequestTypesSection = () => {
  const router = useRouter();
  const { data: combinations, isLoading: isCombinationsLoading, error: combinationsError } = useGetCombinations();
  const [selectedRequestType, setSelectedRequestType] = useState<string | null>(null);

  const { school, setSchool, schoolDialogOpen, openSchoolDialog, closeSchoolDialog } = useSchool();

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

  const startPreAccreditationFlowStatic = (type: string) => {
    if (type === "new-school-registration") {
      router.push("/register-school");
      return;
    } else if (type === "accredited-schools") {
      router.push("/accredited-schools");
      return;
    } else {
      setSelectedRequestType(type);
      if (!school) {
        openSchoolDialog();
      } else {
        router.push(`/${type}`);
      }
    }
  };

  const startAccreditationFlow = (requestType: Combination) => {
    setSelectedRequestType(requestType.fullName);
    if (!school) {
      openSchoolDialog();
    } else {
      router.push(`/applyfor/${requestType.id}`);
    }
  };

  const handleSchoolSelect = (schoolObj: SchoolType) => {
    setSchool(schoolObj);
    if (selectedRequestType) {
      if (window.location.pathname.includes("/applyfor/")) {
        const matches = window.location.pathname.match(/\/applyfor\/([^\/]+)/);
        const requestTypeId = matches ? matches[1] : null;
        if (requestTypeId) {
          router.push(`/applyfor/${requestTypeId}`);
        } else {
          router.push(`/${selectedRequestType}`);
        }
      } else {
        router.push(`/${selectedRequestType}`);
      }
    }
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@qamis.gov.rw";
  };

  return (
    <section className="py-16 bg-white">
      {combinationsError && (
        <ErrorPopover
          message="Technical difficulties. Please contact the site administrator for support."
          onContactSupport={handleContactSupport}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {REQUEST_TYPES.map((type, index) => (
          <FeatureCard
            key={type.title}
            title={type.title}
            description={type.description}
            icon={type.icon || <CheckCircle className="w-6 h-6" />}
            actionLabel={type.title}
            onClick={() => startPreAccreditationFlowStatic(type.requestType)}
            index={index}
            className={cardColors[index % cardColors.length]}
          />
        ))}
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary my-12">
        Request Accreditation in the following categories
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Your school is registered and you are ready to apply for accreditation. Choose from the following categories to get started.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-10 md:px-24">
        {isCombinationsLoading || combinationsError ? (
          Array.from({ length: 8 }).map((_, index) => (
            <FeaturedCardSkeleton key={index} />
          ))
        ) : (
          combinations?.map((combination, index) => (
            <FeatureCard
              key={combination.id}
              title={combination.fullName}
              description={combination.description}
              className="bg-primary/1 border-gray-200"
              icon={<CheckCircle className="w-6 h-6" />}
              actionLabel={`Apply for ${combination.fullName?.toLocaleLowerCase()}`}
              onClick={() => startAccreditationFlow(combination)}
              index={index}
            />
          ))
        )}
      </div>

      <SchoolFinderDialog
        isOpen={schoolDialogOpen}
        onOpenChange={open => (open ? openSchoolDialog() : closeSchoolDialog())}
        onSchoolSelect={handleSchoolSelect}
        title={`${selectedRequestType?.toUpperCase()?.replace("-", " ")}`}
        description={`We need to know which school you are applying for.`}
      />
    </section>
  );
};