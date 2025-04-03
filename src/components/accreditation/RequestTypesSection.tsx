"use client";

import { closeDialog, openDialog } from "@/app/slicers/DialogSlice";
import {
  selectRequestType,
  setRequestType,
} from "@/app/slicers/RequestTypeSlice";
import {
  SchoolFinderDialog,
  School as SchoolType,
} from "@/components/school-finder";
import ErrorPopover from "@/components/ui/ErrorPopover";
import { FeatureCard, } from "@/components/ui/FeatureCard";
import { FeaturedCardSkeleton } from "@/components/ui/FeaturedCardSkeleton";
import REQUEST_TYPES from "@/constants/RequestTypes";
import { Combination, useGetCombinations } from "@/hooks/useCombination";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export const RequestTypesSection = () => {
  const router = useRouter();
  const dialog = useSelector((state) => state.dialog);
  const selectedRequestType = useSelector(selectRequestType);
  const { data: combinations, isLoading: isCombinationsLoading, error: combinationsError } = useGetCombinations();
  const dispatch = useDispatch();


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

  // Function to check if a valid school ID exists in localStorage
  const hasValidSchoolId = () => {
    try {
      if (typeof window === 'undefined') return false;

      const schoolId = localStorage.getItem("selectedSchoolId");
      return !!schoolId && schoolId !== 'undefined' && schoolId !== 'null';
    } catch (e) {
      return false;
    }
  };

  const startPreAccreditationFlowStatic = (type: string) => {
    if (type === "new-school-registration") {
      router.push("/register-school");
      return;
    } else if (type === "accredited-schools") {
      router.push("/accredited-schools");
      return;
    } else {
      dispatch(setRequestType(type));
      if (!hasValidSchoolId()) {
        dispatch(openDialog());
      } else {
        router.push(`/${type}`);
      }
    }
  };

  const startAccreditationFlow = (requestType: Combination) => {
    if (requestType.id === "new-school-registration") {
      router.push("/register-school");
      return;
    } else {
      dispatch(setRequestType(requestType.fullName));

      // Check if school ID exists in localStorage
      if (!hasValidSchoolId()) {
        // If no school ID, show dialog to select a school
        dispatch(openDialog());
      } else {
        // If school ID exists, redirect to the application page
        router.push(`/applyfor/${requestType.id}`);
      }
    }
  };

  const handleSchoolSelect = (school: SchoolType) => {
    // Store the school and request type in localStorage
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedSchoolId", school.id.toString());
        localStorage.setItem("selectedSchoolEmail", school.email);
        localStorage.setItem("accreditationRequestType", selectedRequestType);
        dispatch(closeDialog());
        const path = window.location.pathname;
        const matches = path.match(/\/applyfor\/([^\/]+)/);
        const requestTypeId = matches ? matches[1] : null;

        if (requestTypeId) {
          router.push(`/applyfor/${requestTypeId}`);
        } else if (selectedRequestType) {
          router.push(`/${selectedRequestType}`);
        }
      }
    } catch (error) {
      console.error("Error storing school data in localStorage:", error);
      // Fallback behavior - still try to navigate
      if (window.location.pathname.includes('/applyfor/')) {
        router.push(window.location.pathname);
      } else if (selectedRequestType) {
        router.push(`/${selectedRequestType}`);
      }
    }
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@qamis.gov.rw";
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-4">
          Begin your accreditation journey or Check Accredited  schools here
        </h2> */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-10 ">
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
                href={`/applyfor/${combination.id}`}
                actionLabel={`Apply for ${combination.fullName?.toLocaleLowerCase()}`}
                onClick={() => startAccreditationFlow(combination)}
                index={index}
              />
            ))
          )}
        </div>
      </div>

      {/* School Finder Dialog - only shown for non-direct requests */}
      <SchoolFinderDialog
        isOpen={dialog.isOpen}
        onOpenChange={() => dispatch(closeDialog())}
        onSchoolSelect={handleSchoolSelect}
        title={`${selectedRequestType?.toUpperCase()?.replace("-", " ")}`}
        description={`We need to know which school you are applying for.`}
      />
    </section>
  );
};