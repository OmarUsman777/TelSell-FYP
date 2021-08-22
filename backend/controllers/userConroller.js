import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'
import createToken from '../tokenutils/createToken.js'

//Authentication Post Request for user (public) /api/users/login
//User Login
const authUser = asyncHandler(async (req, res) =>{
 const { email, password} = req.body

const userdata = await User.findOne({email})

if(userdata && (await userdata.checkPassword(password))){

    res.json({
        _id: userdata._id,
        name: userdata.name,
        email: userdata.email,
        isAdmmin: userdata.isAdmmin,                               //CHANGE
        // profileImage: user.profileImage,
        auhtToken: createToken(userdata._id)
    })
}
    else {
        res.status(401)
        throw new Error('IVALID EMAIL OR PASSWORD')
    }


})

// get USER PROFILE Request after authentication for user (private) /api/user/profile 
//User Profile
const userProfile = asyncHandler(async (req, res) =>{

const user = await User.findById(req.user._id)           //TRY CATCH LAGANA HY
if(user){
res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage                                 //CHANGE
})
}
else{
    res.status(404)
    throw new Error('Invalid data from DB')
}

   })


// POST Request for user SIGNUP (PUBLIC) /api/userS
const userSignUp = asyncHandler(async (req, res) =>{

    const {name, email, password, profileImage} = req.body                        //Change

    const checkUser = await User.findOne({email});

 if(checkUser){

    res.status(400)
    throw new Error('This Email already Exists')
}
 
     const user = await User.create({
         name,
         email,
         password,
         profileImage
     })
 if (user) {
     res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage,                               //Change
        auhtToken: createToken(user._id),
      })
 }
 else{
    res.status(400)
    throw new Error('Invalid data from DB') }
    
       })

          // POST Request for user Profile  Update (private) /api/users/profile
const userProfileUpdate = asyncHandler(async (req, res) =>{

    const user = await User.findById(req.user._id)        
     if(user){
          user.name = req.body.name || user.name
          user.email = req.body.email || user.email
          
          if(req.body.password){
           user.password = req.body.password
          }
          const newProfile = await user.save()
        
          res.json({
            _id: newProfile._id,
            name: newProfile.name,
            email: newProfile.email,
            profileImage: newProfile.profileImage,                       //change
            isAdmin: newProfile.isAdmin,
    })

     }
     else{
        res.status(404)
        throw new Error('User Not Found from DB') }
        
           })
    

export { authUser, userProfile, userSignUp, userProfileUpdate }