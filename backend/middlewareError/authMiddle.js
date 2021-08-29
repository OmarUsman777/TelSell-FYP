import  Jwt  from "jsonwebtoken";
import User from "../models/usersModel.js";

const authMiddle = async(req, res, next)=>{

    let token;

    if(req.headers.authorization){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded_token = Jwt.verify(token, process.env.JWT_TOKEN_KEY);
            req.user = await User.findById(decoded_token.id).select('-password')


        } catch (error) {
            console.log(error)
        }
    
    } 
    else {
        res.send("No Token Found IN Header")
    }


    next();

}
const adminAuth = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    }
    else{
        res.status(401)
        throw new Error("Not AUTHORISED As ADMIN ")
    }
}

export {authMiddle, adminAuth}