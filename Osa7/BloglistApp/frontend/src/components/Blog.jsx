import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../features/blogsSlice'
import { useState } from 'react'
import { updateComments } from '../features/blogsSlice'
import { Button, TextField, Box, Stack, Typography } from '@mui/material'

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
      <p>
        <a href={blog?.url} target="_blank" rel="noopener noreferrer">
          {blog?.url}
        </a>
      </p>
      <Box display="flex" alignItems="center">
        <Typography sx={{ mr: 2 }}>Likes: {blog?.likes}</Typography>
        <Button
          variant="contained"
          onClick={() => handleLike(blog)}
          sx={{
            backgroundColor: '#2d2f46ff',
            color: 'white',
            '&:hover': {
              backgroundColor: '#3b3d5aff',
              border: '1px solid #3b3d5aff',
            },
          }}
        >
          Like
        </Button>
      </Box>
      <p> Added by {blog?.author}</p>
      <div>
        <h2>Comments</h2>
        <Button
          sx={{
            backgroundColor: '#2d2f46ff',
            color: 'white',
            '&:hover': {
              backgroundColor: '#3b3d5aff',
              border: '1px solid #3b3d5aff',
            },
            mb: 2,
          }}
          onClick={() => setShowAddComment(!showAddComment)}
        >
          {!showAddComment ? 'Add a comment' : 'Cancel'}
        </Button>
        <br />
        <br />
        {showAddComment && (
          <Box component="form" onSubmit={handleAddComment} maxWidth="15vw">
            <Stack direction="column" spacing={2}>
              <TextField
                label="Comment"
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                sx={{
                  width: '8vw',
                  backgroundColor: '#2d2f46ff',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#3b3d5aff',
                    border: '1px solid #3b3d5aff',
                  },
                  mb: 2,
                }}
                variant="contained"
                type="submit"
              >
                Add
              </Button>
            </Stack>
          </Box>
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
