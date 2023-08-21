import { IsNotEmpty, IsUUID } from "class-validator";

export class FindUserByIdParamsDto {
  constructor(id: string) {
    this.id = id;
  }
  @IsNotEmpty()
  @IsUUID("4")
  id: string;
}
