import { config } from "../../config/env.config";
import { timeFromNowInMinutes } from "../utils/date-time.util";

export const forgotPasswordEmailTemplate = (
  name: string,
  resetLink: string
) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f7; padding: 40px 0;">
    <table
      align="center"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="max-width: 600px; background: #ffffff; border-radius: 8px; overflow: hidden;"
    >
      <tr>
        <td style="background: #dc2626; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">
            Reset Your Password
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px;">
          <p>Hello <strong>${name}</strong>,</p>

          <p>
            We received a request to reset your account password.
            Click the button below to create a new password.
          </p>

          <p style="text-align: center; margin: 30px 0;">
            <a
              href="${resetLink}"
              style="
                background: #dc2626;
                color: #ffffff;
                padding: 14px 28px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: bold;
              "
            >
              Reset Password
            </a>
          </p>

          <p style="margin-top: 20px;">
            This password reset link will expire in
            <strong>
              ${
                timeFromNowInMinutes(
                  Number(config.JWT.PASSWORD_RESET_EXPIRES_IN)
                )?.readable
              }
            </strong>.
          </p>

          <p style="margin-top: 20px; color: #555;">
            If you did not request a password reset, please ignore this email.
            Your password will remain unchanged.
          </p>
        </td>
      </tr>

      <tr>
        <td
          style="
            background: #f4f4f7;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999;
          "
        >
          © ${new Date().getFullYear()} Your Company. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
`;
