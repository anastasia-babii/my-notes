import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditNoteDto {
  constructor({ title, content }: EditNoteDto) {
    this.title = title;
    this.content = content;
  }
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;
}
