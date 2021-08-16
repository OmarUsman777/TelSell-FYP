import {USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_RESET} from '../constants/constantUsers'
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
//USER LOGOUT ACTION
export const logoutAction = ()=> async (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_PROFILE_RESET})
}


//SIGNUP YUSER ACTION
export const signupAction = (name,email, password, profileImage) =>async (dispatch) =>{
    try {
        
        dispatch({type: USER_SIGNUP_REQUEST})

        const config_file = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users',{name, email, password, profileImage}, config_file )
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

//GET PROFILE DATA ACTION 
export const UserProfileAction = (id) =>async (dispatch, getState) =>{
    try {
        
        dispatch({
            type: USER_PROFILE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config_file = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.auhtToken}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`, config_file )

        dispatch({
            type: USER_PROFILE_SUCCESS,
             payload: data})
 
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          })
    }


} 