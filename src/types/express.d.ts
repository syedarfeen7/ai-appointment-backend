import { UserRole } from "../common/enums/user-role.enum";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: UserRole;
        sessionId: string;
      };
    }
  }
}

export {};
