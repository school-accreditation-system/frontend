"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Standard } from "@/types/Standard";
import { AssessmentIndicator } from "@/types/assessment";

export const useGetAreas = () => {
  return useQuery<Standard[], Error>({
    queryKey: ["AREAS"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/standard/findAreas`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Get criteria for a specific area
export const useGetCriteriaByAreaId = (areaId: string) => {
  return useQuery<Standard[], Error>({
    queryKey: ["criteria", areaId],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/standard/findByArea?indicator=${areaId}`
      );
      console.log("response ==>", response)
      return response.data;
    },
    enabled: !!areaId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Get indicators for a specific criteria
export const useGetIndicatorsByCriteriaId = (criteriaId: string) => {
  return useQuery<any[], Error>({
    queryKey: ["indicators", criteriaId],
    queryFn: async () => {
      const response = await axios.get<any[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/standard/findByArea?indicator=${criteriaId}`,
        {
          headers: {
            "qamis-request-key": process.env.NEXT_PUBLIC_QAMIS_REQUEST_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    enabled: !!criteriaId,
  });
};

// // Get area with its related criteria and indicators
// export const useGetAreaWithCriteria = (areaName: string) => {
//   const name = areaName.toLowerCase();
//   //   // First get all areas
//   //   const areasQuery = useGetAreas();

//   //   // We need to ensure the hook is always called, regardless of data
//   //   const criteriaQuery = useGetCriteriaByAreaId(
//   //     areasQuery.data?.find(
//   //       (area) =>
//   //         area.name.includes(areaName) ||
//   //         area.name.toLowerCase().includes(areaName.toLowerCase())
//   //     )?.id || ""
//   //   );

//   //   // Find the area ID that matches the name (moved after hook call)
//   //   const areaId = areasQuery.data?.find(
//   //     (area) =>
//   //       area.name.includes(areaName) ||
//   //       area.name.toLowerCase().includes(areaName.toLowerCase())
//   //   )?.id;

//   //   return {
//   //     area: areaId
//   //       ? areasQuery.data?.find((area) => area.id === areaId)
//   //       : undefined,
//   //     criteria: criteriaQuery.data || [],
//   //     isLoading: areasQuery.isLoading || criteriaQuery.isLoading,
//   //     error: areasQuery.error || criteriaQuery.error,
//   //   };
//   return name;
// };
