import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './features/notificationSlice'
import blogReducer from './features/blogsSlice'
import userReducer from './features/usersSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
