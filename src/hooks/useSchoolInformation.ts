"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse, ErrorResponse } from "@/types/ApiRespnse";
import { SchoolIdentificationFormValues } from "@/components/school-identification/types/schema";

// Create a mapper to transform frontend data to match backend expectations
const mapToBackendFormat = (data: SchoolIdentificationFormValues) => {
  // Calculate totals
  const totalStudents = parseInt(data.numBoys) + parseInt(data.numGirls);
  const totalTeachers = data.maleTotalTeachers + data.femaleTotalTeachers;
  const totalAssistantTeachers = data.maleAssistantTeachers + data.femaleAssistantTeachers;
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
    
    // Location
    longitude: data.longitude,
    latitude: data.latitude,
    
    // Include school relationship if available
    school: {
      id: null // This would need to be populated with the actual school ID
    }
  };
};

export const useSaveSchoolIdentification = () => {
  return useMutation<ApiResponse<any>, ErrorResponse, SchoolIdentificationFormValues>({
    mutationFn: async (data: SchoolIdentificationFormValues) => {
      // Transform data to match backend expectations
      const backendData = mapToBackendFormat(data);
      
      console.log("Frontend data:", data);
      console.log("Transformed backend data:", backendData);
      
      // Make the POST request with the transformed data
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/qamis/school-identification/saveschool-identification`,
        backendData
      );
      
      return response.data;
    },
  });
};