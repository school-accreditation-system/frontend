"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Location } from "@/types/Location";
import axios from "axios";
import { HeadTeacherDTO } from "@/types/HeadTeacher";
export const useAddHeadTeacher = () => {
  return useMutation<string, Error, HeadTeacherDTO>({
    mutationFn: async (data: HeadTeacherDTO) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/addheadteacher`, data);
      return response.data;
    },
  });
};

export const useGetHeadTeacherBySchoolId = (schoolId: string) => {
    return useQuery<{
        message: string;
        data: HeadTeacherDTO;
    }, Error>({
        queryKey: ['head-teacher'],
        queryFn: async () => {
            const response = await axios.get<{
                message: string;
                data: HeadTeacherDTO;
            }>(`${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/head-teacher/get-head-teacher?schoolId=${schoolId}`);
            return response.data;
        },
    });
};