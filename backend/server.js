import express from 'express';
import morgan from 'morgan';
import path from 'path'
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'
import uploadRouer from './routers/uploadRouter.js'
import Stripe from 'stripe';
const app = express();
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);


import {notFound, errorHandler } from './middlewareError/customError.js'

connectDB();
app.use(morgan('dev'))
app.use(express.json())
 
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouer);



app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "TelSell",
			payment_method: id,
			confirm: true
		})
		res.json({
			PaymentResponse: payment,
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));
app.use(notFound)
app.use(errorHandler)
 
const port = process.env.PORT || 5000; 
















app.listen(port, () => console.log(`Server running on port ${port} 🔥`));