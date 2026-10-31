// import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/httpError.js";

const parseId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) throw new HttpError(400, "Invalid note id.");
  return id;
};

export const listNotes = async (req, res) => {
  const notes = await req.prisma.note.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const note = await req.prisma.note.create({
    data: { ...req.body, userId: req.user.id },
  });
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
  const id = parseId(req.params.id);

  const result = await req.prisma.note.updateMany({
    where: { id, userId: req.user.id }, 
    data: req.body,
  });
  if (result.count === 0) throw new HttpError(404, "Note not found.");

  const note = await req.prisma.note.findUnique({ where: { id } });
  res.json(note);
};

export const deleteNote = async (req, res) => {
  const id = parseId(req.params.id);

  const result = await req.prisma.note.deleteMany({
    where: { id, userId: req.user.id },
  });
  if (result.count === 0) throw new HttpError(404, "Note not found.");

  res.sendStatus(204);
};