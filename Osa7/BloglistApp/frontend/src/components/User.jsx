import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)

  const { id } = useParams()

  const user = users.find((u) => u.id === id)

  return (
    <div>
      <h2> {user?.name} </h2>
      <h3>Added blogs</h3>
      <ul>
        {user?.blogs.map((blog) => (
          <li key={blog.id}>
            {' '}
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
