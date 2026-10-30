import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(50, "Name too long."),
  email: z.string().trim().toLowerCase().email("Enter a valid email.").max(254),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password too long."),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  password: z.string().min(1, "Password is required."),
});