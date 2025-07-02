import express from "express";
import { getProfile, updateProfile } from "../controllers/userControllers.js";
import isAuth from "../middleware/isAuth.js";

const userRouter = express.Router();

userRouter.get("/profile", isAuth, getProfile);
userRouter.put("/update", isAuth, updateProfile);

export default userRouter;