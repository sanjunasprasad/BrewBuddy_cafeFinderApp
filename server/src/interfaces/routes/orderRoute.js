import {Router} from 'express'
const orderRoute = Router();
import { decodeToken } from '../../middlewares/auth.js';
import { addToCart ,getCart,updateCart,createOrder,validateOrder ,getMyOrders} from '../controllers/orderControllers.js';



orderRoute.post("/addToCart",decodeToken ,addToCart)
orderRoute.get("/fetchCart/:userId",decodeToken ,getCart)
orderRoute.post('/updateCart/:userId',decodeToken, updateCart);
orderRoute.post('/createOrder',decodeToken,createOrder)
orderRoute.post('/validate',decodeToken,validateOrder)
orderRoute.get('/getMyOrders/:userId',decodeToken,getMyOrders)



export default orderRoute;