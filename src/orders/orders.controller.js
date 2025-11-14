import { Order } from "../orders/orders.model.js";

const createOrder = async (req, res) => {
    try {
        const {
            name,
            email,
            addressInfo,
            paymentMethod,
            phone,
            totalPrice,
            productIds,
        } = req.body;

        // Validation
        if (
            !name ||
            !email ||
            !addressInfo ||
            !paymentMethod ||
            !phone ||
            !totalPrice ||
            !productIds?.length
        ) {
            return res.status(400).json({
                message: "All required fields must be provided",
                success: false,
            });
        }

        // Create order
        const newOrder = await Order.create({
            name,
            email,
            addressInfo,
            paymentMethod,
            phone,
            totalPrice,
            productIds,
        });

        return res.status(201).json({
            message: "Order placed successfully",
            success: true,
            order: newOrder,
        });
    } catch (error) {
        console.error("Order creation error:", error.message);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message,
        });
    }
};


export { createOrder }