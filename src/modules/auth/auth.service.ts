import { VerificationEnum } from "../../common/enums/verification-code.enum";
import { forgotPasswordEmailTemplate } from "../../common/template/forgot-password-email";
import { verificationEmailTemplate } from "../../common/template/verification-email";
import { timeFromNowInMinutes } from "../../common/utils/date-time.util";
import { signAccessToken, signRefreshToken } from "../../common/utils/jwt.util";
import { sendMail } from "../../common/utils/mailer.util";
import { config } from "../../config/env.config";
import { HTTPStausMessages } from "../../config/http.config";
import { User } from "../../database";
import { SessionModel } from "../../database/models/session.model";
import VerificationCodeModel from "../../database/models/verification.model";
import { LoginDTO, SignupDTO } from "./dtos";
import { ResetPasswordDTO } from "./dtos/reset-password.dto";

export class AuthService {
  async signup(data: SignupDTO) {
    const { name, email, password } = data;

    const existing = await User.findOne({ email });
    if (existing) throw new Error(HTTPStausMessages.ALREADY_EXISTS);

    const user = await User.create({
      name,
      email,
      password,
    });

    const verificationCode = await VerificationCodeModel.create({
      userId: user?._id,
      type: VerificationEnum.EMAIL_VERIFICATION,
      expiresAt: timeFromNowInMinutes(
        Number(config.MAILER.ACCOUNT_VERIFICATION_EXPIRES_IN_MINUTES)
      )?.date,
    });

    const verificationLink = `${config.APP_ORIGIN}/auth/verify/email?code=${verificationCode?.code}`;

    const html = verificationEmailTemplate(name, verificationLink);

    await sendMail({
      to: user?.email,
      subject: "Welcome to our platform",
      html,
    });

    return user;
  }
  async verifyEmail(code: string) {
    const verificationRecord = await VerificationCodeModel.findOne({
      code,
      type: VerificationEnum.EMAIL_VERIFICATION,
    }).select("+expiresAt +userId");
    if (!verificationRecord) {
      throw new Error(HTTPStausMessages.INVALID_OR_EXPIRED_CODE);
    }

    if (verificationRecord.expiresAt < new Date()) {
      throw new Error(HTTPStausMessages.INVALID_OR_EXPIRED_CODE);
    }

    const user = await User.findById(verificationRecord.userId);
    if (!user) {
      throw new Error(HTTPStausMessages.USER_NOT_FOUND);
    }

    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
      await VerificationCodeModel.deleteMany({
        userId: user._id,
        type: VerificationEnum.EMAIL_VERIFICATION,
      });
    }

    return;
  }

  async login(data: LoginDTO) {
    const { email, password, userAgent } = data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error(HTTPStausMessages.INVALID_CREDENTIALS);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error(HTTPStausMessages.INVALID_CREDENTIALS);
    }

    const session = await SessionModel.create({
      userId: user._id,
      userAgent: userAgent || "unknown",
    });

    const accessToken = signAccessToken({
      userId: user._id,
      sessionId: session._id,
    });

    const refreshToken = signRefreshToken({
      sessionId: session._id,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(HTTPStausMessages.USER_NOT_FOUND);
    }

    const { code } = await VerificationCodeModel.create({
      userId: user?._id,
      type: VerificationEnum.PASSWORD_RESET,
      expiresAt: timeFromNowInMinutes(
        Number(config.JWT.PASSWORD_RESET_EXPIRES_IN)
      )?.date,
    });

    const resetLink = `${config.APP_ORIGIN}/reset/password?token=${code}`;

    const html = forgotPasswordEmailTemplate(user.name, resetLink);
    await sendMail({
      to: user.email,
      subject: "Password Reset",
      html,
    });
  }
  public async resetPassword(token: string, data: ResetPasswordDTO) {
    const verification = await VerificationCodeModel.findOne({
      code: token,
      type: VerificationEnum.PASSWORD_RESET,
    });

    if (!verification) {
      throw new Error(HTTPStausMessages.INVALID_OR_EXPIRED_CODE);
    }

    if (verification.expiresAt < new Date()) {
      await verification.deleteOne();
      throw new Error(HTTPStausMessages.INVALID_OR_EXPIRED_CODE);
    }

    const user = await User.findById(verification.userId).select("+password");
    if (!user) {
      throw new Error(HTTPStausMessages.USER_NOT_FOUND);
    }

    user.password = data?.password;
    await user.save();

    await VerificationCodeModel.deleteMany({
      userId: user._id,
      type: VerificationEnum.PASSWORD_RESET,
    });

    await SessionModel.deleteMany({ userId: user._id });
  }

  public async logout(id: string) {
    await SessionModel.deleteOne({ _id: id });
  }
}
