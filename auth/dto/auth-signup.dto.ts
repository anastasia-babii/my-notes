import { IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";
import { AuthLoginDto } from "./auth-login.dto";

export class AuthSignupDto extends AuthLoginDto {
  constructor({ email, password, firstName, lastName, phone }: AuthSignupDto) {
    super({ email, password });
    this.phone = phone;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @IsNotEmpty()
  @IsPhoneNumber("UA")
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  lastName: string;
}
