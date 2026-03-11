import { configureStore } from '@reduxjs/toolkit'

// Import reducers
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

// Configure Store
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer
  }
})

export default store