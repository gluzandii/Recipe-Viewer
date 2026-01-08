import express from "express";
import cookieParser from "cookie-parser";
import {authRouter} from "./routes/auth.js";

export const app: express.Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);