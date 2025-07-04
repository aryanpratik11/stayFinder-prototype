import mongoose from "mongoose";
import users from "./users.js";

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    images: [{
        type: String
    }],
    location: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true });

const listings = mongoose.model("listings", listingSchema);

export default listings;
