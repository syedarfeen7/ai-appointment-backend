import { Router } from "express";

import authRoutes from "./modules/auth/auth.routes";
import activityRoutes from "./modules/activity/activity.routes";
import userRoutes from "./modules/user/user.routes";
import doctorRoutes from "./modules/doctor/doctor.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/activities", activityRoutes);
router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);

export default router;
