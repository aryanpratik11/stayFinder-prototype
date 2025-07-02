import users from "../models/users.js";

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ message: "Failed to load profile" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    return res.status(500).json({ message: "Failed to update profile" });
  }
};