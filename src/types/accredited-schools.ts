export interface ProcessedSchoolDTO {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  combinations: CombinationDTO[];
  schoolLocation: LocationDTO;
}

export interface CombinationDTO {
  name: string;
  accreditationDate: string;
  fullName: string;
}

export interface LocationDTO {
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}
