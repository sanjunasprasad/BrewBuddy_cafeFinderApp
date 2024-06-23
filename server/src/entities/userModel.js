import mongoose from "mongoose";
import { productSchema} from  "../entities/shopModel.js"

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },

  cart: [
    {
      product: {
        type: productSchema, 
        // required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },

    },
  ],
});

export default mongoose.model("User", userSchema);
