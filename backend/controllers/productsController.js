import  express  from "express";
import Product from '../models/productModel.js'

const getProducts = async (req, res) => {
    try {
     
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(404).send(error)
    }
}

const getSingleProduct = async (req, res) => {
    try {   
        const product = await Product.findById(req.params.id)
        
        if(product){
            res.json(product)
        } else
        {
            res.status(404).json({message: 'No data found'})
        } 
    } catch (error) {
        res.status(404).json({message: 'No data found'})

        
    }
}
export {
    getProducts,
    getSingleProduct
}