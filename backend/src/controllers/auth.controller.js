import bcrypt from "bcryptjs";
// import { prisma } from "../lib/prisma.js";
import { HttpError } from "../utils/httpError.js";
import { signToken, setAuthCookie, clearAuthCookie } from "../utils/token.js";

const publicUser = { id: true, name: true, email: true };

// fake hash. compare against it when email unknown, so timing same.
let dummyHashPromise;

const getDummyHash = () => {
  if (!dummyHashPromise) {
    dummyHashPromise = bcrypt.hash("not-a-real-password", 12);
  }

  return dummyHashPromise;
};
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await req.prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new HttpError(409, "An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await req.prisma.user.create({
    data: { name, email, passwordHash },
    select: publicUser,
  });

  setAuthCookie(res, signToken(user.id));
  res.status(201).json(user);
};  

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await req.prisma.user.findUnique({ where: { email } });
  const ok = await bcrypt.compare(password, user ? user.passwordHash : await getDummyHash());

  if (!user || !ok) throw new HttpError(401, "Wrong email or password.");

  setAuthCookie(res, signToken(user.id));
  res.json({ id: user.id, name: user.name, email: user.email });
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  res.sendStatus(204);
};

export const me = (req, res) => {
  res.json(req.user);
};