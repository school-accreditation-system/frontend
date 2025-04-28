"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AccreditedSchoolDTO,
  ProcessedSchool,
} from "@/types/accredited-schools";
import { useMemo } from "react";

/**
 * Custom hook to fetch accredited schools
 * Processes the data to group schools by name with their combinations
 */
export const useGetAccreditedSchools = () => {
  const result = useQuery<ProcessedSchool[], Error>({
    queryKey: ["ACCREDITED_SCHOOLS"],
    queryFn: async () => {
      const response = await axios.get<AccreditedSchoolDTO[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/allAccreditedSchool`,
        {
          headers: {
            "qamis-request-key":
              process.env.NEXT_PUBLIC_QAMIS_REQUEST_KEY || "",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("accredited schools ===->", response.data);
      // Process data to group by school name
      const schoolsMap = new Map<string, ProcessedSchool>();

      response.data.forEach((item) => {
        const schoolId = item.schoolName.toLowerCase().replace(/\s+/g, "-");

        if (!schoolsMap.has(schoolId)) {
          schoolsMap.set(schoolId, {
            id: schoolId,
            name: item.schoolName,
            email: item.schoolEmail,
            phoneNumber: item.schoolPhoneNumber,
            combinations: [],
          });
        }

        // Add combination to the school
        const school = schoolsMap.get(schoolId);
        if (school) {
          // Check if combination already exists to avoid duplicates
          const combinationExists = school.combinations.some(
            (c) => c.name === item.combinationShortName
          );
          console.log("fullname", item.combinationFullName);
          if (!combinationExists) {
            school.combinations.push({
              name: item.combinationShortName,
              accreditationDate: item.accrediateDate,
              fullName: item.combinationFullName,
            });
          }
        }
      });

      // Convert map to array
      return Array.from(schoolsMap.values());
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  // Getting unique combinations from all schools
  const uniqueCombinations = useMemo(() => {
    if (!result.data) return [];

    const combinationsSet = new Set<string>();

    // Extracting combinations using a single-level forEach to avoid nesting
    const extractCombinations = () => {
      if (!result.data) return;

      for (const school of result.data) {
        for (const combination of school.combinations) {
          combinationsSet.add(combination.name);
        }
      }
    };

    extractCombinations();

    return Array.from(combinationsSet).sort();
  }, [result.data]);

  return {
    ...result,
    uniqueCombinations,
  };
};
