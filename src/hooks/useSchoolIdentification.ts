"use client";

import { SchoolIdentificationFormValues } from "@/components/school-identification/types/schema";
import { ApiResponse, ErrorResponse } from "@/types/ApiRespnse";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// Create a mapper to transform frontend data to match backend expectations
const mapToBackendFormat = (
  data: SchoolIdentificationFormValues,
  schoolId: string
) => {
  // Calculate totals
  const totalStudents = parseInt(data.numBoys) + parseInt(data.numGirls);
  const totalTeachers = data.maleTotalTeachers + data.femaleTotalTeachers;
  const totalAssistantTeachers =
    data.maleAssistantTeachers + data.femaleAssistantTeachers;
  const totalAdministrativeStaff =
    (data.numberOfSecretary || 0) +
    (data.numberOfLibrarian || 0) +
    (data.numberOfAccountant || 0) +
    (data.numberOfDeputyHeadTeacher || 0);

  return {
    // Map fields from frontend to backend
    owner: data.schoolOwner,
    school_curriculum: data.schoolCurriculum,
    establishment_date: data.yearOfEstablishment,
    school_type: data.typeOfSchool,
    boardingType: data.accommodationStatus.toUpperCase(),
    schoolSatus: data.status.toUpperCase(),

    // Student information
    numberOfBoys: parseInt(data.numBoys),
    numberOfGirls: parseInt(data.numGirls),
    total_students: totalStudents,
    numberOfStudentWithSEN: parseInt(data.numStudentsWithSEN),

    // Teaching staff
    numberOfMaleTeacher: data.maleTotalTeachers,
    numberOfFemaleTeacher: data.femaleTotalTeachers,
    totalNumberOfTeacher: totalTeachers,
    numberOfMaleAssistantTeacher: data.maleAssistantTeachers,
    numberOfFemaleAssistantTeacher: data.femaleAssistantTeachers,
    totalNumberOfAssistantTeacher: totalAssistantTeachers,

    // Administrative staff
    numberOfSecretary: data.numberOfSecretary || 0,
    numberOfLibrarian: data.numberOfLibrarian || 0,
    numberOfAccountant: data.numberOfAccountant || 0,
    numberOfDeputyHeadTeacher: data.numberOfDeputyHeadTeacher || 0,
    numberOfOtherStaff: data.numberOfOtherStaff || "",
    totalNumberOfAdministrativeStaff: totalAdministrativeStaff,

    // Supporting staff
    numberOfCleaner: data.cleaners,
    numberOfWatchmen: data.watchmen,
    numberOfStoreKeeper: data.storekeeper,
    numberOfDriver: data.drivers,
    numberOfOtherSupportingStaff: data.otherSupportingStaff || "",

    // Infrastructure
    numberOfClassroom: parseInt(data.numClassrooms),
    numberOfLatrineAndToilet: parseInt(data.numLatrines),
    numberOfKichen: parseInt(data.numKitchens),
    numberOfDinningHall: parseInt(data.numDiningHalls),
    numberOfLibrary: parseInt(data.numLibraries),
    numberOfSmartClassroom: parseInt(data.numSmartClassrooms),
    numberOfComputerLaboratory: parseInt(data.numComputerLabs),
    numberOfAdministrativeStaffOffice: parseInt(data.numAdminOffices),
    numberOfMultipleHall: parseInt(data.numMultipurposeHalls),
    numberOfAcademicStaffRoom: parseInt(data.numAcademicStaffRooms),

    longitude: data.longitude,
    latitude: data.latitude,
    school: {
      id: schoolId,
    },
    actionType: data.actionType || "SCHOOL",
  };
};

