import { Response, NextFunction, Request } from "express";
import { verifyAccessToken } from "../utils/jwt.util";
import { SessionModel } from "../../database/models/session.model";
import { HTTPStatusCodes } from "../../config/http.config";
import { UserRole } from "../enums/user-role.enum";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(HTTPStatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const accessToken = authHeader.split(" ")[1];

    const payload = verifyAccessToken(accessToken) as {
      userId: string;
      role: UserRole;
      sessionId: string;
    };

    const session = await SessionModel.findById(payload.sessionId);
    if (!session) {
      return res
        .status(HTTPStatusCodes.UNAUTHORIZED)
        .json({ message: "Session expired" });
    }
    req.user = {
      userId: payload.userId,
      role: payload.role,
      sessionId: payload.sessionId,
    };

    next();
  } catch (error) {
    return res
      .status(HTTPStatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid or expired token" });
  }
};
