import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { setNotification } from './notificationSlice'
import blogService from '../services/blogs'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await userService.login(credentials)
    userService.setToken(user.token)

    dispatch(setUser(user))
    window.localStorage.setItem('LoggedBlogAppUser', JSON.stringify(user))
  } catch (err) {
    dispatch(setNotification('Invalid username or password', 'error', 3000))
  }
}

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem('LoggedBlogAppUser')
  dispatch(clearUser())
}

export const initializeUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
    userService.setToken(user.token)
    blogService.setToken(user.token)
  }
}
