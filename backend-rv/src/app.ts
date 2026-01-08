import express from "express";
import cookieParser from "cookie-parser";
import {authRouter} from "./routes/auth.js";
import {recipesRouter} from "./routes/recipes.js";
import {ingredientsRouter} from "./routes/ingredients.js";
import cors from "cors";

export const app: express.Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
