import { Request, Response } from "express";
import { asyncHandler } from "../../common/middlewares";
import { HTTPStatusCodes } from "../../config/http.config";
import { ActivityService } from "./activity.service";

export class ActivityController {
  private activityService: ActivityService;

  constructor(activityService: ActivityService) {
    this.activityService = activityService;
  }

  getMyActivities = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.userId;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const data = await this.activityService.getUserActivities({
      userId,
      page,
      limit,
    });

    res.status(HTTPStatusCodes.OK).json(data);
  });
}
