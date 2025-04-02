"use client";

import { useState } from "react";
import { CheckCircle, School, Award, HomeIcon, FileText, BookOpen } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { useRouter } from "next/navigation";
import {
  SchoolFinderDialog,
  School as SchoolType,
} from "@/components/school-finder";
import REQUEST_TYPES, {
  ACCREDITATION_APPLICATION_TYPES,
} from "@/constants/RequestTypes";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "@/app/slicers/DialogSlice";
import { useEffect } from "react";
import {
  selectRequestType,
  setRequestType,
} from "@/app/slicers/RequestTypeSlice";

export const RequestTypesSection = () => {
  const router = useRouter();
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [selectedRequestType, setSelectedRequestType] = useState("");
  const dialog = useSelector((state) => state.dialog);
  const selectedRequestType = useSelector(selectRequestType);

  const dispatch = useDispatch();

  // Card color classes
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

  useEffect(() => {
    console.log(selectedRequestType);
  }, []);

  const startAccreditationFlow = (requestType: string) => {
    if (requestType === "new-school-registration") {
      router.push("/register-school");
      return;
    }
  if( requestType == "self-assessment"){
      router.push("/self-assessment")
      return
    }
    if( requestType == "school-identification") {
      router.push("/school-identification")
      return
    }

    // setSelectedRequestType(requestType);
    dispatch(setRequestType(requestType));
    // setIsDialogOpen(true);
    dispatch(openDialog());
  };

  const handleSchoolSelect = (school: SchoolType) => {
    // Store the school and request type in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedSchoolId", school.id.toString());
      localStorage.setItem("selectedSchoolEmail", school.email);
      localStorage.setItem("accreditationRequestType", selectedRequestType);
      router.push(`/${selectedRequestType}?schoolId=${school.id}`);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-4">
          Requirements for Accreditation
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Complete these steps to begin your accreditation journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {REQUEST_TYPES.map((type, index) => (
            <FeatureCard
              key={type.title}
              title={type.title}
              description={type.description}
              icon={type.icon || <CheckCircle className="w-6 h-6" />}
              actionLabel={type.title}
              onClick={() => startAccreditationFlow(type.requestType)}
              index={index}
              className={cardColors[index % cardColors.length]}
            />
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary my-12">
          Request Accreditation in the following categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-10">
          {ACCREDITATION_APPLICATION_TYPES.map((type, index) => (
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
        isOpen={dialog.isOpen}
        // onOpenChange={() => dispatch(openDialog())}
        // onOpenChange={setIsDialogOpen}
        onSchoolSelect={handleSchoolSelect}
        title={`${selectedRequestType?.toUpperCase().replace("-", " ")}`}
        description={`We need to know which school you are applying for.`}
      />
    </section>
  );
};
