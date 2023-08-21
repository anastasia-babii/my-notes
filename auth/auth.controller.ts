import express from "express";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { validateOrReject } from "class-validator";
import { AuthService } from "./auth.service";
import { AuthSignupDto } from "./dto/auth-signup.dto";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const authLoginDto = new AuthLoginDto(req.body);
    await validateOrReject(authLoginDto);
    const authService = new AuthService();
    const token = await authService.login(authLoginDto);

    return res.send({ token });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const authSignupDto = new AuthSignupDto(req.body);
    await validateOrReject(authSignupDto);
    const authService = new AuthService();
    const token = await authService.signup(authSignupDto);

    return res.send({ token });
  } catch (err) {
    next(err);
  }
});

export { router as authRouter };
