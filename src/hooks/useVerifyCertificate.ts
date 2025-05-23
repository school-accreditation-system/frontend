import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface CertificateInfo {
  certificateId: string; // e.g., "ACCERT-PEM-2025-75696"
  schoolName: string; // e.g., "LYCEE DE KIGALI"
  combinationName: string; // e.g., "Physics Economy and Mathematics"
  combinationAbbreviation: string; // e.g., "PEM"
  startDate: string; // e.g., "2024-04-10 02:00:00.0"
  endDate: string; // e.g., "2030-04-10 02:00:00.0"
}

export const useVerifyCertificate = (certificateId: string) => {
  const { data, isLoading, error } = useQuery<CertificateInfo>({
    queryKey: ["verify-certificate", certificateId],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/qamis/schoolCombination/get-certificate-info/${certificateId}`
      );
      return response.data;
    },
    enabled: !!certificateId && certificateId.trim().length > 0, // Only run query if certificateId exists
    retry: false, // Don't retry on error for certificate verification
  });

  return {
    data,
    isLoading,
    error,
  };
};
