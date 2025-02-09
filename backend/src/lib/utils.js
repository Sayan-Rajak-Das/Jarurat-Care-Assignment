import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expiry time
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents XSS attacks
        sameSite: "strict", // Prevents CSRF
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    });

    return token;
};
