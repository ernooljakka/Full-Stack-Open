import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { setNotification } from './features/notificationSlice'
import { initializeBlogs, addNewBlog } from './features/blogsSlice'
import { initializeUser, loginUser, logoutUser } from './features/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault()

    dispatch(loginUser({ username, password }))

    setUsername('')
    setPassword('')
  }

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
  }

  const HandleAddBlog = async (e) => {
    e.preventDefault()

    blogService.setToken(user.token)
    dispatch(addNewBlog({ title, author, url }))

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword)
  }

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername)
  }

  const handleAuthorChange = (newAuthor) => {
    setAuthor(newAuthor)
  }

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle)
  }

  const handleUrlChange = (newUrl) => {
    setUrl(newUrl)
  }

  return (
    <>
      <Notification />
      {user ? (
        <div>
          <h2>Blogs</h2>
          <span>{user.username} Logged in</span>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
          <br />
          <>
            {createBlogVisible ? (
              <div>
                <BlogForm
                  author={author}
                  title={title}
                  url={url}
                  handleAuthorChange={handleAuthorChange}
                  handleTitleChange={handleTitleChange}
                  handleUrlChange={handleUrlChange}
                  HandleAddBlog={HandleAddBlog}
                />
                <button
                  onClick={() => setCreateBlogVisible(!createBlogVisible)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setCreateBlogVisible(!createBlogVisible)}>
                Create new blog
              </button>
            )}
          </>
          <br />
          <Blog />
        </div>
      ) : (
        <>
          {loginVisible ? (
            <div>
              <LoginForm
                username={username}
                password={password}
                handleLogin={handleLogin}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
              />
              <button onClick={() => setLoginVisible(!loginVisible)}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setLoginVisible(!loginVisible)}>
              Login
            </button>
          )}
        </>
      )}
    </>
  )
}

export default App
