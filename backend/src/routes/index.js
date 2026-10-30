import { Router } from "express";
import authRoutes from "./auth.routes.js";
import notesRoutes from "./notes.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/notes", notesRoutes);

export default router;