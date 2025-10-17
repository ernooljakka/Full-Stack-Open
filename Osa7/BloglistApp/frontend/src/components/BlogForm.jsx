import { useSelector } from 'react-redux'

const BlogForm = ({
  title,
  author,
  url,
  HandleAddBlog,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={HandleAddBlog}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Author
          <input
            type="text"
            value={author}
            onChange={(e) => handleAuthorChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Url
          <input
            type="text"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
