import  express  from "express";
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


//Get All the data for Home Screen
const getProducts = asyncHandler( async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    },

  } : {}
   
        const products = await Product.find({...keyword })
        res.json(products)
  
})

//Get Single Product Details for cart
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


//Delete Single Product For ADMIN
// /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
      
        const product = await Product.findById(req.params.id)
        
        if(product){
            await product.remove()
            res.json({message: 'The Product Has Been Removed'})

        } else
        {
            res.status(404)
            throw new Error("No Such Product Found")
        } 
    
}
)

//   Create a product For ADMIN AND USERS
//    POST /api/products

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)

    // const {name, price, image, brand, category, countInStock, numReviews, description} = req.body

    // const product = new Product({
    //   name,
    //   price,
    //   user: req.user._id,
    //   image,
    //   brand,
    //   category,
    //   countInStock,
    //   numReviews,
    //   description,
    // })
  
    // const createdProduct = await product.save()
    // res.status(201).json(createdProduct)
  })
  

  // @desc    Update a product
  // @route   PUT /api/products/:id
  // @access  Private/Admin
  const updateProduct = asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
  

//Get Products for a Single User:
// /api/products/product
const getUserProducts = asyncHandler(async (req, res) => {

      const products = await Product.find({user: req.user._id})
      if(products){
        res.status(200).json(products)
      }
else{
  res.status(404)
      throw new Error('You Have No Products Yet')
} 
})

//  Create new review for a Product User Can Review Once
//   POST /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})




export {
    getProducts,
    getSingleProduct,
    deleteProduct,
    createProduct,
    updateProduct,
    getUserProducts,
    createProductReview
}