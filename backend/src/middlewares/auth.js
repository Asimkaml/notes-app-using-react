// import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/httpError.js";
import { verifyToken } from "../utils/token.js";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new HttpError(401, "Not logged in.");

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new HttpError(401, "Session expired. Please log in again.");
  }

  const user = await req.prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true },
  });
  if (!user) throw new HttpError(401, "Session invalid.");

  req.user = user;
  next();
};