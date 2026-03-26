import { UserRole } from "../../../shared/enums/user-role.enum";

export interface SignupDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
}
