import mongoose from "mongoose";
import { UserActivity } from "../../database/models/user-activity.model";
import { UserActionEnum } from "../enums/user-activity.enum";

export const logUserActivity = async ({
  userId,
  action,
  metadata,
  req,
}: {
  userId: mongoose.Types.ObjectId;
  action: UserActionEnum;
  metadata?: Record<string, any>;
  req?: any;
}) => {
  try {
    await UserActivity.create({
      userId,
      action,
      metadata,
      userAgent: req?.get("User-Agent"),
    });
  } catch {
    console.log("Failed to log user activity");
  }
};
