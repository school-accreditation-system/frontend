"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  useGetLocationsByParentCode,
  useGetProvinces,
} from "@/hooks/useLocation";
import { useAddSchool } from "@/hooks/useSchool";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  SchoolRegistrationFormData,
  schoolRegistrationSchema,
} from "../types/schema";
import { useSchool } from "@/components/auth/SchoolContext";

export function useRegisterSchool() {
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<
    string | undefined
  >();
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<
    string | undefined
  >();
  const [selectedSectorCode, setSelectedSectorCode] = useState<
    string | undefined
  >();
  const [selectedCellCode, setSelectedCellCode] = useState<
    string | undefined
  >();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Fetch data from the backend using React Query
  const { data: provinces, isLoading: isProvincesLoading } = useGetProvinces();
  const { data: districts, isLoading: isDistrictsLoading } =
    useGetLocationsByParentCode(selectedProvinceCode);
  const { data: sectors, isLoading: isSectorsLoading } =
    useGetLocationsByParentCode(selectedDistrictCode);
  const { data: cells, isLoading: isCellsLoading } =
    useGetLocationsByParentCode(selectedSectorCode);
  const { data: villages, isLoading: isVillagesLoading } =
    useGetLocationsByParentCode(selectedCellCode);
  const [error, setError] = useState<string>("");
  const { mutate: addSchool, isPending: isAddingSchool } = useAddSchool();
  const { setSchool } = useSchool();

  const form = useForm<SchoolRegistrationFormData>(
    {
      resolver: zodResolver(schoolRegistrationSchema),
      defaultValues: {
        name: "",
        province: "",
        district: "",
        sector: "",
        cell: "",
        village: "",
        email: "",
        phone: "",
        htName: "",
        htEmail: "",
        qualification: undefined,
        telephone: "",
        schoolShortName: "",
      },
    },
    {
      mode: "onSubmit",
    }
  );

  // Handler functions for location selection
  const handleProvinceChange = (value: string, locationCode: string) => {
    form.setValue("province", value, { shouldValidate: true });
    setSelectedProvinceCode(locationCode);

    // Reset downstream values
    form.setValue("district", "", { shouldValidate: true });
    form.setValue("sector", "", { shouldValidate: true });
    form.setValue("cell", "", { shouldValidate: true });
    form.setValue("village", "", { shouldValidate: true });

    // Reset downstream selected codes
    setSelectedDistrictCode(undefined);
    setSelectedSectorCode(undefined);
    setSelectedCellCode(undefined);
  };

  const handleDistrictChange = (value: string, locationCode: string) => {
    form.setValue("district", value, { shouldValidate: true });
    setSelectedDistrictCode(locationCode);

    // Reset downstream values
    form.setValue("sector", "", { shouldValidate: true });
    form.setValue("cell", "", { shouldValidate: true });
    form.setValue("village", "", { shouldValidate: true });

    // Reset downstream selected codes
    setSelectedSectorCode(undefined);
    setSelectedCellCode(undefined);
  };

  const handleSectorChange = (value: string, locationCode: string) => {
    form.setValue("sector", value, { shouldValidate: true });
    setSelectedSectorCode(locationCode);

    // Reset downstream values
    form.setValue("cell", "", { shouldValidate: true });
    form.setValue("village", "", { shouldValidate: true });

    // Reset downstream selected codes
    setSelectedCellCode(undefined);
  };

  const handleCellChange = (value: string, locationCode: string) => {
    form.setValue("cell", value, { shouldValidate: true });
    setSelectedCellCode(locationCode);

    // Reset downstream values
    form.setValue("village", "", { shouldValidate: true });
  };

  const handleVillageChange = (value: string) => {
    form.setValue("village", value, { shouldValidate: true });
  };

  const qualificationOptions = [
    { value: "Diploma A2", label: "Diploma A2" },
    { value: "Associate Degree", label: "Associate Degree" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "PhD", label: "PhD" },
  ];

  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

  const onSubmit = async (data: SchoolRegistrationFormData) => {
    addSchool(
      {
        school: {
          shortName: data.schoolShortName?.toUpperCase(),
          schoolName: data.name,
          email: data.email,
          phone: data.phone,
          schoolName: data.name,
        },
        headTeacher: {
          firstName: data.htFirstName,
          lastName: data.htLastName,
          email: data.htEmail,
          phoneNumber: data.htPhone,
          highestQualification: data.qualification,
          gender: data.gender,
        },
        locationCode: data.village,
      },
      {
        onSuccess: (data) => {
          setSchool(data.data);
          toast({
            title: "Success",
            description: "School registered successfully!",
            status: "info",
          });
          setIsSuccess(true);
        },
        onError: (error) => {
          if (error.response?.data?.message) {
            setError(error.response.data.message);
            toast({
              title: "Error",
              description: error.response.data.message,
              status: "error",
            });
          } else {
            setError(error.message);
            toast({
              title: "Error",
              description:
                "An error occurred while registering the school. Please try again.",
              status: "error",
            });
          }
        },
      }
    );
  };

  return {
    provinces,
    districts,
    sectors,
    cells,
    villages,
    isProvincesLoading,
    isDistrictsLoading,
    isSectorsLoading,
    isCellsLoading,
    isVillagesLoading,
    selectedProvinceCode,
    selectedDistrictCode,
    selectedSectorCode,
    selectedCellCode,
    handleProvinceChange,
    handleDistrictChange,
    handleSectorChange,
    handleCellChange,
    handleVillageChange,
    qualificationOptions,
    isSuccess,
    genderOptions,
    form,
    onSubmit,
    error,
    isSubmitting: isAddingSchool,
  };
}
