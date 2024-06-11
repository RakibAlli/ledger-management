require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token, "hello_rakib");
        // Check token expiry
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: "Token expired." });
        }

        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired." });
        }
        return res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
