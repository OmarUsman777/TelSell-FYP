import  express  from "express";
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'



const createOrder = asyncHandler(async (req, res) => {

    

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body
    console.log(
         )
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
  
      const createdOrder = await order.save()
  
      res.status(201).json(createdOrder)
    }
  })

const getOrder = asyncHandler (async (req, res)=>{

const order = await Order.findById(req.params.id).populate('user', 'name email')

if(order){
    res.status(200).json(order)
}
else{
    res.status(400)
    throw new Error("Order Not Found")
}

})

export {
    createOrder, getOrder 
}