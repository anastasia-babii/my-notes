import { IsString, Length, IsOptional } from "class-validator";

export class UpdateUserDto {
  constructor({ firstName, lastName }: UpdateUserDto) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  @IsOptional()
  @IsString()
  @Length(3, 15)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(3, 15)
  lastName?: string;
}
