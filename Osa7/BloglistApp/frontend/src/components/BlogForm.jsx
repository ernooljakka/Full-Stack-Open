import { useState } from 'react'

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
    return <button onClick={() => setFormVisible(true)}>Create new blog</button>
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Author
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Url
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
      <button onClick={() => setFormVisible(false)}>Cancel</button>
    </div>
  )
}

export default BlogForm
