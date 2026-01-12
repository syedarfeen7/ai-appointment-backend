import { Schema, model, Types } from "mongoose";

export interface IDoctorProfile {
  userId: Types.ObjectId;
  profilePicture?: string;
  specialties: string[];
  experienceYears: number;
  consultationFee: number;
  about: string;
  clinicAddress?: string;
  isProfileCompleted: boolean;
  isVerified: boolean;
}

const doctorProfileSchema = new Schema<IDoctorProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    specialties: {
      type: [String],
      required: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    clinicAddress: {
      type: String,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const DoctorProfile = model<IDoctorProfile>(
  "DoctorProfile",
  doctorProfileSchema
);
