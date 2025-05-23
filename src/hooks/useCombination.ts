"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCombinations = () => {
  return useQuery<Combination[], Error>({
    queryKey: ["Combinations"],
    queryFn: async () => {
      const response = await axios.get<Combination[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/qamis/combination/getallLevels`,
        {
          headers: {
            "qamis-request-key": process.env.NEXT_PUBLIC_QAMIS_REQUEST_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetCombinationByLevels = (combinationId: string) => {
  return useQuery<Combination[], Error>({
    queryKey: ["CombinationByLevels", combinationId],
    queryFn: async () => {
      const response = await axios.get<Combination[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/qamis/combination/getCombinationsBylevel?combinationId=${combinationId}`,
        {
          headers: {
            "qamis-request-key": process.env.NEXT_PUBLIC_QAMIS_REQUEST_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data || [];
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!combinationId,
  });
};
