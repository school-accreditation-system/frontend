import { HeadTeacher } from "./HeadTeacher";
export interface SchoolDTO {
  schoolCode: string;
  schoolName: string;
  shortName: string;
  email: string;
  phone: string;
}

export interface School {
  id: string;
  schoolCode: string;
  schoolName: string;
  shortName: string;
  email: string;
  phone: string;
  village: Location;
  headTeacher: HeadTeacher;
}
