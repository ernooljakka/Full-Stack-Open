import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initializeBlogs, addNewBlog } from './features/blogsSlice'
import { initializeUser, loginUser } from './features/userSlice'
import { initializeUsers } from './features/usersSlice'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import { Typography } from '@mui/material'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (credentials) => {
    dispatch(loginUser(credentials))
  }

  const handleAddBlog = async (newBlog) => {
    blogService.setToken(user.token)
    dispatch(addNewBlog(newBlog))
  }

  return (
    <>
      <Notification />
      <div></div>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div>
                <Navigation />
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Blogs
                </Typography>
                <BlogForm onAddBlog={handleAddBlog} />
                <Blogs />
              </div>
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="users"
          element={
            <>
              <Navigation />
              <Users />
            </>
          }
        />
        <Route
          path="users/:id"
          element={
            <>
              <Navigation />
              <User />
            </>
          }
        />
        <Route
          path="blogs/:id"
          element={
            <>
              <Navigation />
              <Blog />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default App
