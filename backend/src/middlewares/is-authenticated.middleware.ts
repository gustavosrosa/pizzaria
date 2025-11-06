import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) { // Necessary the next to continue the execution
    
    // Receive the token
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // Valid the token
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    } catch (error) {
        return res.status(401).end();
    }

    return next();
}