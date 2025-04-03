"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SchoolDTO, HeadTeacherDTO } from "@/types/school";
import { ApiResponse, ErrorResponse } from "@/types/ApiRespnse";
export const useAddSchool = () => {
    return useMutation<ApiResponse<{SchoolDTO}>, ErrorResponse, {
        school: SchoolDTO,
        headTeacher: HeadTeacherDTO,
        locationCode: string
  }>({
      mutationFn: async (data: {
          school: SchoolDTO,
          headTeacher: HeadTeacherDTO,
        locationCode: string
      }) => {   
    
    console.log("data ==>", data);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school/addschool?locationCode=${data.locationCode}`, {
        school: data.school,
        headTeacher: data.headTeacher,
    });
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, 
  });
};
