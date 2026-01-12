export interface DoctorProfileDTO {
  profilePicture?: string;
  specialties: string[];
  experienceYears: number;
  consultationFee: number;
  about: string;
  clinicAddress?: string;
}
