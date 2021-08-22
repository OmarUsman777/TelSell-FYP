
import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING} from '../constants/constantCart'

export const addToCart = (id, qty) => async (dispatch, getState) => {

  const { data } = await axios.get(`/api/products/${id}`)                    //Getting product Info and store in local storage

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

 localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {  
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {product: id
      }
    })
  
   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const addShippingAddress = (shippingData) => (dispatch) => {  
    dispatch({
      type: CART_SAVE_SHIPPING,
      payload: shippingData
    })
  
   localStorage.setItem('shippingAddress', JSON.stringify(shippingData))
  }


  export const addPaymentMethod = (payment) => (dispatch) => {                      //Payment action
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: payment
    })
  
   localStorage.setItem('paymentMethod', JSON.stringify(payment))
  }

// import { CART_ADD_ITEM } from "../constants/constantCart";
// import axios from "axios";
// export const addToCart = (id, qty)=> async(dispatch, getState) => {

//     const {data} = await axios.get(`/api/products/${id}`)
//     dispatch({
//         type: CART_ADD_ITEM,
//         payload: {
//             product: data._id,
//             name: data.name,
//             image: data.image,
//             price: data.price,
//             countInStock: data.countInStock,
//             qty
//         }
//     })

// localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

// }
