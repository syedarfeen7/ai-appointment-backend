import { Request, Response } from "express";
import { asyncHandler } from "../../common/middlewares";
import { AuthService } from "./auth.service";
import {
  loginSchema,
  signupSchema,
} from "../../common/validators/user.validator";
import { HTTPStausCodes } from "../../config/http.config";
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from "../../common/utils/cookie.util";
import { verifyRefreshToken } from "../../common/utils/jwt.util";

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

  public verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code || typeof code !== "string") {
      return res
        .status(HTTPStausCodes.BAD_REQUEST)
        .json({ message: "Verification code is required" });
    }

    await this.authService.verifyEmail(code);
    return res
      .status(HTTPStausCodes.OK)
      .json({ message: "Email verified successfully" });
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const userAgent = req.get("User-Agent") || "unknown";
    data.userAgent = userAgent;
    const { error } = loginSchema.validate(data);

    if (error) {
      return res
        .status(HTTPStausCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
    const { user, accessToken, refreshToken } = await this.authService.login(
      data
    );

    setRefreshTokenCookie(res, refreshToken);
    return res.status(HTTPStausCodes.OK).json({
      message: "Login successful",
      user,
      accessToken,
    });
  });

  public logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      const payload = verifyRefreshToken(refreshToken) as any;
      await this.authService.logout(payload?.sessionId);
    }

    clearRefreshTokenCookie(res);
    return res.status(HTTPStausCodes.OK).json({ message: "Logout successful" });
  });
}
