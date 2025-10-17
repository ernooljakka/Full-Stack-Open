import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationSlice'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {
      const id = action.payload
      const blog = state.find((b) => b.id === id)
      if (blog) {
        blog.likes += 1
      }
      sortBlogs(state)
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export default blogSlice.reducer
export const { setBlogs, likeBlog, addBlog, removeBlog } = blogSlice.actions

//should add try/catch here to check errors from backend
export const initializeBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    const sortedBlogs = sortBlogs(blogs)
    dispatch(setBlogs(sortedBlogs))
  } catch (err) {
    dispatch(setNotification('Could not fetch blogs', 'error', 5000))
  }
}

export const updateBlog = (blog) => async (dispatch) => {
  try {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(updatedBlog, blog.id)
    dispatch(likeBlog(blog.id))
    dispatch(setNotification(`You liked ${blog.title}`, 'success', 2000))
  } catch (err) {
    dispatch(setNotification('Something went wrong', 'error', 5000))
  }
}

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
    dispatch(
      setNotification('The blog was removed successfully', 'success', 5000)
    )
  } catch (err) {
    dispatch(
      setNotification(
        'Something went wrong, did not remove the blog',
        'error',
        5000
      )
    )
  }
}

export const addNewBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
    dispatch(setNotification(`New blog ${blog.title} added`, 'success', 5000))
  } catch (err) {
    dispatch(setNotification('Blog not added', 'error', 5000))
  }
}

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}
