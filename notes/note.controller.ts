import express from "express";
import { authMiddleware } from "../middleware/jwt.middleware";
import { CreateNoteDto } from "./dto/create-note.dto";
import { NoteService } from "./note.service";
import { validateOrReject } from "class-validator";
import { EditNoteDto } from "./dto/edit-note.dto";
import { GetUserNoteDto } from "./dto/get-user-note.dto";

const router = express.Router();

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const createNoteDto = new CreateNoteDto({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
    });
    await validateOrReject(createNoteDto);
    const noteService = new NoteService();
    const note = await noteService.createNote(createNoteDto);
    return res.json(note);
  } catch (err) {
    next(err);
  }
});

router.get("/:noteId", authMiddleware, async (req, res, next) => {
  try {
    const getUserNoteDto = new GetUserNoteDto(req.params.noteId);
    await validateOrReject(getUserNoteDto);
    const noteService = new NoteService();
    const note = await noteService.getUserNote(req.params.noteId, req.user.id);
    return res.json(note);
  } catch (err) {
    next(err);
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const noteService = new NoteService();
    const notes = await noteService.getAllNotes(req.user.id);
    return res.json(notes);
  } catch (err) {
    next(err);
  }
});

router.delete("/:noteId", authMiddleware, async (req, res, next) => {
  try {
    const noteService = new NoteService();
    await noteService.deleteNote(req.params.noteId, req.user.id);
    return res.status(200).send();
  } catch (err) {
    next(err);
  }
});

router.put("/:noteId", authMiddleware, async (req, res, next) => {
  try {
    const editNoteDto = new EditNoteDto(req.body);
    await validateOrReject(editNoteDto);
    const noteService = new NoteService();
    const updatedNote = await noteService.editNote(
      req.params.noteId,
      editNoteDto,
      req.user.id
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.json(updatedNote);
  } catch (err) {
    next(err);
  }
});

export { router as noteRouter };
