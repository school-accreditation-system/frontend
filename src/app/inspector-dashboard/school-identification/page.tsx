"use client";
import { SchoolIdentificationSteps } from "@/components/school-identification/SchoolIdentificationSteps";
import { Metadata } from "next";
import { NavBar } from "@/components/navigation/NavBar";
import { SummaryForm } from "@/components/school-identification/SchoolIdentificationSteps";
import {
  FormProvider,
  useFormContext,
} from "@/components/inspector-dashboard/school-identification/context";
const metadata: Metadata = {
  title: "School Identification",
  description: "Complete your school's identification process",
};

export default function SchoolIdentificationPage() {
  return (
    <>
      {/* <NavBar /> */}
      {/* <main className="min-h-screen bg-gray-50 py-10"> */}

      <main className="flex ">
        {/* <SummaryForm formData /> */}
        <SchoolIdentificationSteps />
      </main>

      {/* </main> */}
    </>
  );
}
