import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

export interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, secretKey) as JwtPayload;
        (req as AuthenticatedRequest).user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};
