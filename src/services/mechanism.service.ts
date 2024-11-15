import { Book } from "../models/book.model";

export const mechanism = {
    async borrow (id: string) {
        try {
            const book = await Book.findById(id);
            if (!book) throw new Error("Book not found");
            if (book.qty === 0) throw new Error("Book out of stock");
            book.qty -= 1;
            await book.save();
            return book;
        } catch (error) {
            console.error(`Error borrowing book with id ${id}:`, error);
            throw new Error("Could not borrow the specified book");
        }
    },

    async returnBook (id: string) {
        try {
            const book = await Book.findById(id);
            if (!book) throw new Error("Book not found");
            book.qty += 1;
            await book.save();
            return book;
        } catch (error) {
            console.error(`Error returning book with id ${id}:`, error);
            throw new Error("Could not return the specified book");
        }
    }
};