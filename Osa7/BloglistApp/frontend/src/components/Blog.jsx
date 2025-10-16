import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {

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
    <div  className="blog-list" style={blogStyle}>
      <p className='blog-title'>{blog.title}</p>
      <span><button onClick={() => setShowAllInfo(!showAllInfo)}> {showAllInfo ? 'Hide' : 'View'} </button></span>
      { showAllInfo &&
        <>
          <p>Url: {blog.url}</p>
          <span className='likes'>Likes: {blog.likes}</span>
          <button onClick={() => handleLike(blog.id)}> Like </button>
          <p>Author:  {blog.author}</p>
          { currentUser.id === blog.user &&
            <button style={removeBtnStyle} onClick={() => confirmDeleting(blog.id)}> Remove </button>
          }
        </>
      }

      <br/>
    </div>
  )
}

export default Blog