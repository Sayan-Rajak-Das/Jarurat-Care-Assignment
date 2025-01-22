import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate token only if password is correct
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in auth controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Expire JWT cookie immediately
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in auth controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    // Make sure `req.user` is populated by middleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json(req.user); // Return user data if authenticated
  } catch (error) {
    console.log("Error in auth controller in checkAuth:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
