import express from 'express';
import connectDB from './config/mongo.js';
import dotenv from "dotenv"
import cors from 'cors';
import userRoute from './interfaces/routes/userRoutes.js';
import adminRoute from './interfaces/routes/adminRoutes.js';
import orderRoute from "./interfaces/routes/orderRoute.js"



const app = express();
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
connectDB();












//routes
app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use("/order",orderRoute)




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));