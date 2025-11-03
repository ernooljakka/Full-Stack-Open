import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../features/blogsSlice'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Paper } from '@mui/material'

const Blogs = () => {
  const [showAllInfo, setShowAllInfo] = useState({})

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

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
    <Box display="flex" flexDirection="column" width="100vw">
      {blogs.map((blog) => (
        <Box
          key={blog.id}
          sx={{
            p: 2,
            boxShadow: 10,
            mb: 1,
            border: '2px black',
            mr: 2,
            backgroundColor: '#2d2f46ff',
            borderRadius: 1,
          }}
        >
          <p className="blog-title">
            <Typography color="white" to={`blogs/${blog.id}`} component={Link}>
              {blog.title}
            </Typography>
          </p>
          <span>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2d2f46ff',
                color: 'white',
                border: '1px solid white',
                '&:hover': {
                  backgroundColor: '#3b3d5aff',
                  border: '1px solid white',
                },
                mb: 2,
              }}
              onClick={() =>
                setShowAllInfo((prev) => ({
                  ...prev,
                  [blog.id]: !prev[blog.id],
                }))
              }
            >
              {showAllInfo[blog.id] ? 'Hide' : 'View'}
            </Button>
          </span>

          {showAllInfo[blog.id] && (
            <>
              <Typography color="white" sx={{ mb: 2 }}>
                Url: {blog.url}
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Typography color="white">Likes: {blog.likes}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLike(blog)}
                  sx={{
                    backgroundColor: '#2d2f46ff',
                    ml: 2,
                    color: 'white',
                    border: '1px solid white',
                    '&:hover': {
                      backgroundColor: '#3b3d5aff',
                      border: '1px solid white',
                    },
                  }}
                >
                  Like
                </Button>
              </Box>
              <Typography color="white" sx={{ mb: 2 }}>
                Author: {blog.author}
              </Typography>

              {(user.id === blog.user || user.id === blog.user.id) && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => confirmDeleting(blog.id, blog)}
                >
                  Remove
                </Button>
              )}
            </>
          )}
          <br />
        </Box>
      ))}
    </Box>
  )
}

export default Blogs
