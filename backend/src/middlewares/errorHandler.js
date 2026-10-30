import { HttpError } from "../utils/httpError.js";

export const notFound = (req, res) => {
  res.status(404).json({ message: "Route not found." });
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.code === "P2002") {
    return res.status(409).json({ message: "That already exists." });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON." });
  }

  console.error(err); // always log real error
  res.status(500).json({ message: "Something went wrong on the server." });
};