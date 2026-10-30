import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config.js";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;