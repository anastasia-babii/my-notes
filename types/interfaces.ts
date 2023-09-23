import { Request as ExpressRequest } from "express";
import { File } from "multer";

export interface Name {
  firstName: string;
  lastName: string;
}

export interface MulterRequest extends Request {
  file: File;
}

export interface UserPayload {
  email: string;
  id: string;
}

export interface CompareHashesArgs {
  password: string;
  hashedPassword: string;
}

export interface Request extends ExpressRequest {
  user: any;
}

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
      email: string;
    };
  }
}
