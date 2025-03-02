import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import stripeRouter from "./routes/stripe.js";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/checkout", stripeRouter);

// Connection from Mongoose to MongoDB Atlas
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to MongoDB Atlas");
  } catch (error) {
    console.log("Error connecting to MongoDB Atlas,", error.message);
    process.exit(1);
  }
};
connectToDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
