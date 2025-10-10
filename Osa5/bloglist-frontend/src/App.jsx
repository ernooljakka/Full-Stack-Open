import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({message: null, type: null})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  

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
      const user = await blogService.login({username, password})
      blogService.setToken(user.token)
      setUser(user)

      window.localStorage.setItem(
        'LoggedBlogAppUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    } catch {
      setMessage({message: `Wrong username or password`, type: 'error'})
      setTimeout(() => (
        setMessage({message: null, type: null})
      ), 5000)
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
      const newBlog = await blogService.create({title, author, url})
      setBlogs(blogs.concat(newBlog))

      setMessage({message: `A new blog ${title} was added by ${author}`, type: 'success'})

      setTimeout(() => {
        setMessage({message: null, type: null})
        setTitle('')
        setAuthor('')
        setUrl('')
      }, 5000)
    } catch {
      console.log("error");
      
    }

  }

  return (
    <>
    <Notification message={message.message} type={message.type}/>
    {user ? (
      <div>
      
        <h2>Blogs</h2>
        <span> {user.username} Logged in</span>
        <button onClick={handleLogout}> Logout </button>
        <br/><br/><br/>

        <h2>Create new Blog</h2>
        <form onSubmit={HandleAddBlog}>
          <label>
            Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </label><br/>
          <label>
            Author
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
          </label><br/>
          <label>
            Url
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
          </label><br/>
          <button type='submit'> Create </button>
        </form><br/>

        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}

      </div>
    ) : (
      <div>
        <h2>Log in to application </h2>
        <form onSubmit={handleLogin}>
          <label>
            Username
            <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          </label><br/>
          <label>
            Password
            <input
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label><br/>
          <button type='submit'> Login </button>
        </form>
      </div>
    )
    }
    </>
  )
}

export default App

  const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${type}`}>
      {message}
    </div>
  )
}