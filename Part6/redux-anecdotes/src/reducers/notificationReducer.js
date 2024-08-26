import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content : 'default',
    visibility : false,
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

export const { updateNotification,clearNotification } = notificationSlice.actions

export const initializeNotification = () => {
    return async dispatch => {
        dispatch(setNotification(initialState))
    }
}

export const setNotification = (content,time) => {
    return async dispatch => {
        const message = {
            content,
            visibility : true
        }
        dispatch(updateNotification(message))
        setTimeout(()=>{
            dispatch(clearNotification(initialState))
        },time * 1000)
    }
}

export default notificationSlice.reducer