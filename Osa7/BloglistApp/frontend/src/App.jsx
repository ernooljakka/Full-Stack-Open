import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({ message: null, type: null })
  const [loginVisible, setLoginVisible] = useState(false)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })

    const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await blogService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)

      window.localStorage.setItem('LoggedBlogAppUser', JSON.stringify(user))

      setUsername('')
      setPassword('')
    } catch {
      setMessage({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => setMessage({ message: null, type: null }), 5000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()

    window.localStorage.removeItem('LoggedBlogAppUser')
    setUser(null)
  }

  const HandleAddBlog = async (e) => {
    e.preventDefault()

    try {
      blogService.setToken(user.token)
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))

      setMessage({
        message: `A new blog ${title} was added by ${user.name}`,
        type: 'success',
      })

      setTimeout(() => {
        setMessage({ message: null, type: null })
        setTitle('')
        setAuthor('')
        setUrl('')
      }, 5000)
    } catch {
      console.log('error')
    }
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

  const handleLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id)
    console.log(blogToLike)
    const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }

    const returnedBlog = await blogService.update(updatedBlog, id)

    returnedBlog.user = blogToLike.user

    setBlogs(
      blogs
        .map((b) => (b.id !== id ? b : returnedBlog))
        .sort((a, b) => b.likes - a.likes)
    )
  }

  const handleDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== id))

      setMessage({
        message: 'The blog was succesfully removed',
        type: 'success',
      })

      setTimeout(() => {
        setMessage({ message: null, type: null })
      }, 5000)
    } catch (e) {
      console.log('error:', e)
      setMessage({
        message: 'Something went wrong, did not remove the blog',
        type: 'error',
      })

      setTimeout(() => {
        setMessage({ message: null, type: null })
      }, 5000)
    }
  }

  return (
    <>
      <Notification message={message.message} type={message.type} />
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
                  {' '}
                  Cancel{' '}
                </button>
              </div>
            ) : (
              <button onClick={() => setCreateBlogVisible(!createBlogVisible)}>
                {' '}
                Create new blog{' '}
              </button>
            )}
          </>
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              currentUser={user}
            />
          ))}
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
                {' '}
                Cancel{' '}
              </button>
            </div>
          ) : (
            <button onClick={() => setLoginVisible(!loginVisible)}>
              {' '}
              Login{' '}
            </button>
          )}
        </>
      )}
    </>
  )
}

export default App

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return <div className={`${type}`}>{message}</div>
}
