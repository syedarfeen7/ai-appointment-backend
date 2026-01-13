import { UserActionEnum } from "../../enums/user-activity.enum";
import { parseUserAgent } from "../user/user-agent.util";

type MessageContext = "user" | "admin";

export const getActivityMessage = (
  activity: any,
  context: MessageContext,
  userName?: string
): string => {
  const { action, userAgent } = activity;
  const { browser, os } = parseUserAgent(userAgent);

  const device =
    browser && os
      ? ` from ${browser} on ${os}`
      : browser
      ? ` from ${browser}`
      : "";

  //USER VIEW
  if (context === "user") {
    switch (action) {
      case UserActionEnum.LOGIN:
        return `You logged in${device}`;
      case UserActionEnum.FORGOT_PASSWORD:
        return "You requested a password reset";
      case UserActionEnum.REGISTER:
        return "You created your account";
      case UserActionEnum.RESET_PASSWORD:
        return "You reset your password";
      default:
        return "You performed an action";
    }
  }

  //ADMIN VIEW
  const name = userName ?? "User";
  switch (action) {
    case UserActionEnum.LOGIN:
      return `${name} logged in${device}`;
    case UserActionEnum.FORGOT_PASSWORD:
      return `${name} requested a password reset`;
    case UserActionEnum.REGISTER:
      return `${name} created an account`;
    case UserActionEnum.RESET_PASSWORD:
      return `${name} reset their password`;
    default:
      return `${name} performed an action`;
  }
};
