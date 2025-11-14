import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },

        addressInfo: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            zip: { type: String, required: true },
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: ["COD", "Stripe", "Paypal", "Bank"], // customize as needed
        },

        phone: {
            type: String,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        productIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book", // or "Books" if your model name is Books
                required: true,
            },
        ],

        status: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Processing", "Completed", "Cancelled"],
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
