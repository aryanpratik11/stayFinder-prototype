import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouters.js";
import cookieParser from "cookie-parser";

dotenv.config();

let port= process.env.port;

let app= express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(port, ()=>{
    connectDB();
    console.log(`Server running at ${port}`);
});