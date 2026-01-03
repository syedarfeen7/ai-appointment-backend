import { Schema, model, Types } from "mongoose";
import { UserActionEnum } from "../../shared/enums/user-activity.enum";

const UserActivitySchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: {
      type: String,
      enum: Object.values(UserActionEnum),
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    userAgent: String,
  },
  { timestamps: true }
);

export const UserActivity = model("UserActivity", UserActivitySchema);
