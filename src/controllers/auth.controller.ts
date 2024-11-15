import { type NextFunction } from "express";
import { type Request, type Response } from "express";
import { auth } from "../services/auth.service";
import { type newUser, type login } from "../services/auth.service";

export const authcontroller = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await auth.register(req.body as newUser);
            res.status(201).send({
                status: "success",
                message: "User registered successfully",
                data: {
                    user: {
                        username: user.username,
                        _id: user._id,
                    },
                },
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body as login;
            const { user, token } = await auth.login({ username, password });
            res.status(200).send({
                status: "success",
                message: "User logged in successfully",
                data: {
                    user: {
                        username: user.username,
                        _id: user._id,
                    },
                    token,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    async healthCheck(req: Request, res: Response, next: NextFunction) {
        const currentDate = new Date().toISOString().split('T')[0];
        try {
            res.status(200).send({
                status: "success",
                message: "Auth service is running",
                data: {
                    date: currentDate,
                },
                
            });
        } catch (error) {
            res.status(500).send({
                status: "error",
                message: "Health check encountered an error",
                data: {
                    date: currentDate,
                    error: error,
                },
            });
        }
    }
};
