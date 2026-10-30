import { HttpError } from "../utils/httpError.js";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return next(new HttpError(400, result.error.issues[0].message));
  }
  req.body = result.data; // cleaned: trimmed, lowercased, extra fields dropped
  next();
};