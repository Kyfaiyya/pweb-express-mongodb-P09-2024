import { Book } from "../models/book.model";

interface newbook {
    title: string;
    author: string;
    publishedDate: Date;
    publisher: string;
    description: string;
    coverImage: string;
    tags: string[];
    initialQty: number;
    qty: number;
    rating: {
        average: number;
        count: number;
    };
}

interface updatebook {
    title?: string;
    author?: string;
    publishedDate?: Date;
    publisher?: string;
    description?: string;
    coverImage?: string;
    tags?: string[];
    initialQty?: number;
    qty?: number;
    rating?: {
        average: number;
        count: number;
    };
}

export type { newbook, updatebook };

export const bookservice = {
    async getAllBooks() {
        try {
            return await Book.find();
        } catch (error) {
            console.error("Error fetching all books:", error);
            throw new Error("Could not fetch books");
        }
    },

    async getBookById(id: string) {
        try {
            const book = await Book.findById(id);
            if (!book) throw new Error("Book not found");
            return book;
        } catch (error) {
            console.error(`Error fetching book with id ${id}:`, error);
            throw new Error("Could not fetch the specified book");
        }
    },

    async deleteBookById(id: string) {
        try {
            const book = await Book.findByIdAndDelete(id);
            if (!book) throw new Error("Book not found");
            return book;
        } catch (error) {
            console.error(`Error deleting book with id ${id}:`, error);
            throw new Error("Could not delete the specified book");
        }
    },

    async createBook(newBook: newbook) {
        try {
            const book = await Book.create(newBook);
            return book;
        } catch (error) {
            console.error("Error creating new book:", error);
            throw new Error("Could not create book");
        }
    },

    async updateBook(id: string, updateBook: updatebook) {
        try {
            const bookFound = await Book.findById(id);
            if (!bookFound) throw new Error("Book not found");

            Object.assign(bookFound, updateBook); // Update only provided fields
            await bookFound.save();
            return bookFound;
        } catch (error) {
            console.error(`Error updating book with id ${id}:`, error);
            throw new Error("Could not update the specified book");
        }
    }
};
