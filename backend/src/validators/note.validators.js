import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty.").max(100, "Title too long."),
  content: z.string().max(5000, "Note too long.").default(""),
});