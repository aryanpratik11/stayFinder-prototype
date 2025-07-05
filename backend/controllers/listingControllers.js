import listings from "../models/listings.js";
import cloudinaryUpload from "../config/cloudinary.js";
import users from "../models/users.js";


export const createListing = async (req, res) => {
    try {
        const hostId = req.user._id;
        const { title, description, location, city, state, rent, category } = req.body;
        console.log("req.user in createListing:", req.user);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image." });
        }

        const uploadedImages = [];
        for (const file of req.files) {
            const url = await cloudinaryUpload(file.path);
            if (url) uploadedImages.push(url);
        }

        const listing = await listings.create({
            title,
            description,
            location,
            city,
            state,
            rent,
            images: uploadedImages,
            host: hostId,
            category,
        });

        await users.findByIdAndUpdate(
            hostId,
            { $push: { listings: listing._id } },
            { new: true }
        );

        res.status(201).json(listing);
    } catch (error) {
        console.error("Create listing error:", error);
        res.status(500).json({ message: "Failed to create listing." });
    }
};


export const getAllListings = async (req, res) => {
    try {
        const { category, city, state, minRent, maxRent } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (city) {
            filter.city = { $regex: city, $options: "i" };
        }

        if (state) {
            filter.state = { $regex: state, $options: "i" };
        }

        if (minRent || maxRent) {
            filter.rent = {};
            if (minRent) filter.rent.$gte = Number(minRent);
            if (maxRent) filter.rent.$lte = Number(maxRent);
        }

        const allListings = await listings.find(filter).populate("host", "name email");

        res.status(200).json(allListings);
    } catch (error) {
        console.error("Get all listings error:", error);
        res.status(500).json({ message: "Failed to fetch listings" });
    }
};


export const updateListing = async (req, res) => {
    try {
        const listing = await listings.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        if (listing.host.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        listing.title = req.body.title || listing.title;
        listing.description = req.body.description || listing.description;
        listing.city = req.body.city || listing.city;
        listing.state = req.body.state || listing.state;
        listing.location = req.body.location || listing.location;
        listing.rent = req.body.rent || listing.rent;
        listing.category = req.body.category || listing.category;

        await listing.save();
        res.status(200).json(listing);
    } catch (error) {
        console.error("Update listing error:", error);
        res.status(500).json({ message: "Failed to update listing" });
    }
};


export const deleteListing = async (req, res) => {
    try {
        const listing = await listings.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        if (listing.host.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        await listing.deleteOne();

        // Optionally remove from host's listing array
        await users.findByIdAndUpdate(listing.host, {
            $pull: { listings: listing._id },
        });

        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.error("Delete listing error:", error);
        res.status(500).json({ message: "Failed to delete listing" });
    }
};


export const getListById = async (req, res) => {
    try {
        const listing = await listings.findById(req.params.id).populate("host", "name email");
        if (!listing) {
            return res.status(404).json({ message: "Listing not found." });
        }
        res.status(200).json(listing);
    } catch (error) {
        console.error("Get listing by ID error:", error);
        res.status(500).json({ message: "Failed to fetch listing." });
    }
};
