import { asyncHandler } from "../../common/middlewares";
import { UserService } from "./user.service";
import { Request, Response } from "express";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getMe = asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.user?.userId;
    const user = await this.userService.getUserById(userId);
    return res.status(200).json({ user });
  });

  public updateMe = asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.user?.userId;
    const updateData = req?.body;

    const user = await this.userService.updateUserById(userId, updateData);
    return res.status(200).json({ user });
  });
}
