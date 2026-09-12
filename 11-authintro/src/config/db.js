import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected successfully");
}