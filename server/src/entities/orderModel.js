import mongoose from "mongoose";
import { productSchema } from "../entities/shopModel.js"

const orderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    items: [
      {
        product: {
           type: productSchema, 
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      }
    ],
    paymentMethod: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
      },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });
  

  export default mongoose.model("Order", orderSchema);