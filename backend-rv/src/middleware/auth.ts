import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.session;
    if (!token) return res.sendStatus(401);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as unknown as { sub: string };
        (req as any).userId = parseInt(payload.sub, 10);
        next();
    } catch {
        res.sendStatus(401);
    }
}

