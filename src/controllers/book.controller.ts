import { type NextFunction } from "express";
import { type Request, type Response } from "express";

import { bookservice } from "../services/book.service";
import { type newbook } from "../services/book.service";
import { type updatebook} from "../services/book.service";
import { get } from "mongoose";

export const bookcontroller = {
    async getAllBooks(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await bookservice.getAllBooks();
            res.status(200).send({
                status: "success",
                message: "Books fetched successfully",
                data: books,
            });
        } catch (error) {
            res.status(500).send({
                status: "error",
                message: "Could not fetch books",
            });
        }
    },

    async getBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await bookservice.getBookById(req.params.id);
            res.status(200).send({
                status: "success",
                message: "Book fetched successfully",
                data: book,
            });
        } catch (error) {
            res.status(404).send({
                status: "error",
                message: (error as Error).message,
            });
        }
    },

    async addBook(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await bookservice.createBook(req.body as newbook);
            res.status(201).send({
                status: "success",
                message: "Book added successfully",
                data: book,
            });
        } catch (error) {
            res.status(400).send({
                status: "error",
                message: (error as Error).message,
            });
        }
    },

    async updateBook(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await bookservice.updateBook(req.params.id, req.body as updatebook);
            res.status(200).send({
                status: "success",
                message: "Book updated successfully",
                data: book,
            });
        } catch (error) {
            res.status(400).send({
                status: "error",
                message: (error as Error).message,
            });
        }
    },

    async deleteBookById(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await bookservice.deleteBookById(req.params.id);
            res.status(200).send({
                status: "success",
                message: "Book deleted successfully",
                data: book,
            });
        } catch (error) {
            res.status(404).send({
                status: "error",
                message: (error as Error).message,
            });
        }
    }
};

