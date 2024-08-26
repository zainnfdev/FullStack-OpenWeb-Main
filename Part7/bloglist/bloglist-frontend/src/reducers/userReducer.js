import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blog'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name : 'user',
  initialState : null,
  reducers : {
    setUserState(state,action){
      return action.payload
    },
    unsetUser(state,action){
      return null
    }
  }
})

export const { setUserState,unsetUser } = userSlice.actions
export default userSlice.reducer

export const setLoginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login(credentials)
      dispatch(setUserState(loggedInUser))
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem('loggedInUser',JSON.stringify(loggedInUser))
    } catch (error) {
      dispatch(setNotification('wrong username or passwrod','red'))
    }
  }
}

export const removeUser = () => {
  return async (dispatch) => {
    try{
      dispatch(unsetUser())
      blogService.setToken(null)
      window.localStorage.removeItem('loggedInUser')
    } catch (exception) {
      dispatch(setNotification('Oops! something went wrong','red'))
    }
  }
}

export const setLoggedUser = () => {
  return (dispatch) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedInUser')
      if(loggedUserJSON){
        const loggedInUser = JSON.parse(loggedUserJSON)
        dispatch(setUserState(loggedInUser))
        blogService.setToken(loggedInUser.token)
      }
    } catch (error) {
      dispatch(setNotification('wrong username or passwrod','red'))
    }
  }
}