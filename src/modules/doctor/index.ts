import { DoctorService } from "./doctor.service";
import { DoctorController } from "./doctor.controller";

const doctorService = new DoctorService();
const doctorController = new DoctorController(doctorService);

export { doctorService, doctorController };
