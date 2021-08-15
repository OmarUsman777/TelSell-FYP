import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productsReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer, userSignupReducer } from './reducers/usersReducer'



const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer

})
const ls_cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const ls_userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    cart: {cartItems: ls_cartItems},
    userLogin: {userInfo: ls_userInfo}
} 
const composedEnhancers = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...composedEnhancers)) )

export default store