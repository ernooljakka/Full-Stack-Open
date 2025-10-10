import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {

  const [showAllInfo, setShowAllInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtnStyle = {
    color: 'white',
    backgroundColor: 'red',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer'
  }

  const confirmDeleting = (id) => {
    const confirmDelete = window.confirm(`Remove Blog ${blog.title} by ${blog.author}?`)
    if (confirmDelete) {
      handleDelete(id)
    }

  }
  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setShowAllInfo(!showAllInfo)}> {showAllInfo ? 'Hide' : 'View'} </button>
      { showAllInfo &&
        <>
          <p>{blog.url}</p>
          <span>{blog.likes}</span>
          <button onClick={() => handleLike(blog.id)}> Like </button>
          <p>{blog.author}</p>
          <button style={removeBtnStyle} onClick={() => confirmDeleting(blog.id)}> Remove </button>
        </>
      }

      <br/>
    </div>
  )
}

export default Blog