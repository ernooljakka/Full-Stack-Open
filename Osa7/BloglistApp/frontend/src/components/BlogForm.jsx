import { useState } from 'react'
import { Button, TextField, Box, Stack } from '@mui/material'

const BlogForm = ({ onAddBlog }) => {
  const [formVisible, setFormVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    setFormVisible(false)
  }

  if (!formVisible) {
    return (
      <Button
        sx={{
          backgroundColor: '#2d2f46ff',
          color: 'white',
          '&:hover': {
            backgroundColor: '#3b3d5aff',
            border: '1px solid white',
          },
          mb: 2,
        }}
        variant="contained"
        onClick={() => setFormVisible(true)}
      >
        Create new blog
      </Button>
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="left"
      alignItems="left"
      flexDirection="column"
    >
      <h2>Create new Blog</h2>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            label="Url"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Stack>
        <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
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
            variant="contained"
            type="submit"
          >
            Create
          </Button>
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
            variant="contained"
            onClick={() => setFormVisible(false)}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default BlogForm
