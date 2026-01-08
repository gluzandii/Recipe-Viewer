import express from "express";
import cookieParser from "cookie-parser";
import {authRouter} from "./routes/auth.js";
import {recipesRouter} from "./routes/recipes.js";
import {ingredientsRouter} from "./routes/ingredients.js";
import cors from "cors";
import "dotenv/config"

export const app: express.Express = express();
if (!process.env.RV_FRONT) {
    console.error("RV_FRONT environment variable is not set.");
    process.exit(1)
}
const RV_FRONT = process.env.RV_FRONT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:${RV_FRONT}`,
    credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
