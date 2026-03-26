import { User } from "../../database";
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
        runValidators: true,
      },
    );

    return profile;
  }

  async getMyProfile(userId: string) {
    const user = await User.findById(userId).select(
      "firstName lastName email phoneNumber role",
    );

    if (!user) return null;

    const profile = await DoctorProfile.findOne({ userId });

    return {
      user,
      profile,
    };
  }
}
