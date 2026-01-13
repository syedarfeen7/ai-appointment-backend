import { nanoid } from "nanoid";

export function generateUniqueCode() {
  return nanoid(25);
}
