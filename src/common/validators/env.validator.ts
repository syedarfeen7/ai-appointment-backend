import Joi from "joi";
import dotenv from "dotenv";

dotenv.config(); // load .env first

// Joi schema for environment variables
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").required(),
  APP_ORIGIN: Joi.string().required(),
  PORT: Joi.number().required(),
  ACCOUNT_VERIFICATION_EXPIRES_IN_MINUTES: Joi.number().required(),
  BASE_PATH: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),
  PASSWORD_RESET_SECRET: Joi.string().required(),
  PASSWORD_RESET_EXPIRES_IN: Joi.string().required(),
  MAILER_SENDER: Joi.string().required(),
}).unknown(true);

// validate and export
export const validateEnv = () => {
  const { error } = envSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
};
