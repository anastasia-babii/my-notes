import { AppDataSource } from "../datasource";
import { Note } from "./note.entity";
import { CreateNoteDto } from "./dto/create-note.dto";
import NotFoundError from "../error/http-error-not-found";
import { ErrorMessages } from "../error/messages.enum";
import { EditNoteDto } from "./dto/edit-note.dto";

export class NoteService {
  private noteRepository = AppDataSource.getRepository(Note);

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteRepository.save(createNoteDto);
  }

  async getUserNote(noteId: string, userId: string) {
    const note = await this.noteRepository.findOne({
      where: {
        userId: userId,
        id: noteId,
      },
    });

    if (!note) {
      throw new NotFoundError(ErrorMessages.NoteNotFound);
    }

    return note;
  }

  async getAllNotes(userId: string): Promise<Note[]> {
    const notes: Note[] = await this.noteRepository.find({
      where: { userId: userId },
    });
    if (!notes || notes.length === 0) {
      throw new NotFoundError(ErrorMessages.NoteNotFound);
    }

    return notes;
  }

  async deleteNote(noteId: string, userId: string) {
    const noteToDelete = await this.getUserNote(noteId, userId);
    if (!noteToDelete) {
      throw new NotFoundError(ErrorMessages.NoteNotFound);
    }
    await this.noteRepository.delete(noteId);
  }
  //sssssssssssssss
  async editNote(noteId: string, editNoteDto: EditNoteDto, userId: string) {
    const noteToUpdate = await this.getUserNote(noteId, userId);
    if (!noteToUpdate) {
      throw new NotFoundError(ErrorMessages.NoteNotFound);
    }
    if (editNoteDto.title) {
      noteToUpdate.title = editNoteDto.title;
    }

    if (editNoteDto.content) {
      noteToUpdate.content = editNoteDto.content;
    }

    return await this.noteRepository.save(noteToUpdate);
  }
}
