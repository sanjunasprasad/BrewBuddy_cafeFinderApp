import bcrypt from "bcrypt";
import User from "../../entities/userModel.js";
import Shop from "../../entities/shopModel.js";
import { generateUserToken } from "../../middlewares/auth.js";

export const userRegister = async (req, res) => {
  const { username, mobile, email, password } = req.body;

  // Simple validation
  if (!username || !mobile || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user instance
    user = new User({
      userName: username, // Ensure the field names match your schema
      phoneNo: mobile,
      email,
      password,
    });

    // Generate salt & hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    const token = await generateUserToken(user);
    return res.status(200).json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};





export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generateUserToken(user);
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





export const getProducts = async (req, res) => {
  try {
    const shops = await Shop.find().lean();

    // Transform the data to extract necessary fields
    const products = shops.flatMap((shop) => {
      const shopInfo = {
        shopName: shop.name,
        address: shop.address,
        aboutUs: shop.aboutus,
      };

      return shop.products.map((product) => ({
        _id: product._id, 
        productName: product.productname,
        description: product.description,
        productImages: product.productimages,
        price: product.price,
        rating: product.rating,
        category: product.category,
        ...shopInfo,
      }));
    });
    // console.log("6666",products)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






export const getBestsellers = async (req, res) => {
  try {
    const shops = await Shop.find({}).lean(); // Fetch all shops with products in lean mode

    // Filter products with rating 5 and transform the data
    const productsRating5 = shops.flatMap((shop) => {
      return shop.products
        .filter((product) => product.rating === 5) // Filter products with rating 5
        .map((product) => ({
          productName: product.productname,
          productImages: product.productimages,
          rate: product.rating,
          category: product.category,
          price: product.price,
          description: product.description,
          shopName: shop.name,
          address: shop.address,
          aboutUs: shop.aboutus,
        }));
    });
    // console.log(productsRating5)
    res.status(200).json(productsRating5);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const getShop = async (req, res) => {
  const shopName = req.params.shopname;

  try {
    const shop = await Shop.findOne({ name: shopName });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Prepare response data including address
    const shopDetails = {
      name: shop.name,
      address: shop.address,
      shopImages: shop.shopImages,
      aboutus: shop.aboutus,
    };
    // console.log(700,shopDetails)
    res.status(200).json(shopDetails);
  } catch (error) {
    console.error("Error fetching shop details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getsfromshop = async(req,res)=>{

try {
  const shopname = req.params.shopname;
  const shops = await Shop.find({ name: shopname }).lean();
  const products = shops.flatMap((shop) => {
    const shopInfo = {
      shopName: shop.name,
      address: shop.address,
      aboutUs: shop.aboutus,
    };

    return shop.products.map((product) => ({
      productName: product.productname,
      description: product.description,
      productImages: product.productimages,
      price: product.price,
      rating: product.rating,
      category: product.category,
      ...shopInfo,
    }));
  });
  // console.log("6666",products)
  res.status(200).json(products);
} catch (error) {
  res.status(500).json({ message: error.message });
}

}



export const sortedProducts = async(req,res) =>{
  const { sortBy } = req.query;

  try {
    let shops;
     if (sortBy === 'priceLow') {
      shops = await Shop.find().sort({ 'products.rating': 1 }).populate('products');
    } else if (sortBy === 'ratingsHigh') {
      shops = await Shop.find().sort({ 'products.rating': -1 }).populate('products');
    } else {
      shops = await Shop.find().populate('products');
    }

    // Transform the data to extract necessary fields
    const products = shops.flatMap((shop) => {
      return shop.products.map((product) => ({
        productName: product.productname,
        description: product.description,
        productImages: product.productimages,
        price: product.price,
        rating: product.rating,
        category: product.category,
        shopName: shop.name,
        address: shop.address,
        aboutUs: shop.aboutus,
      }));
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



