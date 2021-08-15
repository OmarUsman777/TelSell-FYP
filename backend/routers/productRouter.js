import  express  from "express";
const Router = express.Router();
import {getProducts, getSingleProduct } from '../controllers/productsController.js'

Router.route('/').get(getProducts)
Router.route('/:id').get(getSingleProduct)

export default Router