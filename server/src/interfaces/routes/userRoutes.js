import {Router} from 'express'
const userRoute = Router();
import {userRegister,userLogin  ,getProducts,getBestsellers,getShop ,getsfromshop ,sortedProducts} from '../controllers/userControllers.js';



userRoute.post('/userRegister',userRegister);
userRoute.post("/userLogin",userLogin)
userRoute.get("/getProducts",getProducts)
userRoute.get("/getbestSeller",getBestsellers)
userRoute.get("/shopdetail/:shopname",getShop)
userRoute.get("/getfromShop/:shopname",getsfromshop )
userRoute.get("/sort",sortedProducts)



export default userRoute;