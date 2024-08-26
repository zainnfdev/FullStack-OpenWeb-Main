import { createSlice } from '@reduxjs/toolkit'

const defaultMessageStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderColor: 'green',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const initialState = {
  message : null,
  style : defaultMessageStyle
}

const notificationSlice = createSlice({
  name : 'notification',
  initialState,
  reducers : {
    updateNotification (state,action) {
      return action.payload
    },
    clearNotification (state,action) {
      return action.payload
    }
  }
})

export const setNotification = (message,color) => {
  return async dispatch => {
    const newStyle = { ...defaultMessageStyle, color : color , borderColor : color }
    const newState = { message : message, style : newStyle }
    dispatch(updateNotification(newState))
    setTimeout(() => {
      dispatch(clearNotification(initialState))
    },5000)
  }
}

export const { updateNotification,clearNotification } = notificationSlice.actions
export default notificationSlice.reducer