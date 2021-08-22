import  express  from "express";
const Router = express.Router();
import {createOrder, getOrder} from '../controllers/orderController.js'
import {authMiddle} from '../middlewareError/authMiddle.js'


Router.route('/').post(authMiddle, createOrder)
Router.route('/:id').get(authMiddle,getOrder )


export default Router