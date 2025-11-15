import { Router } from "express";
import { User } from "./users.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const router = Router();



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        });
    } catch (error) {
        console.log("Error in login route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // 1. Validate fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }



        // 4. Create user
        const newUser = await User.create({
            name,
            email,
            password,

            role,
        });

        // 5. Generate token
        const token = jwt.sign(
            { _id: newUser._id },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "7d" }
        );

        // 6. Return response
        return res.status(201).json({
            message: "User created successfully",
            token,
            user: newUser
        });

    } catch (error) {
        console.log("Error in register route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;