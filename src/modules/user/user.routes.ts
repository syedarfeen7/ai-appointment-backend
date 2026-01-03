import { Router } from "express";
import { userController } from "./index";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, userController.getMe);
router.patch("/me", authMiddleware, userController.updateMe);

export default router;
