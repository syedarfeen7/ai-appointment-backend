import { UserRole } from "../../../shared/enums/user-role.enum";

export interface SignupDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
}
