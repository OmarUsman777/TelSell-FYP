import  express  from "express";
const Router = express.Router();
import {authUser,userProfile, userSignUp, userProfileUpdate, getAllUsers, deleteUser, getUserById, updateUser} from '../controllers/userConroller.js'
import { authMiddle, adminAuth } from '../middlewareError/authMiddle.js'


Router.route('/').post(userSignUp).get(authMiddle, adminAuth, getAllUsers)
Router.post('/login', authUser)
Router.route('/profile').get(authMiddle, userProfile).put(authMiddle, userProfileUpdate)   //This middleware will first check the authentication then redirects the user Profile
Router.route('/:id').delete( authMiddle, adminAuth, deleteUser).get(authMiddle, getUserById).put(authMiddle, updateUser)

export default Router