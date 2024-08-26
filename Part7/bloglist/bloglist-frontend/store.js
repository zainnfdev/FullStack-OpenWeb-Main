import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './src/reducers/notificationReducer'
import bloglistReducer from './src/reducers/bloglistReducer'
import userReducer from './src/reducers/userReducer'

const store = configureStore({
  reducer : {
    notification : notificationReducer,
    blogs : bloglistReducer,
    user : userReducer
  }
})

export default store