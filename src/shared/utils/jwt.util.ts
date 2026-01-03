import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { config } from "../../config/env.config";

const accessSecret: Secret = config.JWT.ACCESS_SECRET;
const refreshSecret: Secret = config.JWT.REFRESH_SECRET;

const accessTokenOptions: SignOptions = {
  expiresIn: config.JWT.ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
};

const refreshTokenOptions: SignOptions = {
  expiresIn: config.JWT.REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
};

export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, accessSecret, accessTokenOptions);
};

export const signRefreshToken = (payload: object): string => {
  return jwt.sign(payload, refreshSecret, refreshTokenOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret);
};
