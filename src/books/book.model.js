import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    trending: { type: Boolean, default: false },

    coverImage: { type: String, required: true },

    oldPrice: { type: Number, default: null },
    newPrice: { type: Number, required: true },
    createdAt : { 
        type : Date , 
        default : Date.now
    }
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", BookSchema);
