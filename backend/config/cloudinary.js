import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const cloudinaryUpload = async (filepath) => {

    // Configuration
    cloudinary.config({
        cloud_name: process.env.Cloudinary_Cloud_Name,
        api_key: process.env.Cloudinary_API_Key,
        api_secret: process.env.Cloudinary_API_Secret // Click 'View API Keys' above to copy your API secret
    });

    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(filepath, { resource_type: "image" });
        fs.unlinkSync(filepath);
        return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(filepath);
        console.error(error);
    }

};

export default cloudinaryUpload;