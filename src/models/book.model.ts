import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    initialQty: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    rating: {
        average: {
            type: Number,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
    },
});

const Book = mongoose.model("Book", bookSchema);

export { Book };