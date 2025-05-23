import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Location interface
export interface Location {
  id: string;
  state: number;
  version: number;
  locationCode: string;
  locationType: string;
  locationName: string;
  parent?: Location; // Optional, as it can be nested
}

// HeadTeacher interface
export interface HeadTeacher {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  highestQualification: string;
  createdAt?: string | null; // Optional, as it can be null
}

// Combination interface
export interface Combination {
  id: string;
  code: string;
  fullName: string;
  shortName: string;
  combinationType: string;
  category: string;
  description?: string | null; // Optional, as it can be null
}

// School interface
export interface School {
  id: string;
  schoolCode?: string | null; // Optional, as it can be null
  schoolName: string;
  shortName: string;
  email: string;
  createdAt?: string | null; // Optional, as it can be null
  location: Location;
  headTeachers: HeadTeacher[];
  combinations?: Combination[] | null; // Optional, as it can be null
}

// Assessment interface
export interface Assessment {
  id: string;
  school?: School; // Optional, as it can be null
  combination?: Combination; // Optional, as it can be null
  ranking?: string; // Optional, as it can be null
  options?: Array<{ name: string } | string>; // Can be an array of objects or strings
}

// AccreditationRequest interface
export interface AccreditationRequest {
  id: string;
  nationalId: string;
  applicantRole: string;
  email: string;
  phoneNumber: string;
  status: string;
  documentPath?: string | null; // Optional, as it can be null
  createdAt: string;
  applicationCode?: string | null; // Optional, as it can be null
  assessment?: Assessment; // Optional, as it can be null
  ranking: string; // Assuming this is a string based on the provided object
  overAllWeight: string; // Assuming this is a string based on the provided object
  requestDate: string; // Assuming this is a string based on the provided object
}

const useGetAccreditationRequests = () => {
  return useQuery({
    queryKey: ["accreditationRequests"],
    queryFn: async (): Promise<AccreditationRequest[]> => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/request/getAllRequests`
      );
      console.log("response.data==>", response.data);
      return response.data;
    },
  });
};

export default useGetAccreditationRequests;
