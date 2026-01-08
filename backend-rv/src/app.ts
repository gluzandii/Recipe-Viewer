import express from "express";
import cookieParser from "cookie-parser";
import {authRouter} from "./routes/auth.js";
import {recipesRouter} from "./routes/recipes.js";
import {ingredientsRouter} from "./routes/ingredients.js";
import {fileURLToPath} from "node:url";
import path from "node:path";

export const app: express.Express = express();

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes must come before static file serving
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "../build")));

// Catch-all route to serve index.html for client-side routing
app.get(/.*/, (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

