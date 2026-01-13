import { Router } from "express";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { UserRole } from "../../shared/enums/user-role.enum";
import { roleGuard } from "../../shared/middlewares/role.guard";
import { doctorController } from "./index";
import { uploadImage } from "../../shared/utils/upload/multer.util";

const router = Router();

router.post(
  "/profile",
  authMiddleware,
  roleGuard(UserRole.DOCTOR),
  uploadImage.single("profilePicture"),
  doctorController.completeProfile
);
export default router;
