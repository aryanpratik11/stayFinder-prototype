import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRouter from "./routes/authRouters.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRouters.js"
import listingRouter from "./routes/listingRouters.js";
import bookingRouter from "./routes/bookingRouters.js";

let app = express();

app.use(cors({
    origin: "https://stayfinder-prototype.onrender.com",
    credentials: true
}));

let port = process.env.port;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/bookings", bookingRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Server running at ${port}`);
});

