import { z } from 'zod';

export const schoolRegistrationSchema = z.object({
  name: z.string().min(1, 'School name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  website: z.string().url('Invalid website URL').optional(),
  provinceCode: z.string().min(1, 'Province is required'),
  districtCode: z.string().min(1, 'District is required'),
  sectorCode: z.string().min(1, 'Sector is required'),
  cellCode: z.string().min(1, 'Cell is required'),
  villageCode: z.string().min(1, 'Village is required')
}); 