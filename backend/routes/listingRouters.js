import express from "express";
import upload from "multer.js";

const listingRouter = express.Router();

listingRouter.post("/add", isAuth, upload.fields);

export default listingRouter;