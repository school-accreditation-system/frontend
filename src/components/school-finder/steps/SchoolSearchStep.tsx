/* eslint-disable max-lines */
"use client";

import { SchoolSearchCard } from '@/components/common/SchoolSearchCard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SchoolDTO, useGetSchools } from "@/hooks/useSchool";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Mail,
  School as SchoolIcon,
  Search
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSchool } from "@/components/auth/SchoolContext";


export const SchoolSearchStep = ({
  onStartVerification,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const {
    data: schools,
    isLoading,
    error: schoolsError,
  } = useGetSchools(debouncedSearchQuery);
  const { setSchool } = useSchool();

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    // setSchool(school)
    setVerificationError("");
    setIsSchoolSelected(true);
  };
  const handleContinue = () => {
    console.log("Selected school:", selectedSchool);
    if (!selectedSchool) return;
    setIsVerifying(true);
    // setSchool(selectedSchool);
    setTimeout(() => {
      try {
        if (!selectedSchool.email) {
          setVerificationError(
            "This school doesn&apos;t have a registered email address. Please contact support."
          );
          setIsVerifying(false);
          return;
        }
        onStartVerification(selectedSchool.email, selectedSchool);
        setIsVerifying(false);
      } catch (error) {
        setVerificationError(
          "Failed to send verification code. Please try again later."
        );
        setIsVerifying(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">
          Find Your School
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Enter your school name or email to search
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-primary/60" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter school name or email"
          className="pl-9 sm:pl-10 pr-4 py-4 sm:py-6 text-base sm:text-lg rounded-xl border-primary/20 focus:border-primary/50 shadow-sm"
        />
      </div>

      <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
        {isLoading && searchQuery.trim().length >= 3 && (
          <div className="flex items-center gap-2 sm:gap-3 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
            <div className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-primary border-t-transparent rounded-full flex-shrink-0" />
            <p className="text-sm sm:text-base text-blue-700">
              Searching for schools...
            </p>
          </div>
        )}

        {searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && (
          <div className="flex items-center gap-2 sm:gap-3 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm sm:text-base text-blue-700">
              Please enter at least 3 characters to search
            </p>
          </div>
        )}

        {searchQuery.trim().length === 0 && !isSchoolSelected && (
          <Card className="border-0 shadow-none bg-blue-50/50 p-4 sm:p-6">
            <CardContent className="p-0 flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 bg-blue-100 rounded-full mb-3 sm:mb-4">
                <SchoolIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <p className="text-center text-sm sm:text-base text-muted-foreground">
                Search for your school by name or school email to begin
              </p>
              <div className="flex items-center text-xs sm:text-sm text-primary/80 mt-3 sm:mt-4 gap-1.5 sm:gap-2 flex-wrap justify-center">
                <span className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary text-white font-medium">
                  1
                </span>
                <span>Search School</span>
                <span className="text-gray-300 mx-1 sm:mx-2">•</span>
                <span className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-200 text-gray-500 font-medium">
                  2
                </span>
                <span className="text-gray-400">Verify Email</span>
                <span className="text-gray-300 mx-1 sm:mx-2">•</span>
                <span className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gray-200 text-gray-500 font-medium">
                  3
                </span>
                <span className="text-gray-400">Enter Code</span>
              </div>
            </CardContent>
          </Card>
        )}

        {searchQuery?.trim().length >= 3 &&
          !isLoading &&
          schools?.length === 0 && (
            schools.map((school) => (
              <SchoolSearchCard
                key={school.id}
                school={school}
                isSelected={false}
                onSelect={handleSchoolSelect}
              />
            ))
          )}

        {schoolsError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {schoolsError?.response?.data?.message ||
                "An unexpected error occurred. Please try again."}
            </AlertDescription>
          </Alert>
        )}

        {schools?.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
              {schools.map((school) => (
                <SchoolSearchCard
                  key={school.id}
                  school={school}
                  isSelected={selectedSchool?.id === school.id}
                  onSelect={handleSchoolSelect}
                />
              ))}
            </div>

            {selectedSchool && (
              <div
                role="alert"
                className="relative w-full rounded-lg border px-4 py-3 text-sm bg-blue-50 border-blue-100 mb-2"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium tracking-tight text-sm sm:text-base text-primary">
                      Email Verification Required
                    </div>
                    <div className="text-xs sm:text-sm text-primary/80">
                      For security reasons, we&apos;ll send a verification code
                      to: <strong>{selectedSchool.email}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {verificationError && (
              <div
                role="alert"
                className="relative w-full rounded-lg border px-4 py-3 text-sm bg-red-50 border-red-200 mb-2"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1 text-xs sm:text-sm text-red-700">
                    {typeof verificationError === "string"
                      ? verificationError
                      : "An unexpected error occurred."}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 mt-2 border-t">
              <Link href="/register-school" className="order-2 sm:order-1">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700 text-gray-700"
                  size="default"
                >
                  Register New School
                </Button>
              </Link>

              <Button
                onClick={handleContinue}
                disabled={!selectedSchool || isVerifying}
                className="w-full sm:w-auto order-1 sm:order-2 bg-primary hover:cursor-pointer hover:bg-primary/90 gap-2 text-white px-4 sm:px-6"
                size="default"
              >
                {isVerifying ? (
                  <>Sending verification code...</>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add the styles directly to the head using dangerouslySetInnerHTML */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #ccc;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #0077cc;
            }
          `,
        }}
      />
    </div>
  );
};
