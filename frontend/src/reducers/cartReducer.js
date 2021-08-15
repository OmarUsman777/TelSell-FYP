import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
  } from '../constants/constantCart'
  
  export const cartReducer = ( state = { cartItems: [] }, action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.payload
  
        const existItem = state.cartItems.find((i) => i.product === item.product)
        
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === existItem.product ? item : i
            ),
          }
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          }
        }
        case CART_REMOVE_ITEM:
            const r = action.payload
            return {
                ...state,
                cartItems : state.cartItems.filter(i => i.product !== r.product)
            }
        default: 
        return state
  }}

