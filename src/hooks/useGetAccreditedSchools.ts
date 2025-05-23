import { ProcessedSchoolDTO } from "@/types/accredited-schools";
import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetAccreditedSchools = () => {
  const searchParams = useSearchParams();

  // Create a properly formatted params object for the API
  const apiParams = useMemo(() => {
    const params = new URLSearchParams();

    const query = searchParams.get("q");
    const provinces = searchParams.get("provinces");
    const districts = searchParams.get("districts");
    const schoolTypes = searchParams.get("schoolTypes");
    const combinations = searchParams.get("combinations");
    const sectors = searchParams.get("sectors");
    const page = searchParams.get("page") || "1";

    // Only add parameters that have values
    if (query) params.append("query", query);

    // For array parameters, split by comma and append each value
    if (provinces && provinces.length > 0) {
      provinces.split(",").forEach((province) => {
        params.append("provinces", province.trim());
      });
    }

    if (districts && districts.length > 0) {
      districts.split(",").forEach((district) => {
        params.append("districts", district.trim());
      });
    }

    if (schoolTypes && schoolTypes.length > 0) {
      schoolTypes.split(",").forEach((type) => {
        params.append("schoolTypes", type.trim());
      });
    }

    if (combinations && combinations.length > 0) {
      combinations.split(",").forEach((combination) => {
        params.append("combinations", combination.trim());
      });
    }

    // params.append("page", page);

    return params;
  }, [searchParams]);

  console.log("apiParams", apiParams.toString());

  const result = useQuery<ProcessedSchoolDTO[], Error>({
    queryKey: ["ACCREDITED_SCHOOLS", apiParams.toString()],
    queryFn: async () => {
      const response = await axios.get<ProcessedSchoolDTO[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/allAccreditedSchool`,
        {
          headers: {
            "qamis-request-key":
              process.env.NEXT_PUBLIC_QAMIS_REQUEST_KEY || "",
            "Content-Type": "application/json",
          },
          // params: Object.fromEntries(apiParams.entries()),
          // paramsSerializer: {
          //   indexes: null,
          // },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const uniqueCombinations = useMemo(() => {
    if (!result.data) return [];

    const combinationsSet = new Set<string>();

    // Extracting combinations using a single-level forEach
    result.data.forEach((school) => {
      school.combinations.forEach((combination) => {
        combinationsSet.add(combination.name);
      });
    });

    return Array.from(combinationsSet).sort();
  }, [result.data]);

  return {
    ...result,
    uniqueCombinations,
  };
};
