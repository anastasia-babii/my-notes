import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from "class-validator";
import { ErrorMessages } from "../../error/messages.enum";

export class AuthLoginDto {
  constructor({ email, password }: AuthLoginDto) {
    this.email = email;
    this.password = password;
  }
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message: ErrorMessages.PasswordRequirements,
  })
  password: string;
}
