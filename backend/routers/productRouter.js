import  express  from "express";
const Router = express.Router();
import {getProducts, getSingleProduct, deleteProduct , createProduct, updateProduct, getUserProducts, createProductReview, topProducts} from '../controllers/productsController.js'
import { authMiddle, adminAuth } from '../middlewareError/authMiddle.js'


Router.route('/').get(getProducts).post(authMiddle, createProduct)
Router.route('/top').get(topProducts)
Router.route('/product').get(authMiddle, getUserProducts)
Router.route('/:id/reviews').post(authMiddle, createProductReview)
Router.route('/:id').get(getSingleProduct).delete(authMiddle, adminAuth, deleteProduct ).put(authMiddle, updateProduct)

export default Router