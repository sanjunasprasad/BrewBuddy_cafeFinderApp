import {Router} from 'express';
const adminRoute = Router();
import { decodeAdminToken } from '../../middlewares/auth.js';
import { adminLogin,AddShop } from '../controllers/adminControllers.js';


adminRoute.post('/adminLogin', adminLogin);
adminRoute.post("/addShop",decodeAdminToken,AddShop)

export default adminRoute;