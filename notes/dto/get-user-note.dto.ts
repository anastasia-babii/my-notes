import { IsNotEmpty, IsUUID } from "class-validator";

export class GetUserNoteDto {
  constructor(noteId: string) {
    this.noteId = noteId;
  }
  @IsNotEmpty()
  @IsUUID("4")
  noteId: string;
}
