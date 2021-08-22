import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL} from '../constants/constantOrder'
import axios from 'axios'

export const orderCreateAction = (order) => async(dispatch, getState)=>{

    try {
        dispatch({type: ORDER_CREATE_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

            const {data} = await axios.post('/api/orders', order, config)
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data})




    } catch (error) {
        dispatch({type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})

    }

}


///Get Order Details Action

export const getOrderAction = (id) => async(dispatch, getState)=>{

    try {
        dispatch({type: ORDER_DETAILS_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

            const {data} = await axios.get(`/api/orders/${id}`, config)
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})




    } catch (error) {
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})

    }

}