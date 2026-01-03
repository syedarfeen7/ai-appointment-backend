import { Router } from "express";
import { activityController } from ".";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { roleGuard } from "../../shared/middlewares/role.guard";
import { UserRole } from "../../shared/enums/user-role.enum";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleGuard(UserRole.ADMIN),
  activityController.getAllUserActivities
);

router.get(
  "/user",
  authMiddleware,
  activityController.getUserActivities
);

export default router;
