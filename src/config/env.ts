import { getEnv, getEnvNumber } from "../common/utils/get-env";
import { validateEnv } from "../common/validators/env.validator";

validateEnv(); // validate environment variables at startup

export const config = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "http://localhost:3000"),
  PORT: getEnvNumber("PORT", 5000),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  MONGO_URI: getEnv("MONGO_URI"),
  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
  },
  MAILER: {
    HOST: getEnv("SMTP_HOST"),
    PORT: getEnvNumber("SMTP_PORT", 465),
    USER: getEnv("SMTP_USER"),
    PASS: getEnv("SMTP_PASS"),
    SENDER: getEnv("MAILER_SENDER"),
  },
} as const;
