import {USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL,
     USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_RESET,
      USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST} from '../constants/constantUsers'
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




//GET User List for ADMIN  ACTION 
export const allUsersAction = () =>async (dispatch, getState) =>{
    try {
        
        dispatch({
            type: USER_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config_file = {
            headers: {
                Authorization: `Bearer ${userInfo.auhtToken}`
            }
        }
        const {data} = await axios.get(`/api/users`, config_file )

        dispatch({
            type: USER_LIST_SUCCESS,
             payload: data})
 
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          })
    }


} 


//DELETE User  for ADMIN  ACTION 
export const userDeleteAction = (id) =>async (dispatch, getState) =>{
    try {
        
        dispatch({
            type: USER_DELETE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config_file = {
            headers: {
                Authorization: `Bearer ${userInfo.auhtToken}`
            }
        }
        const {data} = await axios.delete(`/api/users/${id}`, config_file )

        dispatch({
            type: USER_DELETE_SUCCESS,
           })
 
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          })
    }


} 




//UPDATE User  for ADMIN AND USERS ACTION 
export const userUpdateAction = (user) =>async (dispatch, getState) =>{
    try {
        
        dispatch({
            type: USER_UPDATE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config_file = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.auhtToken}`
            }
        }
        const {data} = await axios.put(`/api/users/${user._id}`, user, config_file )

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data 
           })
           dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data 
           })

           dispatch({ type: USER_PROFILE_RESET })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
          })
    }


} 