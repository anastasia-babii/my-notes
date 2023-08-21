import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { TokenService } from "../services/token.service";
import { Request } from "../types/interfaces";
import { ErrorMessages } from "../error/messages.enum";
import Unauthorized from "../error/http-error-unauthorized";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Unauthorized(ErrorMessages.NoTokenProvided);
  }

  const bearer = "Bearer ";
  if (!authHeader.startsWith(bearer)) {
    throw new Unauthorized(ErrorMessages.InvalidTokenFormat);
  }
  const token = authHeader.replace(bearer, "");

  const tokenService = new TokenService();
  try {
    req.user = jwt.verify(token, tokenService.secretKey);
    next();
  } catch (e) {
    throw new Unauthorized(ErrorMessages.InvalidToken);
  }
};
