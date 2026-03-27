import { Response } from "express";
import { config } from "../../../config/env.config";

const isProd = config.NODE_ENV === "production";
const sameSite =
  config.COOKIE.SAME_SITE.toLowerCase() as "lax" | "strict" | "none";
const secure = isProd ? config.COOKIE.SECURE : false;

export const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/api/v1/auth",
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure,
    sameSite,
    path: "/api/v1/auth",
  });
};
