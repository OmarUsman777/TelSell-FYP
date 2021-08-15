import {USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL} from '../constants/constantUsers'
import axios from 'axios'

export const loginAction = (email, password) =>async (dispatch) =>{
    try {
        
        dispatch({type: USER_LOGIN_REQUEST})

        const config_file = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login',{email, password}, config_file )
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
    localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          })
    }


} 

export const logoutAction = ()=> async (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const signupAction = (name,email, password) =>async (dispatch) =>{
    try {
        
        dispatch({type: USER_SIGNUP_REQUEST})

        const config_file = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users',{name, email, password}, config_file )
        dispatch({type: USER_SIGNUP_SUCCESS, payload: data})
    localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          })
    }


} 