import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL} from '../constants/constantOrder'
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

//Pay Order Status

export const payOrderAction = (orderId, paymentResult) => async(dispatch, getState)=>{

    try {
        dispatch({type: ORDER_PAY_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

            const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({type: ORDER_PAY_SUCCESS, payload: data})




    } catch (error) {
        dispatch({type: ORDER_PAY_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})

    }

}



//Order List for single user action

export const myOrderListAction = () => async(dispatch, getState)=>{

    try {
        dispatch({type: ORDER_LIST_MY_REQUEST})

        const {
            userLogin : {userInfo}, }
            = getState()
        
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.auhtToken}`
                }
            }

            const {data} = await axios.get(`/api/orders/myorders`, config)
        dispatch({type: ORDER_LIST_MY_SUCCESS, payload: data})




    } catch (error) {
        dispatch({type: ORDER_LIST_MY_FAIL, payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message})

    }

}