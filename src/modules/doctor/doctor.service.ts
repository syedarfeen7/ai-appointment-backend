import { DoctorProfile } from "../../database/models/doctor.model";
import { DoctorProfileDTO } from "./dtos/doctor-profile.dto";

export class DoctorService {
  async createOrUpdateProfile(userId: string, data: DoctorProfileDTO) {
    const profile = await DoctorProfile.findOneAndUpdate(
      { userId },
      {
        ...data,
        isProfileCompleted: true,
      },
      {
        new: true,
        upsert: true,
      }
    );

    return profile;
  }

  async getMyProfile(userId: string) {
    return DoctorProfile.findOne({ userId });
  }
}
