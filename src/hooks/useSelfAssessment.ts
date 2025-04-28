import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Your existing interfaces
export interface Applicant {
  applicantName: string;
  email: string;
  nationalId: string;
  role: string;
  telephone: string;
}

export interface SubmissionDTO {
  applicant: Applicant;
  options: string[];
  selectedCombination: string;
  schoolId: string;
}

// New interface for the combined submission
interface AccreditationSubmission {
  selfAssessment: {
    options: string[];
    ranking?: string;
    action: string;
    createdAt?: Date;
  };
  applicationRequest: {
    nationalId: string;
    applicantRole: string;
    email: string;
    phoneNumber: string;
    status?: string;
  };
  combinationId: string;
  schoolId: string;
}

export const useSubmitAccreditation = () => {
  return useMutation<ApiResponse<any>, ErrorResponse, SubmissionDTO>({
    mutationFn: async (data: SubmissionDTO) => {
      const submission: AccreditationSubmission = {
        selfAssessment: {
          options: data.options,
          action: "SCHOOL",
          createdAt: new Date(),
        },
        applicationRequest: {
          nationalId: data.applicant.nationalId,
          applicantRole: data.applicant.role,
          email: data.applicant.email,
          phoneNumber: data.applicant.telephone,
          status: "UNDER_REVIEW",
        },
        combinationId: data.selectedCombination,
        schoolId: data.schoolId,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/self-assessement/submit-accreditation?combinationId=${submission.combinationId}&schoolId=${submission.schoolId}`,
        submission,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
};
