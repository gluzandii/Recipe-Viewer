import {Router, type Router as ExpressRouter} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {z} from "zod";
import {eq} from "drizzle-orm";

import {db} from "../db/index.js";
import {users} from "../db/schema.js";
import {requireAuth} from "../middleware/auth.js";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");

export const authRouter: ExpressRouter = Router();

/**
 * POST /auth/register
 * body: { name, email, password }
 * response: { user: { id, name, email } }
 */
authRouter.post("/register", async (req, res) => {
    const schema = z.object({
        name: z.string().min(1, "name is required"),
        email: z.email("invalid email"),
        password: z.string().min(5, "password must be at least 5 characters"),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Validation error",
            details: z.treeifyError(parsed.error),
        });
    }

    const {name, email, password} = parsed.data;
    const normalizedEmail = email.toLowerCase();

    // check existing email
    const existing = await db
        .select({id: users.id})
        .from(users)
        .where(eq(users.email, normalizedEmail))
        .limit(1);

    if (existing.length > 0) {
        return res.status(409).json({error: "Email already exists"});
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [created] = await db
        .insert(users)
        .values({
            name,
            email: normalizedEmail,
            passwordHash,
        })
        .returning({id: users.id, name: users.name, email: users.email});

    return res.status(201).json({user: created});
});

/**
 * POST /auth/login
 * body: { email, password }
 * response: { user: { id, name, email } }
 * side-effect: sets cookie "session"
 */
authRouter.post("/login", async (req, res) => {
    const schema = z.object({
        email: z.email("invalid email"),
        password: z.string().min(5, "password is required"),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            error: "Validation error",
            details: z.treeifyError(parsed.error),
        });
    }

    const {email, password} = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const [user] = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            passwordHash: users.passwordHash,
        })
        .from(users)
        .where(eq(users.email, normalizedEmail))
        .limit(1);

    // avoid leaking whether email exists
    if (!user) return res.status(401).json({error: "Invalid credentials"});

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({error: "Invalid credentials"});

    const token = jwt.sign({sub: user.id.toString()}, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("session", token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
        user: {id: user.id, name: user.name, email: user.email},
    });
});

/**
 * GET /auth/me
 * response: { user: { id, name, email } }
 * requires: valid session cookie
 */
authRouter.get("/me", requireAuth, async (req, res) => {
    const userId = (req as any).userId;

    const [user] = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

    if (!user) {
        return res.status(404).json({error: "User not found"});
    }

    return res.json({user});
});

/**
 * DELETE /auth/delete
 * response: { message: "Account deleted successfully" }
 * requires: valid session cookie
 * side-effect: deletes user account and all associated recipes/ingredients
 */
authRouter.delete("/delete", requireAuth, async (req, res) => {
    try {
        const userId = (req as any).userId;

        // Verify user exists
        const [user] = await db
            .select({id: users.id})
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        // Delete user (cascades to delete all recipes and ingredients)
        await db.delete(users).where(eq(users.id, userId));

        // Clear the session cookie
        res.clearCookie("session");

        return res.status(200).json({message: "Account deleted successfully"});
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({error: "Failed to delete account"});
    }
});

