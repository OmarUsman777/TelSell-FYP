
import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/constantCart'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

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