export const useSaveSchoolIdentification = (schoolId: string) => {
  return useMutation<
    ApiResponse<any>,
    ErrorResponse,
    SchoolIdentificationFormValues
  >({
    mutationFn: async (data: SchoolIdentificationFormValues) => {
      // Transform data to match backend expectations
      const backendData = mapToBackendFormat(data, schoolId);

      // Make the POST request with the transformed data
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school-identification/saveschool-identification?schoolId=${backendData.school.id}`,
        backendData
      );

      return response.data;
    },
  });
};

const mapToFrontendFormat = (data: any) => {
  if (!data) return {}; // Handle null/undefined data

  // Adding defensive programming to avoid runtime errors
  return {
    schoolOwner: data.owner || "",
    schoolCurriculum: data.school_curriculum || "",
    yearOfEstablishment: data.establishment_date || "",
    typeOfSchool: data.school_type || "",
    accommodationStatus: data.boardingType || "",
    status: data.schoolSatus || "",

    // Student information - convert to string safely
    numBoys: data.numberOfBoys?.toString() || "0",
    numGirls: data.numberOfGirls?.toString() || "0",
    numStudentsWithSEN: data.numberOfStudentWithSEN?.toString() || "0",

    // Teaching staff
    maleTotalTeachers: data.numberOfMaleTeacher,
    femaleTotalTeachers: data.numberOfFemaleTeacher,
    maleAssistantTeachers: data.numberOfMaleAssistantTeacher,
    femaleAssistantTeachers: data.numberOfFemaleAssistantTeacher,

    // Administrative staff
    numberOfSecretary: data.numberOfSecretary,
    numberOfLibrarian: data.numberOfLibrarian,
    numberOfAccountant: data.numberOfAccountant,
    numberOfDeputyHeadTeacher: data.numberOfDeputyHeadTeacher,
    numberOfOtherStaff: data.numberOfOtherStaff,

    // Supporting staff
    cleaners: data.numberOfCleaner,
    watchmen: data.numberOfWatchmen,
    storekeeper: data.numberOfStoreKeeper,
    drivers: data.numberOfDriver,
    otherSupportingStaff: data.numberOfOtherSupportingStaff,

    // Infrastructure
    numClassrooms: data.numberOfClassroom.toString(),
    numLatrines: data.numberOfLatrineAndToilet.toString(),
    numKitchens: data.numberOfKichen.toString(),
    numDiningHalls: data.numberOfDinningHall.toString(),
    numLibraries: data.numberOfLibrary.toString(),
    numSmartClassrooms: data.numberOfSmartClassroom.toString(),
    numComputerLabs: data.numberOfComputerLaboratory.toString(),
    numAdminOffices: data.numberOfAdministrativeStaffOffice.toString(),
    numMultipurposeHalls: data.numberOfMultipleHall.toString(),
    numAcademicStaffRooms: data.numberOfAcademicStaffRoom.toString(),

    longitude: data.longitude || "",
    latitude: data.latitude || "",
    schoolId: data.school?.id || "",
  };
};

export const useGetSchoolIdentification = (schoolId: string) => {
  return useQuery<
    ApiResponse<SchoolIdentificationFormValues>,
    ErrorResponse,
    SchoolIdentificationFormValues
  >({
    queryKey: ["school-identification", schoolId],
    queryFn: async () => {
      const response = await axios.get<
        ApiResponse<SchoolIdentificationFormValues> | ErrorResponse
      >(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school-identification/get-school-identification?schoolId=${schoolId}`
      );
      if (response.data.data) {
        const mappedData = mapToFrontendFormat(response.data.data);
        return mappedData;
      }
      return response.data;
    },
    enabled: !!schoolId,
  });
};

export const useUpdateSchoolIdentification = (schoolId: string) => {
  return useMutation({
    mutationFn: async (data: SchoolIdentificationFormValues) => {
      const backendData = mapToBackendFormat(data, schoolId);
      const response = await axios.put<string>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school-identification/update-school-identification?schoolId=${schoolId}`,
        backendData
      );
      console.log("Response from update school identification", response.data);
      return response.data;
    },
    enabled: !!schoolId,
  });
};
