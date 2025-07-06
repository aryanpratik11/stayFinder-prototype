import tokenGen from "../config/token.js";
import users from "../models/users.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        let userPrev = await users.findOne({ email });
        if (userPrev) {
            return res.status(400).json({ message: "An account already exists with the same email/userID." });
        }

        let hashPass = await bcrypt.hash(password, 5);

        let user = await users.create({ name: name, email: email, password: hashPass });

        let token = await tokenGen(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: ".onrender.com",
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days in milliseconds
        });
        return res.status(201).json({
            message: "Registration successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            }
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "signup error" });
    }
};

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        let passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        let token = await tokenGen(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "login error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged Out" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "logout error" });
    }
};
