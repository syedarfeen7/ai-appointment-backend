import { DoctorService } from "./doctor.service";

export class DoctorController {
  private doctorService: DoctorService;

  constructor(doctorService: DoctorService) {
    this.doctorService = doctorService;
  }
}
