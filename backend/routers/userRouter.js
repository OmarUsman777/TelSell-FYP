import  express  from "express";
const Router = express.Router();
import {authUser,userProfile, userSignUp, userProfileUpdate} from '../controllers/userConroller.js'
import { authMiddle } from '../middlewareError/authMiddle.js'


Router.route('/').post(userSignUp)
Router.post('/login', authUser)
Router.route('/profile').get(authMiddle, userProfile).put(authMiddle, userProfileUpdate)   //This middleware will first check the authentication then redirects the user Profile
export default Router