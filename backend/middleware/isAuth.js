import jwt from "jsonwebtoken";
import users from "../models/users.js";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await users.findById(decoded.id).select("-password");

        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default isAuth;
