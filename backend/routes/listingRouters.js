import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { createListing, deleteListing, getAllListings, updateListing } from "../controllers/listingControllers.js";

const listingRouter = express.Router();

listingRouter.get("/", getAllListings);
listingRouter.post("/create", isAuth, upload.array("images", 3), createListing);
listingRouter.put("/update/:id", isAuth, updateListing);
listingRouter.delete("/delete/:id", isAuth, deleteListing);


export default listingRouter;