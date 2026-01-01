import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Raw Provider DB connected");
  } catch (err) {
    console.error("DB connection failed", err.message);
    process.exit(1);
  }
}
