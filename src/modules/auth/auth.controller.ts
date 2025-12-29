import { Request, Response } from "express";
import { asyncHandler } from "../../common/middlewares";
import { AuthService } from "./auth.service";
import {
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "../../common/validators/user.validator";
import { HTTPStatusCodes } from "../../config/http.config";
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
    const data = req?.body;
    const { error } = signupSchema.validate(data);

    if (error) {
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
    const user = await this.authService.signup(req as any, data);

    return res.status(HTTPStatusCodes.CREATED).json({ user });
  });

  public verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code || typeof code !== "string") {
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .json({ message: "Verification code is required" });
    }

    await this.authService.verifyEmail(code);
    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "Email verified successfully" });
  });

  public login = asyncHandler(async (req: Request, res: Response) => {
    const data = req?.body;
    const userAgent = req.get("User-Agent") || "unknown";
    data.userAgent = userAgent;
    const { error } = loginSchema.validate(data);

    if (error) {
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
    const { user, accessToken, refreshToken } = await this.authService.login(
      req as any,
      data
    );

    setRefreshTokenCookie(res, refreshToken);
    return res.status(HTTPStatusCodes.OK).json({
      message: "Login successful",
      user,
      accessToken,
    });
  });
  public forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .json({ message: "Email is required" });
    }

    await this.authService.forgotPassword(req as any, email);
    return res
      .status(HTTPStatusCodes.OK)
      .json({ message: "Password reset link sent" });
  });

  public resetPassword = asyncHandler(async (req, res) => {
    const token = req?.query?.token as string;
    const data = req?.body;

    if (!token) {
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .json({ message: "Reset token is required" });
    }

    const { error } = resetPasswordSchema.validate(data);
    if (error) {
      return res
        .status(HTTPStatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }

    await this.authService.resetPassword(req as any, token, data);

    return res.status(HTTPStatusCodes.OK).json({
      message: "Password reset successful. Please login again.",
    });
  });

  public logout = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      const payload = verifyRefreshToken(refreshToken) as any;
      await this.authService.logout(payload?.sessionId);
    }

    clearRefreshTokenCookie(res);
    return res.status(HTTPStatusCodes.OK).json({ message: "Logout successful" });
  });
}
