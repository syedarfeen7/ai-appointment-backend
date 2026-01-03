import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})
  .required()
  .unknown(true);
export const loginSchema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().required(),
  userAgent: Joi.string().optional(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});
