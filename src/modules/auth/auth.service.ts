import { VerificationEnum } from "../../common/enums/verification-code.enum";
import { verificationEmailTemplate } from "../../common/template/verification-email";
import { timeFromNowInMinutes } from "../../common/utils/date-time";
import { sendMail } from "../../common/utils/mailer";
import { config } from "../../config/env";
import { HTTPStausMessages } from "../../config/http.config";
import { User } from "../../database";
import VerificationCodeModel from "../../database/models/verification.model";
import { SignupDTO } from "./dtos";

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
}
