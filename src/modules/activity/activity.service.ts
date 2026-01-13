import { getActivityMessage } from "../../shared/utils/activity/activity-message.util";
import { UserActivity } from "../../database/models/user-activity.model";

interface GetActivitiesInput {
  page: number;
  limit: number;
}

export class ActivityService {
  async getAllUserActivities({ page, limit }: GetActivitiesInput) {
    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
      UserActivity.find({})
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      UserActivity.countDocuments({}),
    ]);

    return {
      items: activities?.map((activity: any) => ({
        id: activity._id,
        message: getActivityMessage(activity, "admin", activity.userId.name),
        createdAt: activity.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserActivities(
    userId: string | undefined,
    { page, limit }: GetActivitiesInput
  ) {
    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
      UserActivity.find({ userId })
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      UserActivity.countDocuments({ userId }),
    ]);

    return {
      items: activities?.map((activity: any) => ({
        id: activity._id,
        message: getActivityMessage(activity, "user", activity.userId.name),
        createdAt: activity.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
