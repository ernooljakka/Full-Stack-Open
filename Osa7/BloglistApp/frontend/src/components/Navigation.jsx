import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/userSlice'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <span>
        <Link to={`/`}>blogs </Link>
      </span>
      <span>
        <Link to={`/users`}>users </Link>{' '}
      </span>
      {user && (
        <>
          <span>{user.username} logged in</span>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
        </>
      )}
    </div>
  )
}

export default Navigation
