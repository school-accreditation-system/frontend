"use client";

import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/Location";
import axios from "axios";

export const useGetProvinces = () => {
  return useQuery<Location[], Error>({
    queryKey: ["provinces"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/locations/provinces`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useGetLocationByType = (
  type: "DISTRICT" | "SECTOR" | "CELL" | "VILLAGE" | "PROVINCE"
) => {
  return useQuery<Location[], Error>({
    queryKey: ["locations", type],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/locations/${type}`
      );
      console.log("response.data", response.data);
      return response.data;
    },
    enabled: !!type,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useGetLocationsByParentCode = (parentCode: string) => {
  return useQuery<Location[], Error>({
    queryKey: ["locations", parentCode],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/locations/getLocaitonsByParent?parentCode=${parentCode}`
      );
      return response.data;
    },
    enabled: !!parentCode,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
