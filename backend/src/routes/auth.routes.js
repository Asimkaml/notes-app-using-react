import { Router } from "express";
import { signup, login, logout, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { authLimiter } from "../middlewares/rateLimit.js";
import { signupSchema, loginSchema } from "../validators/auth.validators.js";

const router = Router();

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;