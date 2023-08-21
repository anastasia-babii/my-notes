import { Column, PrimaryGeneratedColumn } from "typeorm";
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsPhoneNumber,
  Length,
} from "class-validator";

export class CreateUserDto {
  constructor({ lastName, firstName, phone, email }: CreateUserDto) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.email = email;
  }
  @IsNotEmpty()
  @IsEmail()
  email: string;

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
