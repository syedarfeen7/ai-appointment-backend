import { Router } from "express";
import { authController } from "./index";

const router = Router();

router.post("/signup", authController.signup);
router.post("/verify/email", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/forgot/password", authController.forgotPassword);
router.post("/logout", authController.logout);

export default router;
