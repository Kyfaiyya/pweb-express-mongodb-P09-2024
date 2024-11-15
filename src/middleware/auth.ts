import jwt from 'jsonwebtoken';
import { type NextFunction } from 'express';
import { type Request, type Response } from 'express';
import User from '../models/user.models';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).send({ error: 'Authorization header is missing' });
        }

        const token = authHeader.replace('Bearer ', '');
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            return res.status(401).send({ error: 'Invalid token or user not found' });
        }

        (req as any).token = token;
        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};
