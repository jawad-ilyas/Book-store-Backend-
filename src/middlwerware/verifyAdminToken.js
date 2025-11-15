import jwt from "jsonwebtoken";
import { User } from "../users/users.model.js";

export const adminAuthMiddleware = async (req, res, next) => {
    try {
        // 1. Check Authorization Header
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // 2. Extract token from "Bearer TOKEN"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        // 3. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret"
        );

        // 4. Attach user to request object
        req.user = await User.findById(decoded._id).select("-password");

        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 5. Continue request
        next();
    } catch (error) {
        console.log("Auth middleware error:", error);

        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};
