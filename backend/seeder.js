import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/usersModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/database.js'


dotenv.config();
connectDB();

const importData = async ()=> {

    try {
       await Product.deleteMany()
       await User.deleteMany()
       await Order.deleteMany()

       const createdUsers = await User.insertMany(users)
       const adminUser = createdUsers[0]._id

       const sampleProducts = products.map((products) => {
           return {...products , user: adminUser} 
       })

       await Product.insertMany(sampleProducts)
       console.log("Data has been Inserted")
       process.exit()
    } catch (error) {
        cosnole.log(error)
        process.exit(1)
    }
}
const destroyData = async ()=> {

    try {
       await Product.deleteMany()
       await User.deleteMany()
       await Order.deleteMany()



       console.log("Data has been Destroyed")
       process.exit()
    } catch (error) {
        cosnole.log(error)
        process.exit(1)
    }
}
if(process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}