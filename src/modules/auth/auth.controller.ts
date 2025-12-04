import { Request, Response } from "express";
import { asyncHandler } from "../../common/middlewares";
import { AuthService } from "./auth.service";
import { signupSchema } from "../../common/validators/user.validator";
import { HTTPStausCodes } from "../../config/http.config";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public signup = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const { error } = signupSchema.validate(req.body);

    if (error) {
      return res
        .status(HTTPStausCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
    const user = await this.authService.signup(data);

    return res.status(HTTPStausCodes.CREATED).json({ user });
  });
}
