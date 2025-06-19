import cloudinaryUpload from "../config/cloudinary";

export const createListing = async (req, res) => {
    try {
        const uploadedImages = [];

        for (const file of req.files) {
            const url = await cloudinaryUpload(file.path);
            uploadedImages.push(url);
        }

        let host= req.userId;
        let {title, description, location, rent}= req.body;
        
    } catch (error) {

    }
}