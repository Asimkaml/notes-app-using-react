import { Router } from "express";
import { listNotes, createNote, updateNote, deleteNote } from "../controllers/notes.controller.js";
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { noteSchema } from "../validators/note.validators.js";

const router = Router();

router.use(requireAuth); // every route below need login

router.get("/", listNotes);
router.post("/", validate(noteSchema), createNote);
router.put("/:id", validate(noteSchema), updateNote);
router.delete("/:id", deleteNote);

export default router;