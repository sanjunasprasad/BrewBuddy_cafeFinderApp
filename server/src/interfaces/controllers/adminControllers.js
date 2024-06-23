import { generateAdminToken } from "../../middlewares/auth.js";
import Shop from "../../entities/shopModel.js";


const adminCredential = {
  email: "admin@gmail.com",
  password: "admin",
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === adminCredential.email &&
    password === adminCredential.password
  ) {
    try {
      const adminToken = await generateAdminToken(email);
      res.status(200).json({ message: "Admin login successful", adminToken });
    } catch (error) {
      res.status(500).json({
        message: "Failed to generate admin token",
        error: error.message,
      });
    }
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};



export const AddShop = async (req, res) => {
  try {
    const {
      name,
      address,
      shopImages,
      aboutus,
      products, 
      
    } = req.body;

    const newShop = new Shop({
      name,
      address,
      shopImages,
      aboutus,
      products,
      
    });

    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({ error: "Failed to add shop" });
  }
};
