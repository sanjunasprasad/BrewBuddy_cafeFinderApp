import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productimages: {
    type: [String],
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  
});


export { productSchema };

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shopImages: {
    type: [String],
  },
  aboutus: {
    type: String,
 
  },
  products: {
    type: [productSchema], 
    required: true,
  },
  
});

export default mongoose.model("Shop", shopSchema);


