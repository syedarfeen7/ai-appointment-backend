import { HTTPStausMessages, HTTPStatusCodes } from "../../config/http.config";
import { User } from "../../database";
import { AppError } from "../../shared/errors/app-error";
import { UpdateUserDto } from "./dtos/update-user.dto";

export class UserService {
  async getUserById(userId: string | undefined) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new AppError(
        HTTPStausMessages.USER_NOT_FOUND,
        HTTPStatusCodes.NOT_FOUND
      );
    }
    return user;
  }

  async updateUserById(
    userId: string | undefined,
    updateData: Partial<UpdateUserDto>
  ) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      throw new AppError(
        HTTPStausMessages.USER_NOT_FOUND,
        HTTPStatusCodes.NOT_FOUND
      );
    }
    return user;
  }
}
