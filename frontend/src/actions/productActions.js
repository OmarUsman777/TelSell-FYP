import axios from "axios";
import {PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST,PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_USER_FAIL, PRODUCT_USER_REQUEST, PRODUCT_USER_SUCCESS} from '../constants/constantProducts'

export const listProducts = (keyword = '') => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products?keyword=${keyword}`)

        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data,})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}


export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message})
    }
}


//delete single product action for admin

export const productDeleteAction = (id) => async(dispatch, getState)=>{

    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

           await axios.delete(`/api/products/${id}`, config)
        dispatch({type: PRODUCT_DELETE_SUCCESS})




    } catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})

    }

}


// CREATE NEW SAMPLE PRODUCT ... FOR PrroductList and Create NEW Product button

export const productCreateAction = () => async(dispatch, getState)=>{

    try {
        dispatch({type: PRODUCT_CREATE_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

           const {data} = await axios.post(`/api/products`, {}, config)
            
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})




    } catch (error) {
        dispatch({type: PRODUCT_CREATE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})

    }

}


//Update SAMPLE PRODUCT RIGHT AFTER ITS CREATION IN ProductCreate Screen
export const productUpdateAction = (product) => async(dispatch, getState)=>{

    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

           const {data} = await axios.put(`/api/products/${product._id}`,product, config)
            
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data})




    } catch (error) {
        dispatch({type: PRODUCT_UPDATE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})

    }

}


//GET PRODUCTS FOR SINGLE USER SHOP 


export const getProductsUserAction = () => async(dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_USER_REQUEST})
        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

        const {data} = await axios.get('/api/products/product', config)

        dispatch({type: PRODUCT_USER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_USER_FAIL, payload: error.message})
    }
}


// Get Top Rated Product for HomePage
export const productTopAction = () => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`/api/products/top`)

        dispatch({type: PRODUCT_TOP_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_TOP_FAIL, payload: error.message})
    }
}








//Give Review on Product POST action
export const productReviewAction = (productId, reviewData) => async(dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

         await axios.post(`/api/products/${productId}/reviews`, reviewData, config)

        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS})
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
        }
}

