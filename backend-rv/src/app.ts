import express from "express";
import cookieParser from "cookie-parser";
import {authRouter} from "./routes/auth.js";
import {recipesRouter} from "./routes/recipes.js";
import {ingredientsRouter} from "./routes/ingredients.js";
import cors from "cors";
import path from "node:path";
import {fileURLToPath} from "node:url";

export const app: express.Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `http://localhost:5173`,
    credentials: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../build")));

app.get(/.*/, (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
})

app.use("/api/auth", authRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
