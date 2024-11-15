// db-connection.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
    const url = process.env.MONGO_URL || "";
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
};

export default dbConnection;
