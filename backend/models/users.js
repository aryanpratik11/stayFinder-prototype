import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isHost: {
        type: Boolean,
        default: false
    },
    listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }]
}, { timestamps: true });

const users= mongoose.model("users", userSchema);

export default users;