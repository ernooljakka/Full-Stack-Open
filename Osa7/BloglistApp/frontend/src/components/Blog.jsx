import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../features/notificationSlice'
import { updateBlog, deleteBlog } from '../features/blogsSlice'

const Blog = () => {
  const [showAllInfo, setShowAllInfo] = useState({})

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeBtnStyle = {
    color: 'white',
    backgroundColor: 'red',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  }

  const confirmDeleting = (id, blog) => {
    const confirmDelete = window.confirm(
      `Remove Blog ${blog.title} by ${blog.author}?`
    )
    if (confirmDelete) {
      handleDelete(id)
    }
  }

  const handleLike = (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
  }

  return (
    <div className="blog-list-container">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-list" style={blogStyle}>
          <p className="blog-title">{blog.title}</p>
          <span>
            <button
              onClick={() =>
                setShowAllInfo((prev) => ({
                  ...prev,
                  [blog.id]: !prev[blog.id],
                }))
              }
            >
              {showAllInfo[blog.id] ? 'Hide' : 'View'}
            </button>
          </span>

          {showAllInfo[blog.id] && (
            <>
              <p>Url: {blog.url}</p>
              <span className="likes">Likes: {blog.likes}</span>
              <button onClick={() => handleLike(blog)}>Like</button>
              <p>Author: {blog.author}</p>

              {(user.id === blog.user || user.id === blog.user.id) && (
                <button
                  style={removeBtnStyle}
                  onClick={() => confirmDeleting(blog.id, blog)}
                >
                  Remove
                </button>
              )}
            </>
          )}
          <br />
        </div>
      ))}
    </div>
  )
}

export default Blog
