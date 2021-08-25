import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productsReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer, userSignupReducer, userProfileReducer } from './reducers/usersReducer'
import { createOrderReducer, getOrderReducer, orderPayReducer, getMyOrderReducer } from './reducers/orderReducer'




const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userProfile: userProfileReducer,
    orderCreate: createOrderReducer,
    orderDetails: getOrderReducer,
    orderPay: orderPayReducer,
    myOrderList: getMyOrderReducer


})
const ls_cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const ls_userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const ls_shippingAdd = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: {cartItems: ls_cartItems, shippingAddress: ls_shippingAdd},
    userLogin: {userInfo: ls_userInfo}
} 
const composedEnhancers = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...composedEnhancers)) )

export default store