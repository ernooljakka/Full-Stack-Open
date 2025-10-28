import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../features/blogsSlice'
import { useState } from 'react'
import { updateComments } from '../features/blogsSlice'

const Blog = () => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')
  const [showAddComment, setShowAddComment] = useState(false)

  const blogs = useSelector((state) => state.blogs)

  const { id } = useParams()

  const blog = blogs.find((b) => b.id === id)

  const handleLike = (blog) => {
    dispatch(updateBlog(blog))
  }

  const handleAddComment = (e) => {
    e.preventDefault()

    dispatch(updateComments(blog, comment))
    setComment('')
  }

  return (
    <div>
      <h1>{blog?.title}</h1>
      <br />
      <p>
        <a href={blog?.url} target="_blank" rel="noopener noreferrer">
          {blog?.url}
        </a>
      </p>
      <span className="likes">Likes: {blog?.likes}</span>
      <button onClick={() => handleLike(blog)}>Like</button>
      <p> Added by {blog?.author}</p>
      <div>
        <h2>Comments</h2>
        <button onClick={() => setShowAddComment(!showAddComment)}>
          {!showAddComment ? 'Add a comment' : 'Cancel'}
        </button>
        <br />
        <br />
        {showAddComment && (
          <form onSubmit={handleAddComment}>
            <label>
              comment
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <button type="submit"> Add </button>
          </form>
        )}
        {blog?.comments.length > 0 ? (
          <ul>
            {blog?.comments.map((comment, index) => (
              <li key={index}> {comment} </li>
            ))}
          </ul>
        ) : (
          'No comments yet, comment what you think!'
        )}
      </div>
    </div>
  )
}

export default Blog
