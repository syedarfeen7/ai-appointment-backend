import { HTTPStausMessages } from "../../config/http.config";
import { User } from "../../database";
import { UpdateUserDto } from "./dtos/update-user.dto";

export class UserService {
  async getUserById(userId: string | undefined) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error(HTTPStausMessages.USER_NOT_FOUND);
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
      throw new Error(HTTPStausMessages.USER_NOT_FOUND);
    }
    return user;
  }
}
