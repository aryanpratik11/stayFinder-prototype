import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDB_URL);
        console.log("Connected to Database");
    } catch (err) {
        console.error("Failed:", err.message);
    }
};

export default connectDB;