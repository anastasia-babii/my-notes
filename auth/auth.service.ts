import { AppDataSource } from "../datasource";
import { User } from "../user/user.entity";
import { AuthLoginDto } from "./dto/auth-login.dto";
import Unauthorized from "../error/http-error-unauthorized";
import { HashService } from "../services/hash-service/hash.service";
import { ErrorMessages } from "../error/messages.enum";
import { TokenService } from "../services/token.service";
import { AuthSignupDto } from "./dto/auth-signup.dto";
import ConflictError from "../error/http-error-conflict";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async login({ email, password }: AuthLoginDto): Promise<string> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) {
      throw new Unauthorized(ErrorMessages.Unauthorized);
    }
    const hashService = new HashService();

    const passwordMath = await hashService.compareHashes({
      password: password,
      hashedPassword: user.password,
    });

    if (!passwordMath) {
      throw new Unauthorized(ErrorMessages.Unauthorized);
    }

    const tokenService = new TokenService();
    return tokenService.sign({
      email,
    });
  }

  async signup({ email, phone, firstName, lastName, password }: AuthSignupDto) {
    const existingDBUser = await this.userRepo.findOne({
      where: [{ email }, { phone }],
    });

    if (existingDBUser) {
      throw new ConflictError(ErrorMessages.UserAlreadyExists);
    }

    const hashService = new HashService();
    const hashedPassword = await hashService.hash(password);

    await this.userRepo.save({
      email,
      phone,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const tokenService = new TokenService();

    return tokenService.sign({
      email,
    });
  }
}
