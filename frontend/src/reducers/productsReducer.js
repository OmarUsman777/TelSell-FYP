import {PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_USER_FAIL,
    PRODUCT_USER_REQUEST,
    PRODUCT_USER_SUCCESS} from '../constants/constantProducts'
    
    export const productListReducer = (state = { products: []}, action)=> {
        
        switch (action.type) {
            case PRODUCT_LIST_REQUEST:
               return { loading: true, products: [] }
            case PRODUCT_LIST_SUCCESS:
               return { loading: false, products: action.payload }
            case PRODUCT_LIST_FAIL:
               return { loading: false, products: action.payload }
            
            default:
               return state;
        }
    }
    export const productDetailsReducer = (state = { product: { reviews: [] }}, action)=> {
        
        switch (action.type) {
            case PRODUCT_DETAILS_REQUEST:
               return { loading: true, ...state }
            case PRODUCT_DETAILS_SUCCESS:
               return { loading: false, product: action.payload }
            case PRODUCT_DETAILS_FAIL:
               return { loading: false, product: action.payload }
            
            default:
            return state;
        }
    }

    //DELETE SINGLE PRODUCT REDUCER

    export const productDeleteReducer = (state = {}, action)=> {
        
      switch (action.type) {
          case PRODUCT_DELETE_REQUEST:
             return { loading: true}
          case PRODUCT_DELETE_SUCCESS:
             return { loading: false, success: true }
          case PRODUCT_DELETE_FAIL:
             return { loading: false, product: action.payload }
          
          default:
          return state;
      }
  }



    //Create Product SINGLE PRODUCT REDUCER

    export const productCreateReducer = (state = {}, action)=> {
        
      switch (action.type) {
          case PRODUCT_CREATE_REQUEST:
             return { loading: true}
          case PRODUCT_CREATE_SUCCESS:
             return { loading: false, success: true, product: action.payload}
          case PRODUCT_CREATE_FAIL:
             return { loading: false, error: action.payload}
          case PRODUCT_CREATE_RESET:
               return {}
          default:
          return state;
      }
  }



    //Update SINGLE PRODUCT REDUCER

    export const productUpdateReducer = (state = {product: {}}, action)=> {
        
      switch (action.type) {
          case PRODUCT_UPDATE_REQUEST:
             return { loading: true}
          case PRODUCT_UPDATE_SUCCESS:
             return { loading: false, success: true, product: action.payload}
          case PRODUCT_UPDATE_FAIL:
             return { loading: false, error: action.payload}
          case PRODUCT_UPDATE_RESET:
               return {product: {}}
          default:
          return state;
      }
  }

//GET PRODUCTS FOR SINGLE USER SHOP My SHOP
  export const productUserReducer = (state = { productsUser: []}, action)=> {
        
   switch (action.type) {
       case PRODUCT_USER_REQUEST:
          return { loading: true, productsUser: [] }
       case PRODUCT_USER_SUCCESS:
          return { loading: false, productsUser: action.payload }
       case PRODUCT_USER_FAIL:
          return { loading: false, error: action.payload }
       
      default:
          return state;
   }
}

//Get Top Products 
export const productTopReducer = (state = {products: []}, action)=> {
        
   switch (action.type) {
       case PRODUCT_TOP_REQUEST:
          return { loading: true, products:[] }
       case PRODUCT_TOP_SUCCESS:
          return { loading: false, products: action.payload }
       case PRODUCT_TOP_FAIL:
          return { loading: false, error: action.payload }
       
      default:
          return state;
   }
}



//Set Product Reviews 
  export const productReviewReducer = (state = {}, action)=> {
        
   switch (action.type) {
       case PRODUCT_CREATE_REVIEW_REQUEST:
          return { loading: true }
       case PRODUCT_CREATE_REVIEW_SUCCESS:
          return { loading: false, success: true }
       case PRODUCT_CREATE_REVIEW_FAIL:
          return { loading: false, error: action.payload }
      case PRODUCT_CREATE_REVIEW_RESET:
            return {}
         
       
      default:
          return state;
   }
}