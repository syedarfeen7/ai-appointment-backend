import { Router } from "express";
import { authController } from "./index";
import { forgotPasswordLimiter } from "../../common/middlewares/rateLimit";

const router = Router();

router.post("/signup", authController.signup);
router.post("/verify/email", authController.verifyEmail);
router.post("/login", authController.login);
router.post(
  "/forgot/password",
//   forgotPasswordLimiter,
  authController.forgotPassword
);
router.post("/reset/password", authController.resetPassword);
router.post("/logout", authController.logout);

export default router;
