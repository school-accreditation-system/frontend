"use client";

import { ApiResponse, ErrorResponse } from "@/types/ApiRespnse";
import { HeadTeacherDTO, SchoolDTO } from "@/types/school";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { School } from "@/types/school";

export interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export const useAddSchool = () => {
  return useMutation<
    ApiResponse<{ SchoolDTO }>,
    ErrorResponse,
    {
      school: SchoolDTO;
      headTeacher: HeadTeacherDTO;
      locationCode: string;
    }
  >({
    mutationFn: async (data: {
      school: SchoolDTO;
      headTeacher: HeadTeacherDTO;
      locationCode: string;
    }) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/add-school?locationCode=${data.locationCode}`,
        {
          school: data.school,
          headTeacher: data.headTeacher,
        }
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetSchool = (schoolId?: string) => {
  return useQuery<ApiResponse<SchoolDTO>, ErrorResponse>({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      if (!schoolId) throw new Error("School ID is required");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/get-school/${schoolId}`
      );
      return response.data;
    },
    enabled: !!schoolId,
  });
};

export const useGetSchools = (searchKey: string) => {
  return useQuery<School[], Error, string>({
    queryKey: ["ALL_SCHOOLS", searchKey],
    queryFn: async () => {
      const response = await axios.get<School[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/searchSchool?schoolName=${searchKey}`,
        {
          headers: {
            "qamis-request-key": process.env.NEXT_PUBLIC_QAMIS_REQUEST_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
