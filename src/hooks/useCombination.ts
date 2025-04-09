"use client"

import { useQuery } from "@tanstack/react-query";
import { Location } from "@/types/Location";
import axios from "axios";

interface Combination {
    id: string;
    code: string;
    fullName: string;
    shortName: string;
    combinationType: string;
    category: string;
    description: string;
}
export const useGetCombinations = () => {
  return useQuery<Combination[], Error>({
    queryKey: ["Combinations"],
    queryFn: async () => {
    const response = await axios.get<Combination[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/qamis/combination/getallLevels`);
    console.log("response ==>", response.data);
      return response.data;
    },
    refetchOnWindowFocus: true,
      refetchOnMount: true,
  });
};
    