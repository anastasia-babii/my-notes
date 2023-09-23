import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
  constructor({ title, content, userId }: CreateNoteDto) {
    this.title = title;
    this.content = content;
    this.userId = userId;
  }
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
