import { config } from "../../config/env.config";
import { timeFromNowInMinutes } from "../utils/date-time.util";

export const verificationEmailTemplate = (
  name: string,
  verificationLink: string
) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 40px 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border-radius: 8px; overflow: hidden;">
      <tr>
        <td style="background: #4f46e5; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Verify Your Email</h1>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px;">
          <p>Hello <strong>${name}</strong>,</p>
          <p>Please click the button below to verify your email address.</p>

          <p style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}"
              style="background: #4f46e5; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none;">
              Verify Email
            </a>
          </p>

          <p>If the button does not work, copy this link:</p>
          <p style="word-break: break-all; color: #4f46e5;">${verificationLink}</p>

          <p>This link expires in ${
            timeFromNowInMinutes(
              Number(config.MAILER.ACCOUNT_VERIFICATION_EXPIRES_IN_MINUTES)
            )?.readable
          }</p>
        </td>
      </tr>

      <tr>
        <td style="background: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} Your Company.
        </td>
      </tr>
    </table>
  </div>
`;
