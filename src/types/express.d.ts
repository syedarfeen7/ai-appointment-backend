import { UserRole } from "../shared/enums/user-role.enum";
import { Multer } from "multer";
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: UserRole;
        sessionId: string;
      };
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}

export {};
