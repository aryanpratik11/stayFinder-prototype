import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listings",
        required: true
    },
    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked",
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const bookings = mongoose.model("bookings", bookingSchema);

export default bookings;
