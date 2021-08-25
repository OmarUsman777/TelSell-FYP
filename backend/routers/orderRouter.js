import  express  from "express";
const Router = express.Router();
import {createOrder, getOrder, updateOrder, getMyOrder} from '../controllers/orderController.js'
import {authMiddle} from '../middlewareError/authMiddle.js'


Router.route('/').post(authMiddle, createOrder)
Router.route('/myorders').get(authMiddle,getMyOrder )
Router.route('/:id').get(authMiddle,getOrder )
Router.route('/:id/pay').put(authMiddle,updateOrder )




export default Router