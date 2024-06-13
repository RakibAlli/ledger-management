
require('dotenv').config();
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                meta: { status: false, message: "All fields are required" }
            });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                meta: { status: false, message: "User already exists" }
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        let photo = "/uploads/" + req.file.filename;
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            photo: photo
        });
        let result = await newUser.save();
        // Create a JWT token
        const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            meta: { status: true, message: "User created successfully" },
            data: result, token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            meta: { status: false, message: "Internal server error" }
        })
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Respond with the token
        res.status(200).json({
            meta: { status: true, message: "User created successfully" },
            data: user, token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error });
    }
};

module.exports = { createUser, loginUser }