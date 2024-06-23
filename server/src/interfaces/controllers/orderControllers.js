import User from "../../entities/userModel.js";
import Order from "../../entities/orderModel.js";
import Shop from "../../entities/shopModel.js";
import Razorpay from "razorpay"
import crypto from "crypto"

export const addToCart = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const shop = await Shop.findOne({ "products._id": productId });
    if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
    }
    const product = shop.products.find((prod) => prod._id.equals(productId));
    if (!product) {
        return res.status(404).json({ error: 'Product not found in shop' });
    }
    // console.log("product", product);
    user.cart.push({
        product: {
            _id: product._id,
            productname: product.productname,
            description: product.description,
            productimages: product.productimages,
            quantity: product.quantity,
            price: product.price,
            rating: product.rating,
            category: product.category,
        },
        quantity: 1, 
    });

    await user.save();
    res.status(200).json( { message: 'Product added to cart successfully' ,product,user});

  } catch (err) {
    console.error("Error adding product to cart:", err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};



export const getCart = async (req,res) =>{
    const  userId  = req.params.userId
    // console.log("user",userId)
    try {
        const user = await User.findById(userId).populate('cart.product'); 
        // console.log("cartdata_______",user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Failed to fetch cart data' });
    }
}


export const updateCart = async(req,res) =>{
    try {
        const { userId } = req.params;
        const { cart } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.cart = cart;
        await user.save();
        res.json({ cart: user.cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
}



export const createOrder = async(req,res) =>{
  try {
    const razorpay = new Razorpay({
        key_id: "rzp_test_O9K7l3TCg65Dt6",
        key_secret: "FzCQRjpdYwJFo0qTHUadINAf",
    });

    const { userId, items, amount, currency, paymentMethod } = req.body;
    const options = {
        amount: amount * 100, 
        currency,
        receipt: "Brew Buddy",
    };
    const order = await razorpay.orders.create(options);

    if (!order) {
        return res.status(500).send("Error creating order in Razorpay");
    }

    // Save the order in MongoDB
    const newOrder = new Order({
        userId,
        items,
        paymentMethod,
        totalAmount: amount, 
    });
    //  console.log("new order in mongo",newOrder)
    await newOrder.save();
    res.json(order);
} catch (err) {
    console.log(err);
    res.status(500).send("Error");
}
}





export const validateOrder = async(req,res) =>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", "FzCQRjpdYwJFo0qTHUadINAf");
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
}




export const getMyOrders = async(req,res) =>{
    try {
        const userId  = req.params .userId;
        const orders = await Order.find({ userId }).sort({ created_at: -1 }); 
        // console.log("orders",orders)
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user orders', error: error.message });
      }
}