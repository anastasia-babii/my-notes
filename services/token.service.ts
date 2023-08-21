import jwt from "jsonwebtoken";
import { UserPayload } from "../types/interfaces";
export class TokenService {
  secretKey = "asrdfujyikpol;['okjuhygfdx";

  // Make this function as async
  sign(payload: UserPayload): string {
    // return new Promise(...)
    return jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
  }
}
