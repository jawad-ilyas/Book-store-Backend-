import { Order } from "../orders/orders.model.js";

const createOrder = async (req, res) => {

    console.log("create order is called")
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
const getOrdersForUser = async (req, res) => {
  try {
    const { email } = req.params;

    // Fetch all orders for this email
    const orders = await Order.find({ email });

    return res.status(200).json({
      message: "Orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error in getOrdersForUser:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching orders",
      error: error.message,
    });
  }
};


export { createOrder, getOrdersForUser }